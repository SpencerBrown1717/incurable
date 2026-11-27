import type * as Three from "three";

export type CampusView = { azimuth: number; elevation: number };
export type CampusMode = "exterior" | "cutaway";
type Point = [x: number, y: number, z: number];
type Box = { size: Point; at: Point; roll: number };
type Hall = {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  open?: boolean;
};

export const initialView: CampusView = { azimuth: 0.57, elevation: 0.59 };
export const stageWidth = 43;
export const stageDepth = 27;
export const halls: Hall[] = [
  { x: -11.4, z: -6.35, width: 13.9, depth: 7, height: 3.05 },
  { x: 5.1, z: -6.35, width: 17.2, depth: 7, height: 3.85 },
  { x: -7.4, z: 3.35, width: 21.9, depth: 10.4, height: 3.37, open: true },
  { x: 12.25, z: 3.35, width: 11, depth: 10.4, height: 3.72, open: true },
  { x: -13.3, z: 10.3, width: 8.3, depth: 2.15, height: 1.15 },
];
const floor = 0.48;

export async function mountCampus(
  host: HTMLDivElement,
  onUnavailable: () => void,
) {
  const T = await import("three");
  if (!host.isConnected) return;

  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.setClearColor(0x05090b, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-1, 1, 1, -1, 0.1, 180);
  const center = new T.Vector3(0, 1.4, 0);
  const key = new T.DirectionalLight(0xc7efff, 2.65);
  key.position.set(-15, 22, 14);
  const rim = new T.DirectionalLight(0x8ed8fa, 1.6);
  rim.position.set(14, 8, -10);
  scene.add(key, rim, new T.HemisphereLight(0xddf5ff, 0x24343e, 2.0));

  const solid = (color: number) =>
    new T.MeshStandardMaterial({ color, roughness: 0.76 });
  const glow = (color: number) => new T.MeshBasicMaterial({ color });
  const glass = (color: number, opacity: number) =>
    new T.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    });

  const finishes = {
    underside: solid(0x101921),
    deck: solid(0x1c303a),
    glassDark: solid(0x19313a),
    glassLight: solid(0x2a4855),
    roof: solid(0x263b48),
    roofTrim: solid(0x4b6673),
    graphite: solid(0x1c3039),
    frame: solid(0x607c89),
    silver: solid(0x95b2bf),
    ice: glow(0xbbf1ff),
    blue: glow(0x57c2e7),
    soft: glow(0x4e7c90),
    skylight: glass(0x6ac5df, 0.36),
    outlineGlass: glass(0x508ba1, 0.18),
    edgeGlass: glass(0x477283, 0.07),
  };
  type Finish = keyof typeof finishes;

  const exterior = new T.Group();
  const interior = new T.Group();
  scene.add(exterior, interior);

  function createBoxBatch(group: Three.Group | Three.Scene) {
    const batch = new Map<Finish, Box[]>();
    function add(finish: Finish, size: Point, at: Point, roll = 0) {
      const parts = batch.get(finish) ?? [];
      parts.push({ size, at, roll });
      batch.set(finish, parts);
    }
    function build(geometry: Three.BoxGeometry) {
      const transform = new T.Object3D();
      batch.forEach((parts, finish) => {
        const material = finishes[finish];
        const mesh = new T.InstancedMesh(geometry, material, parts.length);
        parts.forEach(({ size, at, roll }, index) => {
          transform.position.set(...at);
          transform.scale.set(...size);
          transform.rotation.z = roll;
          transform.updateMatrix();
          mesh.setMatrixAt(index, transform.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (material.transparent) mesh.renderOrder = 2;
        group.add(mesh);
      });
    }
    return { add, build };
  }

  const fixed = createBoxBatch(scene);
  const closed = createBoxBatch(exterior);
  const cutaway = createBoxBatch(interior);

  function perimeter(
    add: typeof fixed.add,
    { x, z, width, depth }: Omit<Hall, "height">,
    y: number,
    gauge: number,
    finish: Finish,
  ) {
    for (const side of [-1, 1]) {
      add(finish, [width, gauge, gauge], [x, y, z + (side * depth) / 2]);
      add(finish, [gauge, gauge, depth], [x + (side * width) / 2, y, z]);
    }
  }

  const pad = { x: 0, z: 0, width: stageWidth, depth: stageDepth };
  fixed.add(
    "underside",
    [stageWidth + 0.4, 0.3, stageDepth + 0.4],
    [0, -0.6, 0],
  );
  fixed.add("underside", [stageWidth, 0.52, stageDepth], [0, -0.24, 0]);
  fixed.add("deck", [stageWidth - 0.2, 0.1, stageDepth - 0.2], [0, 0.03, 0]);
  perimeter(fixed.add, pad, 0.035, 0.035, "soft");
  perimeter(fixed.add, pad, -0.48, 0.026, "soft");
  for (const x of [-1, 1]) {
    for (const z of [-1, 1]) {
      const cornerX = (x * stageWidth) / 2;
      const cornerZ = (z * stageDepth) / 2;
      fixed.add(
        "ice",
        [1.65, 0.046, 0.045],
        [cornerX - 0.825 * x, 0.07, cornerZ],
      );
      fixed.add(
        "ice",
        [0.045, 0.046, 1.65],
        [cornerX, 0.07, cornerZ - 0.825 * z],
      );
    }
  }

  // Campus paths and elevated links help distinguish the individual halls.
  fixed.add("graphite", [37.8, 0.05, 1.1], [-0.6, 0.11, 10.45]);
  for (const x of [-19.25, 19]) {
    fixed.add("graphite", [1.25, 0.046, 22.6], [x, 0.11, 0]);
    fixed.add("soft", [0.026, 0.028, 22], [x + 0.63 * Math.sign(x), 0.14, 0]);
  }
  fixed.add("soft", [36, 0.028, 0.026], [0.03, 0.15, 11.02]);
  for (let i = 0; i < 26; i++) {
    fixed.add("soft", [0.52, 0.022, 0.027], [-18.15 + i * 1.43, 0.15, 9.96]);
  }
  for (const z of [-1.75, 2.9, 6]) {
    fixed.add("graphite", [4, 0.18, 1.32], [5.2, 0.23, z]);
    fixed.add("soft", [4, 0.05, 0.034], [5.2, 0.33, z + 0.65]);
  }
  for (const [x, z, width, depth] of [
    [-6, -2.38, 2.55, 2.05],
    [10.3, -2.38, 2.55, 2.05],
    [-3.5, -6.35, 2.5, 2.38],
  ]) {
    fixed.add("graphite", [width, 1.12, depth], [x, 1.18, z]);
    fixed.add("glassLight", [width, 0.51, depth + 0.025], [x, 1.24, z]);
    fixed.add("frame", [width + 0.03, 0.08, depth + 0.03], [x, 1.75, z]);
  }

  function shell(hall: Hall) {
    const { x, z, width, depth, height, open } = hall;
    const roofY = floor + height;
    const wall = open ? closed : fixed;
    fixed.add("underside", [width + 0.36, 0.25, depth + 0.34], [x, 0.205, z]);
    fixed.add("frame", [width + 0.22, 0.1, depth + 0.25], [x, 0.365, z]);
    fixed.add("deck", [width, 0.13, depth], [x, 0.42, z]);
    perimeter(fixed.add, hall, floor, 0.055, "blue");

    for (const side of [-1, 1]) {
      const faceZ = z + (side * depth) / 2;
      const faceX = x + (side * width) / 2;
      wall.add(
        "glassDark",
        [width, height, 0.056],
        [x, floor + height / 2, faceZ],
      );
      wall.add(
        "glassLight",
        [0.056, height, depth],
        [faceX, floor + height / 2, z],
      );
      for (const y of [floor + 0.24, roofY - 0.33]) {
        wall.add("frame", [width, 0.085, 0.08], [x, y, faceZ]);
        wall.add("frame", [0.08, 0.085, depth], [faceX, y, z]);
      }
    }

    const divisionsX = Math.round(width / 1.2);
    const divisionsZ = Math.round(depth / 1.15);
    for (let index = 0; index <= divisionsX; index++) {
      const lineX = x - width / 2 + (index * width) / divisionsX;
      for (const side of [-1, 1]) {
        const faceZ = z + (side * depth) / 2;
        wall.add(
          "frame",
          [0.046, height, 0.085],
          [lineX, floor + height / 2, faceZ],
        );
        if (index < divisionsX && index % 3 !== 2) {
          wall.add(
            "soft",
            [0.57, 0.052, 0.078],
            [lineX + 0.52, roofY - 0.78, faceZ],
          );
        }
      }
    }
    for (let index = 0; index <= divisionsZ; index++) {
      const lineZ = z - depth / 2 + (index * depth) / divisionsZ;
      for (const side of [-1, 1]) {
        const faceX = x + (side * width) / 2;
        wall.add(
          "frame",
          [0.085, height, 0.046],
          [faceX, floor + height / 2, lineZ],
        );
        if (index < divisionsZ) {
          wall.add(
            "soft",
            [0.092, 0.066, 0.51],
            [faceX, roofY - 0.77, lineZ + 0.46],
          );
        }
      }
    }
    wall.add("roofTrim", [width + 0.22, 0.2, depth + 0.22], [x, roofY, z]);
    wall.add("roof", [width - 0.12, 0.13, depth - 0.12], [x, roofY + 0.14, z]);
    perimeter(wall.add, hall, roofY + 0.18, 0.034, "blue");

    for (let index = 1; index < divisionsZ; index++) {
      const lineZ = z - depth / 2 + (index * depth) / divisionsZ;
      wall.add("soft", [width - 0.45, 0.016, 0.035], [x, roofY + 0.22, lineZ]);
    }
    for (let index = 1; index < divisionsX; index += 3) {
      const lineX = x - width / 2 + (index * width) / divisionsX;
      wall.add(
        "graphite",
        [0.89, 0.18, depth - 0.88],
        [lineX, roofY + 0.24, z],
      );
      wall.add(
        "skylight",
        [0.68, 0.04, depth - 1.15],
        [lineX, roofY + 0.35, z],
      );
      for (const side of [-1, 1]) {
        wall.add(
          "soft",
          [0.025, 0.028, depth - 0.93],
          [lineX + 0.4 * side, roofY + 0.37, z],
        );
      }
    }

    if (!open) return;
    // Sections of glass preserve the roof envelope around the visible halls.
    perimeter(cutaway.add, hall, roofY, 0.041, "soft");
    perimeter(cutaway.add, hall, floor + 0.22, 0.045, "soft");
    const backZ = z - depth / 2;
    cutaway.add(
      "outlineGlass",
      [width, height, 0.04],
      [x, floor + height / 2, backZ],
    );
    cutaway.add(
      "edgeGlass",
      [0.034, height, depth],
      [x - width / 2, floor + height / 2, z],
    );
    for (const side of [-1, 1]) {
      const cornerX = x + (side * width) / 2;
      for (const end of [-1, 1]) {
        cutaway.add(
          "frame",
          [0.077, height, 0.077],
          [cornerX, floor + height / 2, z + (end * depth) / 2],
        );
      }
      cutaway.add(
        "blue",
        [0.62, 0.049, 0.058],
        [cornerX - 0.29 * side, roofY, z + depth / 2],
      );
    }
    for (let index = 1; index < divisionsX; index += 2) {
      const lineX = x - width / 2 + (index * width) / divisionsX;
      cutaway.add(
        "soft",
        [0.047, height, 0.042],
        [lineX, floor + height / 2, backZ],
      );
      cutaway.add(
        "outlineGlass",
        [0.23, 0.028, depth - 0.05],
        [lineX, roofY, z],
      );
    }
    for (const row of [-1, 0, 1]) {
      cutaway.add(
        "soft",
        [width - 0.25, 0.012, 0.018],
        [x, floor + 0.01, z + row * (depth / 3)],
      );
    }

    // Generic instruments and fixtures establish the scale of the rooms.
    const columns = Math.max(2, Math.floor(width / 3.52));
    const spacing = (width - 2.2) / columns;
    for (const row of [-1, 1]) {
      const islandZ = z + row * 2.45;
      for (let column = 0; column < columns; column++) {
        const islandX = x - width / 2 + 1.1 + (column + 0.5) * spacing;
        const equipmentHeight =
          (column + (row === 1 ? 1 : 0)) % 3 === 0 ? 1.41 : 0.85;
        cutaway.add(
          "frame",
          [1.95, 0.13, 1.31],
          [islandX, floor + 0.065, islandZ],
        );
        cutaway.add(
          "glassDark",
          [1.63, equipmentHeight, 1.07],
          [islandX, floor + 0.12 + equipmentHeight / 2, islandZ],
        );
        cutaway.add(
          "silver",
          [1.72, 0.075, 1.16],
          [islandX, floor + 0.15 + equipmentHeight, islandZ],
        );
        cutaway.add(
          "glassLight",
          [0.54, 0.26, 0.02],
          [islandX + 0.35, floor + equipmentHeight - 0.02, islandZ + 0.54],
        );
        cutaway.add(
          "ice",
          [0.39, 0.036, 0.028],
          [islandX + 0.36, floor + equipmentHeight - 0.01, islandZ + 0.555],
        );
        cutaway.add(
          "roofTrim",
          [0.52, 0.32, 0.5],
          [islandX - 0.48, floor + 0.32 + equipmentHeight, islandZ - 0.13],
        );
      }
    }
  }
  halls.forEach(shell);

  // Articulated silhouettes distinguish the automation halls from the roofed wings.
  for (const [x, z, side] of [
    [-13.6, 3.35, 1],
    [-5.2, 3.35, -1],
    [10.6, 3.35, 1],
    [14.55, 3.35, -1],
  ]) {
    cutaway.add("graphite", [1.32, 0.22, 1.02], [x, floor + 0.11, z]);
    cutaway.add("silver", [0.44, 0.59, 0.52], [x, floor + 0.5, z]);
    cutaway.add(
      "frame",
      [0.29, 1.24, 0.36],
      [x + side * 0.32, floor + 1.26, z],
      -side * 0.56,
    );
    cutaway.add(
      "ice",
      [0.11, 0.66, 0.025],
      [x + side * 0.32, floor + 1.3, z + 0.19],
      -side * 0.56,
    );
    cutaway.add(
      "silver",
      [0.4, 0.37, 0.47],
      [x + side * 0.62, floor + 1.75, z],
    );
    cutaway.add(
      "frame",
      [0.8, 0.26, 0.31],
      [x + side * 0.96, floor + 1.88, z],
      side * 0.28,
    );
    cutaway.add("blue", [0.19, 0.38, 0.28], [x + side * 1.35, floor + 1.78, z]);
  }

  for (let index = 0; index < 5; index++) {
    const x = 5 + index * 1.83;
    fixed.add("graphite", [1.18, 0.59, 1.07], [x, 0.386, 10.28]);
    fixed.add("roofTrim", [1.24, 0.048, 1.13], [x, 0.71, 10.28]);
    fixed.add("soft", [0.72, 0.056, 0.019], [x, 0.58, 10.83]);
  }
  for (const x of [-8.5, 10.5]) {
    for (let step = 0; step < 3; step++) {
      fixed.add(
        "roofTrim",
        [2, 0.075, 0.28],
        [x, 0.11 + step * 0.11, 9.11 - step * 0.25],
      );
    }
  }

  const geometry = new T.BoxGeometry(1, 1, 1);
  for (const batch of [fixed, closed, cutaway]) batch.build(geometry);

  const grid = new T.GridHelper(80, 64, 0x234653, 0x12232c);
  grid.position.y = -0.78;
  grid.material.transparent = true;
  grid.material.opacity = 0.65;
  scene.add(grid);

  const tickPositions: number[] = [];
  for (const x of [-1, 1]) {
    for (const z of [-1, 1]) {
      const px = x * (stageWidth / 2 + 1.4);
      const pz = z * (stageDepth / 2 + 1.4);
      tickPositions.push(px, -0.52, pz, px - x * 2.3, -0.52, pz);
      tickPositions.push(px, -0.52, pz, px, -0.52, pz - z * 2.3);
    }
  }
  const ticksGeometry = new T.BufferGeometry();
  ticksGeometry.setAttribute(
    "position",
    new T.Float32BufferAttribute(tickPositions, 3),
  );
  const ticksMaterial = new T.LineBasicMaterial({
    color: 0x5ea4b8,
    transparent: true,
    opacity: 0.65,
  });
  scene.add(new T.LineSegments(ticksGeometry, ticksMaterial));

  let view = initialView;
  let motion = false;
  let visible = true;
  let frame = 0;
  let motionStart: number | null = null;
  let previousWidth = 0;
  let previousHeight = 0;

  function schedule() {
    if (!frame && visible) frame = requestAnimationFrame(draw);
  }

  function draw(now: number) {
    frame = 0;
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;

    if (motionStart === null) motionStart = now;
    const drift = motion ? Math.sin((now - motionStart) / 5100) * 0.13 : 0;
    const azimuth = view.azimuth + drift;
    const { elevation } = view;
    const cos = Math.abs(Math.cos(azimuth));
    const sin = Math.abs(Math.sin(azimuth));
    const modelHalfWidth = (cos * stageWidth + sin * stageDepth) / 2;
    const modelHalfDepth = (sin * stageWidth + cos * stageDepth) / 2;
    const modelHalfHeight =
      modelHalfDepth * Math.sin(elevation) + 3.1 * Math.cos(elevation);
    const aspect = width / height;
    const halfHeight = Math.max(
      modelHalfHeight / 0.96,
      modelHalfWidth / (0.93 * aspect),
    );
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;

    const distance = 75;
    const horizon = distance * Math.cos(elevation);
    camera.position.set(
      Math.sin(azimuth) * horizon,
      center.y + distance * Math.sin(elevation),
      Math.cos(azimuth) * horizon,
    );
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (width !== previousWidth || height !== previousHeight) {
      renderer.setSize(width, height, false);
      previousWidth = width;
      previousHeight = height;
    }
    renderer.render(scene, camera);
    if (motion) schedule();
  }

  const resize = new ResizeObserver(schedule);
  resize.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      motionStart = null;
    }
  });
  visibility.observe(host);

  exterior.visible = false;
  host.append(renderer.domElement);
  function onContextLost(event: Event) {
    event.preventDefault();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    visible = false;
    onUnavailable();
  }
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  schedule();

  return {
    setView(next: CampusView) {
      view = next;
      schedule();
    },
    setMode(next: CampusMode) {
      exterior.visible = next === "exterior";
      interior.visible = next === "cutaway";
      schedule();
    },
    setMotion(active: boolean) {
      if (motion === active) return;
      motion = active;
      motionStart = null;
      schedule();
    },
    dispose() {
      resize.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      scene.traverse((item) => {
        if (item instanceof T.InstancedMesh) item.dispose();
      });
      geometry.dispose();
      Object.values(finishes).forEach((finish) => finish.dispose());
      grid.geometry.dispose();
      grid.material.dispose();
      ticksGeometry.dispose();
      ticksMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
