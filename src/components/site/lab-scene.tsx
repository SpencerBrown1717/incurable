import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import type * as Three from "three";

import "./lab-scene.css";

const initialView = { azimuth: 0.54, elevation: 0.38 };
const rotationStep = Math.PI / 8;

async function mountModel(host: HTMLDivElement, onUnavailable: () => void) {
  const T = await import("three");
  const [{ RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
    import("three/addons/geometries/RoundedBoxGeometry.js"),
    import("three/addons/environments/RoomEnvironment.js"),
  ]);

  if (!host.isConnected) return;
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.07;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-5, 5, 3, -3, 0.1, 45);
  const target = new T.Vector3(0, 1.84, 0);
  const textures: Three.Texture[] = [];
  const room = new RoomEnvironment();
  const env = new T.PMREMGenerator(renderer);
  const environment = env.fromScene(room);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.7;
  room.dispose();
  env.dispose();

  const key = new T.DirectionalLight(0xfff6e7, 2.7);
  key.position.set(-4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.normalBias = 0.03;
  scene.add(key, new T.HemisphereLight(0xe5f6ff, 0x5e7180, 2.1));
  const rim = new T.DirectionalLight(0xb1ddff, 1.7);
  rim.position.set(6, 4, -5);
  scene.add(rim);

  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext("2d");
  if (shadowContext) {
    const fade = shadowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
    fade.addColorStop(0, "rgb(24 52 78 / 50%)");
    fade.addColorStop(0.53, "rgb(24 52 78 / 32%)");
    fade.addColorStop(0.84, "rgb(24 52 78 / 10%)");
    fade.addColorStop(1, "rgb(24 52 78 / 0%)");
    shadowContext.fillStyle = fade;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadowTexture = new T.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = T.SRGBColorSpace;
    textures.push(shadowTexture);
    const ground = new T.Mesh(
      new T.PlaneGeometry(9.6, 5.5),
      new T.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    ground.position.set(0.48, 0.005, -0.12);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
  }

  const machine = new T.Group();
  scene.add(machine);
  const material = (color: number, roughness: number, metalness = 0) =>
    new T.MeshStandardMaterial({ color, roughness, metalness });
  const pearl = material(0xdfe6ed, 0.28, 0.18);
  const silver = material(0xb9cbd8, 0.24, 0.62);
  const white = material(0xf6f9fd, 0.32, 0.12);
  const chassis = material(0x25394e, 0.32, 0.45);
  const gasket = material(0x0d1b29, 0.6);
  const interior = material(0x475d6e, 0.4, 0.38);
  const blue = material(0x248baa, 0.35, 0.24);
  const light = new T.MeshBasicMaterial({ color: 0x8ee9f5 });
  const lightWhite = new T.MeshBasicMaterial({ color: 0xe5f8ff });
  const joints = material(0x5b758a, 0.24, 0.65);
  const glass = new T.MeshPhysicalMaterial({
    color: 0x62a9cd,
    roughness: 0.15,
    metalness: 0.16,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });

  function box(
    size: [number, number, number],
    at: [number, number, number],
    finish: Three.Material,
    radius = 0.04,
  ) {
    const [width, height, depth] = size;
    const geometry = radius
      ? new RoundedBoxGeometry(
          width,
          height,
          depth,
          2,
          Math.min(radius, width / 2, height / 2, depth / 2),
        )
      : new T.BoxGeometry(width, height, depth);
    const mesh = new T.Mesh(geometry, finish);
    mesh.position.set(...at);
    mesh.castShadow = !finish.transparent;
    mesh.receiveShadow = !finish.transparent;
    machine.add(mesh);
    return mesh;
  }

  function label(
    width: number,
    height: number,
    at: [number, number, number],
    paint: (context: CanvasRenderingContext2D) => void,
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = Math.round((512 * height) / width);
    const context = canvas.getContext("2d");
    if (!context) return;
    paint(context);
    const texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    textures.push(texture);
    const mesh = new T.Mesh(
      new T.PlaneGeometry(width, height),
      new T.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    mesh.position.set(...at);
    machine.add(mesh);
    return mesh;
  }

  // Plinth, outer chassis, and the split front access panels.
  for (const x of [-2.51, 2.51]) {
    for (const z of [-1.19, 1.19]) {
      box([0.59, 0.17, 0.55], [x, 0.1, z], gasket);
    }
  }
  box([6.42, 0.31, 3.38], [0, 0.29, 0], chassis, 0.12);
  box([6.1, 0.15, 3.1], [0, 0.51, 0], silver, 0.07);
  box([6.12, 0.27, 3.1], [0, 3.45, 0], pearl, 0.13);
  box([5.84, 0.043, 2.86], [0, 3.59, 0], silver, 0.02);
  box([5.76, 0.045, 2.78], [0, 3.615, 0], white, 0.02);
  box([5.51, 0.009, 0.044], [0, 3.641, -0.94], pearl, 0);
  box([5.97, 2.84, 0.17], [0, 1.93, -1.49], pearl, 0.075);
  box([0.14, 2.79, 2.94], [-2.94, 1.93, 0], pearl, 0.07);
  box([0.14, 2.79, 2.94], [2.94, 1.93, 0], pearl, 0.07);
  box([4.56, 0.14, 2.7], [-0.56, 0.71, 0], interior);
  box([4.56, 2.46, 0.08], [-0.57, 1.93, -1.33], interior);
  box([0.09, 2.44, 2.74], [-2.8, 1.92, 0], interior);
  box([1.25, 2.81, 2.93], [2.29, 1.94, 0.02], white, 0.08);

  for (const x of [-2.84, -0.58, 1.67]) {
    box([0.15, 2.73, 0.15], [x, 1.93, 1.52], pearl, 0.06);
  }
  for (const x of [-1.71, 0.55]) {
    for (const y of [0.63, 3.19]) {
      box([2.18, 0.19, 0.15], [x, y, 1.52], pearl, 0.06);
    }
    for (const y of [0.76, 3.05]) {
      box([2.13, 0.057, 0.12], [x, y, 1.48], gasket, 0.02);
    }
    for (const post of [-1.053, 1.053]) {
      box([0.062, 2.29, 0.12], [x + post, 1.9, 1.48], gasket, 0.02);
    }
    const pane = box([2.08, 2.27, 0.025], [x, 1.9, 1.51], glass, 0);
    pane.renderOrder = 2;
    box([0.105, 0.64, 0.115], [x + 0.82, 1.55, 1.65], silver);
    box([0.29, 0.042, 0.042], [x - 0.84, 0.82, 1.56], blue, 0.018);
  }

  // Visible mechanical bays. The details here are illustrative hardware.
  for (const z of [-0.74, 0.68]) {
    box([4.29, 0.055, 0.105], [-0.57, 2.91, z], silver);
  }
  box([0.19, 0.17, 2.03], [-0.64, 2.75, -0.02], silver);
  box([0.39, 0.27, 0.44], [-0.64, 2.64, 0.38], chassis);
  box([0.31, 0.69, 0.31], [-0.64, 2.26, 0.38], white, 0.05);
  box([0.14, 0.36, 0.13], [-0.64, 1.79, 0.38], joints, 0.03);
  box([0.22, 0.06, 0.025], [-0.64, 2.4, 0.552], light, 0.01);
  box([4.22, 0.047, 0.07], [-0.57, 2.91, 1.21], lightWhite, 0.016);
  for (const x of [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2]) {
    box([0.017, 2.06, 0.014], [x, 1.87, -1.284], chassis, 0);
  }
  for (const [x, z] of [
    [-1.81, 0.33],
    [-0.68, -0.45],
    [0.48, 0.32],
  ]) {
    box([0.91, 0.14, 0.81], [x, 0.83, z], gasket);
    box([0.87, 0.14, 0.77], [x, 0.96, z], silver);
    const inserts = new T.InstancedMesh(
      new T.CylinderGeometry(0.049, 0.043, 0.023, 12),
      blue,
      24,
    );
    const offset = new T.Matrix4();
    for (let column = 0; column < 6; column++) {
      for (let row = 0; row < 4; row++) {
        offset.makeTranslation(
          x + (column - 2.5) * 0.123,
          1.044,
          z + (row - 1.5) * 0.147,
        );
        inserts.setMatrixAt(column * 4 + row, offset);
      }
    }
    inserts.instanceMatrix.needsUpdate = true;
    machine.add(inserts);
  }

  const rail = box([1.05, 0.75, 0.15], [2.29, 2.68, 1.52], gasket, 0.075);
  rail.rotation.x = -0.045;
  label(0.89, 0.58, [2.29, 2.68, 1.603], (ctx) => {
    ctx.fillStyle = "#0f2236";
    ctx.fillRect(0, 0, 512, 334);
    ctx.strokeStyle = "#22465c";
    ctx.lineWidth = 2;
    for (let x = 18; x < 512; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 78);
      ctx.lineTo(x, 261);
      ctx.stroke();
    }
    for (let y = 81; y < 269; y += 24) {
      ctx.beginPath();
      ctx.moveTo(19, y);
      ctx.lineTo(496, y);
      ctx.stroke();
    }
    ctx.fillStyle = "#85e6ef";
    ctx.font = "27px monospace";
    ctx.fillText("INCURABLE?", 25, 51);
    ctx.strokeStyle = "#67d7e9";
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let x = 22; x <= 490; x += 4) {
      const y = 178 - Math.sin(x * 0.035) * Math.cos(x * 0.013) * 41;
      if (x === 22) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = "#a7c0d7";
    ctx.font = "20px monospace";
    ctx.fillText("HALL 01 / CONCEPT", 25, 300);
  });
  box([0.85, 0.038, 0.035], [2.29, 2.18, 1.516], blue, 0.008);
  const knob = new T.Mesh(
    new T.CylinderGeometry(0.14, 0.14, 0.08, 32),
    chassis,
  );
  knob.rotation.x = Math.PI / 2;
  knob.position.set(2.28, 1.91, 1.53);
  machine.add(knob);
  box([0.055, 0.025, 0.018], [2.28, 1.98, 1.576], light, 0.006);
  for (let row = 0; row < 7; row++) {
    box([0.74, 0.024, 0.027], [2.29, 1.33 - row * 0.056, 1.49], joints, 0.01);
  }

  // Side and back details stay visible when the device is rotated.
  for (const x of [-3.014, 3.014]) {
    box([0.025, 2.03, 2.32], [x, 1.94, 0.02], silver, 0.012);
    box([0.043, 1.91, 2.22], [x, 1.94, 0.02], pearl, 0.021);
    for (let row = 0; row < 9; row++) {
      box([0.045, 0.028, 1.03], [x, 2.65 - row * 0.073, -0.36], joints, 0.012);
    }
    for (const z of [-0.91, 0.99]) {
      box([0.046, 0.065, 0.075], [x, 1.16, z], chassis, 0.017);
    }
  }
  box([4.21, 1.92, 0.075], [-0.46, 1.91, -1.6], silver);
  box([4.04, 1.77, 0.082], [-0.46, 1.91, -1.62], pearl);
  for (let row = 0; row < 8; row++) {
    box(
      [2.18, 0.025, 0.035],
      [-0.48, 2.52 - row * 0.073, -1.663],
      joints,
      0.013,
    );
  }

  let view = initialView;
  let frame = 0;
  function render() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const { clientWidth: width, clientHeight: height } = host;
      if (!width || !height) return;
      const aspect = width / height;
      const cosAzimuth = Math.abs(Math.cos(view.azimuth));
      const sinAzimuth = Math.abs(Math.sin(view.azimuth));
      // Project the enclosure bounds so orbiting never crops the roof or base.
      const halfWidth = 3.21 * cosAzimuth + 1.69 * sinAzimuth;
      const depth = 3.21 * sinAzimuth + 1.69 * cosAzimuth;
      const projectedHeight =
        target.y * Math.cos(view.elevation) + depth * Math.sin(view.elevation);
      const halfHeight = Math.max(
        projectedHeight / 0.88,
        halfWidth / (0.88 * aspect),
      );
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      const distance = 14;
      const horizon = distance * Math.cos(view.elevation);
      camera.position.set(
        Math.sin(view.azimuth) * horizon,
        target.y + distance * Math.sin(view.elevation),
        Math.cos(view.azimuth) * horizon,
      );
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    });
  }

  const observer = new ResizeObserver(render);
  observer.observe(host);
  host.append(renderer.domElement);
  const onContextLost = (event: Event) => {
    event.preventDefault();
    onUnavailable();
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  render();

  return {
    setView(next: typeof initialView) {
      view = next;
      render();
    },
    dispose() {
      observer.disconnect();
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      scene.traverse((node) => {
        if (!(node instanceof T.Mesh)) return;
        node.geometry.dispose();
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach((item: Three.Material) => item.dispose());
        if (node instanceof T.InstancedMesh) node.dispose();
      });
      textures.forEach((texture) => texture.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

export function LabScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<Awaited<ReturnType<typeof mountModel>>>(undefined);
  const viewRef = useRef(initialView);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(
    null,
  );
  const [ready, setReady] = useState(false);
  const instructionsId = useId();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      mountModel(host, () => setReady(false))
        .then((model) => {
          if (cancelled) {
            model?.dispose();
            return;
          }
          modelRef.current = model;
          setReady(Boolean(model));
        })
        .catch(() => {
          if (!cancelled) setReady(false);
        });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      modelRef.current?.dispose();
      modelRef.current = undefined;
    };
  }, []);

  function setView(azimuth: number, elevation = viewRef.current.elevation) {
    const next = {
      azimuth,
      elevation: Math.max(0.08, Math.min(0.94, elevation)),
    };
    viewRef.current = next;
    modelRef.current?.setView(next);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const cursor = dragRef.current;
    if (!cursor || cursor.pointerId !== event.pointerId) return;
    const { azimuth, elevation } = viewRef.current;
    setView(
      azimuth + (cursor.x - event.clientX) * 0.008,
      elevation + (event.clientY - cursor.y) * 0.008,
    );
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  return (
    <figure className="lab-scene" data-ready={ready}>
      <div className="lab-scene__marker" aria-hidden="true">
        Hall 01 <span>Concept model</span>
      </div>
      <div
        className="lab-scene__poster"
        aria-hidden={ready}
        role="img"
        aria-label="Hall 01 medical automation enclosure"
      >
        <span className="lab-scene__poster-cabinet">
          <span className="lab-scene__poster-bay" />
          <span className="lab-scene__poster-bay" />
          <span className="lab-scene__poster-panel" />
        </span>
      </div>
      <div
        ref={hostRef}
        className="lab-scene__viewport"
        role="region"
        aria-label="Interactive 3D model of the Hall 01 medical automation enclosure"
        aria-describedby={ready ? instructionsId : undefined}
        aria-hidden={!ready}
        tabIndex={ready ? 0 : undefined}
        onPointerDown={(event) => {
          if (!ready || event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
        }}
        onPointerMove={drag}
        onLostPointerCapture={() => {
          dragRef.current = null;
        }}
        onKeyDown={(event) => {
          const { azimuth, elevation } = viewRef.current;
          switch (event.key) {
            case "ArrowLeft":
              setView(azimuth - 0.14);
              break;
            case "ArrowRight":
              setView(azimuth + 0.14);
              break;
            case "ArrowUp":
              setView(azimuth, elevation + 0.1);
              break;
            case "ArrowDown":
              setView(azimuth, elevation - 0.1);
              break;
            case "Home":
              setView(initialView.azimuth, initialView.elevation);
              break;
            default:
              return;
          }
          event.preventDefault();
        }}
      />
      <figcaption className="lab-scene__caption">
        {ready ? (
          <>
            <span id={instructionsId}>Drag or use arrow keys to rotate</span>
            <span className="lab-scene__controls">
              <button
                type="button"
                aria-label="Rotate model left"
                onClick={() => setView(viewRef.current.azimuth - rotationStep)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Rotate model right"
                onClick={() => setView(viewRef.current.azimuth + rotationStep)}
              >
                →
              </button>
              <button
                type="button"
                onClick={() =>
                  setView(initialView.azimuth, initialView.elevation)
                }
              >
                Reset view
              </button>
            </span>
          </>
        ) : (
          <span>Hall 01 · Concept view</span>
        )}
      </figcaption>
    </figure>
  );
}
