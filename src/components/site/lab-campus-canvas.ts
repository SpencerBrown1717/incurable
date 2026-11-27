type Point = [number, number, number];

export type CampusCanvasBox = {
  at: Point;
  size: Point;
  color: number;
  opacity: number;
  roll?: number;
};

type RenderInput = {
  width: number;
  height: number;
  pixelRatio: number;
  scale: number;
  azimuth: number;
  elevation: number;
  boxes: readonly CampusCanvasBox[];
};

const faces = [
  { corners: [0, 4, 6, 2], axis: 0, side: -1, shade: 0.88 },
  { corners: [1, 3, 7, 5], axis: 0, side: 1, shade: 1.23 },
  { corners: [0, 1, 5, 4], axis: 1, side: -1, shade: 0.7 },
  { corners: [2, 6, 7, 3], axis: 1, side: 1, shade: 1.9 },
  { corners: [0, 2, 3, 1], axis: 2, side: -1, shade: 0.95 },
  { corners: [4, 5, 7, 6], axis: 2, side: 1, shade: 1.5 },
];

type PreparedBox = {
  cos: number;
  sin: number;
  corners: Point[];
  fills: string[];
  layer: number;
};

type ProjectedFace = {
  points: Point[];
  corners: number[];
  fill: string;
  depth: number;
  layer: number;
};

function faceColor(color: number, shade: number, opacity: number) {
  const red = (color >> 16) & 255;
  const green = (color >> 8) & 255;
  const blue = color & 255;
  const multiplier =
    Math.max(red, green, blue) > 175 ? Math.min(shade, 1.08) : shade;
  const channel = (value: number) =>
    Math.min(255, Math.round(value * multiplier));
  return `rgba(${channel(red)}, ${channel(green)}, ${channel(blue)}, ${opacity})`;
}

function prepare(box: CampusCanvasBox): PreparedBox {
  const [x, y, z] = box.at;
  const [width, height, depth] = box.size;
  const cos = Math.cos(box.roll ?? 0);
  const sin = Math.sin(box.roll ?? 0);
  const corners: Point[] = [];
  for (let index = 0; index < 8; index++) {
    const dx = width * (index & 1 ? 0.5 : -0.5);
    const dy = height * (index & 2 ? 0.5 : -0.5);
    const dz = depth * (index & 4 ? 0.5 : -0.5);
    corners.push([x + dx * cos - dy * sin, y + dx * sin + dy * cos, z + dz]);
  }
  const top = y + height / 2;
  // The broad platform faces extend under the model even when their centers
  // are closer to the camera than one of the halls.
  const layer =
    width >= 40 && depth >= 25 ? 0 : top <= 0.18 ? 1 : top <= 0.49 ? 2 : 3;
  return {
    cos,
    sin,
    corners,
    fills: faces.map(({ shade }) => faceColor(box.color, shade, box.opacity)),
    layer,
  };
}

export function createCampusCanvas() {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");
  if (!context) return;
  element.setAttribute("aria-hidden", "true");
  const prepared = new WeakMap<CampusCanvasBox, PreparedBox>();

  function render({
    width,
    height,
    pixelRatio,
    scale,
    azimuth,
    elevation,
    boxes,
  }: RenderInput) {
    if (!context) return;
    const pixelsWide = Math.round(width * pixelRatio);
    const pixelsHigh = Math.round(height * pixelRatio);
    if (element.width !== pixelsWide || element.height !== pixelsHigh) {
      element.width = pixelsWide;
      element.height = pixelsHigh;
    }
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const cosA = Math.cos(azimuth);
    const sinA = Math.sin(azimuth);
    const cosE = Math.cos(elevation);
    const sinE = Math.sin(elevation);
    const cameraX = sinA * cosE;
    const cameraZ = cosA * cosE;
    const midX = width / 2;
    const midY = height / 2;

    function project([x, y, z]: Point): Point {
      const centeredY = y - 1.4;
      const distance = x * sinA + z * cosA;
      return [
        midX + (x * cosA - z * sinA) * scale,
        midY + (distance * sinE - centeredY * cosE) * scale,
        distance * cosE + centeredY * sinE,
      ];
    }

    function trace(start: Point, end: Point) {
      if (!context) return;
      const [x1, y1] = project(start);
      const [x2, y2] = project(end);
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
    }

    context.lineWidth = 0.65;
    context.strokeStyle = "rgba(63, 114, 135, 0.17)";
    context.beginPath();
    for (let i = -32; i <= 32; i++) {
      const position = i * 1.25;
      trace([-40, -0.78, position], [40, -0.78, position]);
      trace([position, -0.78, -40], [position, -0.78, 40]);
    }
    context.stroke();

    context.lineWidth = 0.85;
    context.strokeStyle = "rgba(111, 186, 211, 0.48)";
    context.beginPath();
    for (const x of [-1, 1]) {
      for (const z of [-1, 1]) {
        const px = x * 22.9;
        const pz = z * 14.9;
        trace([px, -0.52, pz], [px - x * 2.3, -0.52, pz]);
        trace([px, -0.52, pz], [px, -0.52, pz - z * 2.3]);
      }
    }
    context.stroke();

    const projected: ProjectedFace[] = [];
    for (const box of boxes) {
      let data = prepared.get(box);
      if (!data) {
        data = prepare(box);
        prepared.set(box, data);
      }
      const { cos, sin, corners, fills, layer } = data;
      const facing = [
        cameraX * cos + sinE * sin,
        -cameraX * sin + sinE * cos,
        cameraZ,
      ];
      const points = corners.map(project);

      for (let index = 0; index < faces.length; index++) {
        const { axis, side, corners: order } = faces[index];
        if (facing[axis] * side <= 0.001) continue;
        const depth =
          (points[order[0]][2] +
            points[order[1]][2] +
            points[order[2]][2] +
            points[order[3]][2]) /
          4;
        projected.push({
          points,
          corners: order,
          fill: fills[index],
          depth,
          layer,
        });
      }
    }
    projected.sort(
      (left, right) => left.layer - right.layer || left.depth - right.depth,
    );

    for (const { points, corners, fill } of projected) {
      const [first, second, third, fourth] = corners;
      context.fillStyle = fill;
      context.beginPath();
      context.moveTo(points[first][0], points[first][1]);
      context.lineTo(points[second][0], points[second][1]);
      context.lineTo(points[third][0], points[third][1]);
      context.lineTo(points[fourth][0], points[fourth][1]);
      context.closePath();
      context.fill();
    }
  }

  return { element, render };
}
