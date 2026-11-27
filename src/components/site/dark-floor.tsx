import { useEffect, useState } from "react";
import { FIELD_FT, bays } from "@/lib/site";

const bayCenters = bays.map(
  (_, index) => 86 + index * (628 / (bays.length - 1)),
);

export function DarkFloor() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const bay = bays[active] ?? bays[0];
  const carriage = bayCenters[active] ?? bayCenters[0];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % bays.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className="floor-plan">
      <div className="floor-plan-header">
        <p>
          Hall 01{" "}
          <span>
            · {FIELD_FT.length} × {FIELD_FT.width} ft
          </span>
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? "Pause simulation" : "Play simulation"}
        </button>
      </div>
      <svg
        viewBox="0 0 800 196"
        className="floor-plan-drawing"
        role="img"
        aria-label="Schematic view of eight lab bays served by one gantry"
      >
        <rect
          x="34"
          y="26"
          width="732"
          height="144"
          rx="5"
          fill="#151020"
          stroke="#5e4b74"
        />
        <line
          x1="54"
          y1="98"
          x2="746"
          y2="98"
          stroke="#6d5489"
          strokeDasharray="5 6"
        />
        {bays.map((item, index) => {
          const center = bayCenters[index];
          const selected = index === active;
          return (
            <g key={item.id}>
              <rect
                x={center - 24}
                y="74"
                width="48"
                height="48"
                rx="4"
                fill={selected ? "#6b488d" : "#231934"}
                stroke={selected ? "#ddbbff" : "#5e4b74"}
              />
              <text
                x={center}
                y="153"
                textAnchor="middle"
                fill={selected ? "#f4e3ff" : "#ae9dbf"}
                fontFamily="monospace"
                fontSize="13"
              >
                {item.id}
              </text>
            </g>
          );
        })}
        <g
          className="floor-plan-gantry"
          style={{ transform: `translateX(${carriage}px)` }}
        >
          <line
            x1="0"
            y1="40"
            x2="0"
            y2="131"
            stroke="#e2b8ff"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="98" r="6" fill="#f4d8ff" />
        </g>
      </svg>
      <div
        className="floor-plan-bays"
        role="group"
        aria-label="Select a lab bay"
      >
        {bays.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === active}
            onClick={() => {
              setActive(index);
              setRunning(false);
            }}
          >
            <span>{item.id}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="floor-plan-detail" aria-live={running ? "off" : "polite"}>
        <div>
          <p className="home-label">
            Bay {bay.id} · {bay.kind}
          </p>
          <h3 className="idx mt-1">{bay.name}</h3>
        </div>
        <p>{bay.line}</p>
      </div>
    </div>
  );
}
