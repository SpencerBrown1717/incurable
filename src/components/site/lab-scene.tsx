import { Link } from "@tanstack/react-router";
import { FIELD_SQFT, HALLS_AT_HYPERION } from "@/lib/site";
import { SiteFigure } from "./site-figure";
import "./lab-scene.css";

const hallCount = Math.round(HALLS_AT_HYPERION);
const columns = 15;
const rows = Math.ceil(hallCount / columns);
const featuredHall = 9 * columns + 3;

function project(column: number, row: number) {
  return [284 + column * 34 - row * 16, 42 + column * 7 + row * 14];
}

function outline(column: number, row: number, width: number, depth: number) {
  const corners = [
    project(column, row),
    project(column + width, row),
    project(column + width, row + depth),
    project(column, row + depth),
  ];
  return `M${corners.map((corner) => corner.join(",")).join("L")}Z`;
}

const halls = Array.from({ length: hallCount }, (_, index) => {
  const column = index % columns;
  const row = Math.floor(index / columns);
  return outline(
    column + Math.floor(column / 5) * 0.45,
    row + Math.floor(row / 3) * 0.4,
    0.76,
    0.73,
  );
});

const grounds = outline(-0.53, -0.55, columns + 1.84, rows + 2.02);
const locator = outline(-0.84, -0.86, columns + 2.46, rows + 2.64);

export function LabScene() {
  return (
    <div className="frame campus-sketch">
      <div className="campus-sketch-heading">
        <h2 className="statement">One lab. Repeated at campus scale.</h2>
        <Link to="/labs" className="nav-link">
          See the scale comparison
        </Link>
      </div>
      <SiteFigure
        label={`Outline of ${hallCount} lab-sized tiles on an angled grid. One illuminated tile represents Lab 01.`}
        caption={
          <>
            <span className="campus-sketch-key">
              <span aria-hidden="true" />
              Lab 01 · {FIELD_SQFT.toLocaleString("en-US")} sq ft
            </span>
            <span>≈{hallCount} lab modules at the Hyperion scale reference</span>
          </>
        }
        viewBox="25 10 860 360"
        className="campus-sketch-figure"
      >
        <path className="figure-grid" d={locator} strokeDasharray="2 5" />
        <path className="figure-outline campus-sketch-edge" d={grounds} />
        <path className="figure-grid" d={grounds} transform="translate(0 7)" />
        <g className="figure-outline campus-sketch-halls">
          {halls.map((path, index) => (
            <path
              key={path}
              d={path}
              opacity={index === featuredHall ? 0 : undefined}
            />
          ))}
        </g>
        <path
          d={halls[featuredHall]}
          className="campus-sketch-highlight figure-cyan figure-pulse"
        />
        <path
          className="campus-sketch-scan figure-violet"
          d={`M${project(-0.48, 6.47).join(",")}L${project(16.07, 6.47).join(",")}`}
          pathLength="100"
        />
      </SiteFigure>
    </div>
  );
}
