import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { RotateCcw } from "lucide-react";
import {
  halls,
  initialView,
  mountCampus,
  stageDepth,
  stageWidth,
  type CampusMode,
} from "./lab-campus";
import "./lab-scene.css";

export function LabScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<Awaited<ReturnType<typeof mountCampus>>>(undefined);
  const viewRef = useRef(initialView);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(
    null,
  );
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<CampusMode>("cutaway");
  const [moving, setMoving] = useState(false);
  const instructionsId = useId();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMoving(!preference.matches);
    const onPreferenceChange = () => setMoving(!preference.matches);
    preference.addEventListener("change", onPreferenceChange);

    mountCampus(host, () => setReady(false))
      .then((campus) => {
        if (cancelled) {
          campus?.dispose();
          return;
        }
        campusRef.current = campus;
        setReady(Boolean(campus));
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
      preference.removeEventListener("change", onPreferenceChange);
      campusRef.current?.dispose();
      campusRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    campusRef.current?.setMode(mode);
    campusRef.current?.setMotion(moving);
  }, [mode, moving, ready]);

  function setView(azimuth: number, elevation = viewRef.current.elevation) {
    const next = {
      azimuth,
      elevation: Math.max(0.21, Math.min(1.05, elevation)),
    };
    viewRef.current = next;
    campusRef.current?.setView(next);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const cursor = dragRef.current;
    if (!cursor || cursor.pointerId !== event.pointerId) return;
    setView(
      viewRef.current.azimuth + (cursor.x - event.clientX) * 0.008,
      viewRef.current.elevation + (event.clientY - cursor.y) * 0.007,
    );
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  return (
    <figure className="lab-scene" data-ready={ready}>
      <div
        className="lab-scene__poster"
        aria-hidden={ready}
        role="img"
        aria-label="Illustration of a multi-wing automated wet lab campus"
      >
        <div className="lab-scene__poster-ground">
          {halls.map(({ x, z, width, depth, height }) => (
            <span
              key={x}
              className="lab-scene__poster-wing"
              style={
                {
                  left: `${((x - width / 2 + stageWidth / 2) / stageWidth) * 100}%`,
                  top: `${((z - depth / 2 + stageDepth / 2) / stageDepth) * 100}%`,
                  width: `${(width / stageWidth) * 100}%`,
                  height: `${(depth / stageDepth) * 100}%`,
                  "--wing-shift": `${height * 3}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div
        ref={hostRef}
        className="lab-scene__viewport"
        role="region"
        aria-label="Interactive 3D model of the Incurable wet lab campus"
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
          setMoving(false);
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
          setMoving(false);
          event.preventDefault();
        }}
      />
      <figcaption className="lab-scene__caption">
        {ready ? (
          <>
            <div
              className="lab-scene__views"
              role="group"
              aria-label="Facility view"
            >
              <button
                type="button"
                aria-pressed={mode === "exterior"}
                onClick={() => setMode("exterior")}
              >
                Exterior
              </button>
              <button
                type="button"
                aria-pressed={mode === "cutaway"}
                onClick={() => setMode("cutaway")}
              >
                Cutaway
              </button>
            </div>
            <span className="lab-scene__instructions" id={instructionsId}>
              Drag or use arrow keys to orbit
            </span>
            <div className="lab-scene__controls">
              <button
                type="button"
                aria-label={moving ? "Pause motion" : "Play motion"}
                onClick={() => setMoving(!moving)}
              >
                {moving ? "Pause" : "Play"}
                <span className="lab-scene__motion-word">motion</span>
              </button>
              <button
                type="button"
                aria-label="Reset view"
                title="Reset view"
                onClick={() => {
                  setMoving(false);
                  setView(initialView.azimuth, initialView.elevation);
                }}
              >
                <RotateCcw size={16} strokeWidth={1.65} aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <span className="lab-scene__static-label">Facility concept</span>
        )}
      </figcaption>
    </figure>
  );
}
