import { useEffect, useState } from "react";
import { bays } from "@/lib/site";

const SEED = Array.from({ length: 36 }, (_, i) => Math.round(28 + Math.sin(i / 3) * 10 + ((i * 7) % 5)));

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function DarkFloor() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(true);
  const [trace, setTrace] = useState<number[]>(SEED);
  const bay = bays[active] ?? bays[0];

  useEffect(() => {
    if (!running || reduced) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % bays.length);
      setTrace((current) => {
        const next = current[current.length - 1] ?? 30;
        const wobble = ((current.length * 5) % 7) - 3;
        return [...current.slice(1), Math.max(12, Math.min(56, next + wobble))];
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, [running, reduced]);

  const width = 360;
  const height = 72;
  const max = Math.max(...trace);
  const min = Math.min(...trace);
  const span = max - min || 1;
  const points = trace
    .map((value, index) => {
      const x = (index / (trace.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const centers = bays.map((_, index) => 72 + index * ((800 - 144) / (bays.length - 1)));
  const carriage = centers[active] ?? centers[0];

  function choose(index: number) {
    setActive(index);
    setRunning(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="kicker">Hall 01 · plan · lights off</p>
        <p className="kicker">{running && !reduced ? "Gantry running" : "Gantry held"}</p>
      </div>
      <div className="mt-4 border border-hairline bg-obsidian">
        <svg
          viewBox="0 0 800 200"
          className="block h-auto w-full text-ash"
          role="img"
          aria-label="Plan of Hall 01. Eight bays along a gantry, on a floor the proportion of a football field."
        >
          <rect x="16" y="28" width="768" height="148" fill="var(--color-graphite)" stroke="currentColor" strokeOpacity="0.28" />
          <text x="28" y="48" fill="var(--color-pumice)" fontFamily="ui-monospace, monospace" fontSize="11">
            0 ft
          </text>
          <text x="772" y="48" textAnchor="end" fill="var(--color-pumice)" fontFamily="ui-monospace, monospace" fontSize="11">
            360 ft
          </text>
          <line x1="40" y1="108" x2="760" y2="108" stroke="currentColor" strokeOpacity="0.2" />
          {bays.map((item, index) => {
            const cx = centers[index] ?? 0;
            const on = index === active;
            return (
              <g key={item.id}>
                <rect
                  x={cx - 16}
                  y="92"
                  width="32"
                  height="32"
                  fill={on ? "var(--color-obsidian)" : "transparent"}
                  stroke="var(--color-ash)"
                  strokeOpacity={on ? 0.95 : 0.28}
                />
                <text
                  x={cx}
                  y="82"
                  textAnchor="middle"
                  fill={on ? "var(--color-ash)" : "var(--color-pumice)"}
                  fontFamily="ui-monospace, monospace"
                  fontSize="12"
                >
                  {item.id}
                </text>
              </g>
            );
          })}
          <g
            style={{
              transform: `translateX(${carriage}px)`,
              transition: reduced ? "none" : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <line x1="0" y1="40" x2="0" y2="164" stroke="var(--color-trace)" strokeWidth="1.25" />
            <rect x="-3.5" y="104.5" width="7" height="7" fill="var(--color-trace)" />
          </g>
        </svg>
      </div>
      <p className="mt-3 text-sm text-pumice">
        A plan, not a live feed. The hall is what we are building. The gantry here is a model of the loop.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4 lg:grid-cols-8">
        {bays.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === active}
            onClick={() => choose(index)}
            className={`min-h-11 bg-obsidian px-3 py-3 text-left ${index === active ? "text-ash" : "text-pumice"}`}
          >
            <span className="kicker">{item.id}</span>
            <span className="mt-1 block text-sm">{item.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 border-t border-hairline pt-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="kicker">
            Bay {bay.id} · {bay.kind}
          </p>
          <h3 className="idx mt-3">{bay.name}</h3>
          <p className="mt-3 max-w-xl text-pumice">{bay.line}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setRunning((value) => !value)}
              disabled={reduced}
            >
              {running ? "Hold the gantry" : "Run the gantry"}
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="kicker">Readouts, model shift</p>
            <p className="font-mono text-sm tabular-nums text-ash">{trace[trace.length - 1]}</p>
          </div>
          <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 block h-auto w-full" aria-hidden="true">
            <polyline fill="none" stroke="var(--color-trace)" strokeWidth="1.4" points={points} />
          </svg>
        </div>
      </div>
    </div>
  );
}
