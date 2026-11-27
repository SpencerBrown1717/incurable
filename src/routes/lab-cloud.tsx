import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useReducer, useState, type FormEvent } from "react";
import {
  CalendarClock,
  Check,
  Download,
  FlaskConical,
  KeyRound,
  Play,
} from "lucide-react";
import {
  advanceLabCloud,
  createLabCloudState,
  estimateLabCloudCost,
  getLabCloudResultCsv,
  LAB_CLOUD_DURATIONS,
  LAB_CLOUD_RATE_CENTS,
  LAB_CLOUD_SLOTS,
  parseLabCloudState,
  type LabCloudAction,
  type LabCloudState,
} from "@/lib/lab-cloud";
import { pageMeta } from "@/lib/site";
import "./lab-cloud.css";

export const Route = createFileRoute("/lab-cloud")({
  head: () => ({
    meta: [
      ...pageMeta(
        "Lab Cloud — Incurable?",
        "Try requesting access, reserving time, and running a simulated optical instrument job.",
      ).meta,
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LabCloud,
});

type Role = "researcher" | "reviewer";
type Job = LabCloudState["jobs"][number];
type ConsoleState = {
  cloud: LabCloudState;
  ready: boolean;
  error?: string;
};
type ConsoleAction =
  | { type: "restore"; cloud: LabCloudState }
  | { type: "act"; action: LabCloudAction; now: number };

const STORAGE_KEY = "incurable-lab-cloud-optics-v1";
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const money = (cents: number) => usd.format(cents / 100);

const accessStatus = {
  none: "Access required",
  pending: "Awaiting review",
  approved: "Access approved",
  declined: "Access declined",
  revoked: "Access revoked",
};

function updateConsole(
  current: ConsoleState,
  event: ConsoleAction,
): ConsoleState {
  if (event.type === "restore") return { cloud: event.cloud, ready: true };
  const { state, error } = advanceLabCloud(
    current.cloud,
    event.action,
    event.now,
  );
  const visibleError = event.action.type === "tick" ? current.error : error;
  if (state === current.cloud && visibleError === current.error) return current;
  return { ...current, cloud: state, error: visibleError };
}

function LabCloud() {
  const [{ cloud, ready, error }, dispatch] = useReducer(
    updateConsole,
    undefined,
    (): ConsoleState => ({
      cloud: createLabCloudState(),
      ready: false,
    }),
  );
  const [role, setRole] = useState<Role>("researcher");
  const [slotId, setSlotId] = useState<string>(LAB_CLOUD_SLOTS[0].id);
  const [duration, setDuration] = useState<number>(LAB_CLOUD_DURATIONS[0]);
  const access = cloud.access.status;
  const canBook = ready && role === "researcher" && access === "approved";
  const hasActiveJobs = cloud.jobs.some(
    ({ status }) => status === "queued" || status === "running",
  );

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // The demo remains usable for the current page when storage is unavailable.
    }
    const restored = parseLabCloudState(saved);
    dispatch({
      type: "restore",
      cloud: advanceLabCloud(restored, { type: "tick" }).state,
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cloud));
    } catch {
      // Keep the sandbox functional without browser storage.
    }
  }, [cloud, ready]);

  useEffect(() => {
    if (!hasActiveJobs) return;
    const timer = window.setInterval(() => {
      dispatch({ type: "act", action: { type: "tick" }, now: Date.now() });
    }, 250);
    return () => window.clearInterval(timer);
  }, [hasActiveJobs]);

  function act(action: LabCloudAction) {
    dispatch({ type: "act", action, now: Date.now() });
  }

  function book(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canBook) act({ type: "reserve", role: "researcher", slotId, duration });
  }

  return (
    <div className="cloud-shell">
      <a className="skip" href="#cloud-main">
        Skip to console
      </a>
      <header className="cloud-header">
        <div className="cloud-frame cloud-header-inner">
          <Link to="/" className="cloud-brand">
            <span aria-hidden="true">+</span> Incurable?
          </Link>
          <span className="cloud-mode">Simulation sandbox</span>
        </div>
      </header>
      <main id="cloud-main" className="cloud-frame cloud-main">
        <div className="cloud-intro">
          <div>
            <h1>Lab Cloud</h1>
            <p>
              Request access, reserve instrument time, and retrieve the results
              of a simulated run.
            </p>
          </div>
          <div className="cloud-role">
            <span id="cloud-role-label">Demo role</span>
            <div role="group" aria-labelledby="cloud-role-label">
              <button
                type="button"
                aria-pressed={role === "researcher"}
                onClick={() => setRole("researcher")}
              >
                Researcher
              </button>
              <button
                type="button"
                aria-pressed={role === "reviewer"}
                onClick={() => setRole("reviewer")}
              >
                Facility reviewer
              </button>
            </div>
          </div>
        </div>

        <div className="cloud-grid">
          <section
            className="cloud-panel cloud-instrument"
            aria-labelledby="instrument-heading"
          >
            <div className="cloud-panel-head">
              <span>
                <FlaskConical aria-hidden="true" size={17} /> Instrument
              </span>
              <span className="cloud-instrument-id">OPT-01</span>
            </div>
            <div className="cloud-instrument-figure" aria-hidden="true">
              <svg viewBox="0 0 600 222" fill="none" role="presentation">
                <path
                  d="M27 175h546M50 151h500M90 127h420M137 104h326M96 199 272 89m-82 110 109-110m-15 110 43-110m50 110-22-110m116 110L383 89m182 110L411 89"
                  stroke="#282734"
                />
                <path
                  d="m75 164 261 42 184-87-263-42zM75 164v8l261 43 184-87v-9M336 206v9"
                  stroke="#777387"
                />
                <path
                  d="m128 146 131 22 71-34-131-22zM128 146v11l131 22 71-34v-11M259 168v11"
                  fill="#1e1b2b"
                  stroke="#afa2cf"
                />
                <path
                  d="m233 124 62 10 37-17-62-10zM233 124v-39l37-17 62 10v39M295 134V95l37-17m-99 7 62 10"
                  fill="#222033"
                  stroke="#bbaeeb"
                />
                <path d="m239 96 38 6v16l-38-6zM320 91v14" stroke="#bcf1fb" />
                <path
                  d="m344 123 75 12 44-21-76-12zM344 123v10l75 12 44-21v-10m-44 21v10"
                  fill="#171825"
                  stroke="#777387"
                />
                <path
                  d="m359 122 60 9 27-13-60-9zM319 107l55 9"
                  stroke="#8ee7eb"
                />
                <circle cx="375" cy="116" r="3" fill="#b5f6f0" />
                <path
                  d="M190 77h31m-16-15v30m210-18h24m-12-12v24"
                  stroke="#635b77"
                />
              </svg>
            </div>
            <div className="cloud-instrument-info">
              <div>
                <h2 id="instrument-heading">Optical reference plate</h2>
                <p>
                  Measure a synthetic transmission curve from a fixed reference
                  plate.
                </p>
              </div>
              <div className="cloud-rate">
                <strong>{money(LAB_CLOUD_RATE_CENTS)}</strong>
                <span>per demo minute</span>
              </div>
            </div>
          </section>

          <div className="cloud-controls">
            <section
              className="cloud-panel cloud-access"
              aria-labelledby="access-heading"
            >
              <div className="cloud-panel-head">
                <h2 id="access-heading">
                  <KeyRound aria-hidden="true" size={17} /> Access
                </h2>
                <span
                  className="cloud-status"
                  data-status={access}
                  role="status"
                >
                  {accessStatus[access]}
                </span>
              </div>
              <div className="cloud-panel-body">
                {role === "researcher" ? (
                  <>
                    <p>
                      {access === "approved"
                        ? "You can reserve the optical simulator."
                        : access === "pending"
                          ? "Switch to Facility reviewer to decide this demo request."
                          : "Request permission to reserve the optical simulator."}
                    </p>
                    {access !== "approved" && access !== "pending" && (
                      <button
                        className="cloud-button cloud-button-primary"
                        type="button"
                        disabled={!ready}
                        onClick={() => act({ type: "request-access", role })}
                      >
                        Request access
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      {access === "pending"
                        ? "Review the researcher’s request for the optical simulator."
                        : access === "approved"
                          ? "The researcher currently has access to the simulator."
                          : "Access requests appear here for review."}
                    </p>
                    {access === "pending" && (
                      <div className="cloud-actions">
                        <button
                          className="cloud-button cloud-button-primary"
                          type="button"
                          onClick={() =>
                            act({
                              type: "review-access",
                              role,
                              decision: "approve",
                            })
                          }
                        >
                          <Check aria-hidden="true" size={16} /> Approve access
                        </button>
                        <button
                          className="cloud-button"
                          type="button"
                          onClick={() =>
                            act({
                              type: "review-access",
                              role,
                              decision: "decline",
                            })
                          }
                        >
                          Decline
                        </button>
                      </div>
                    )}
                    {access === "approved" && (
                      <button
                        className="cloud-button"
                        type="button"
                        onClick={() =>
                          act({
                            type: "review-access",
                            role,
                            decision: "revoke",
                          })
                        }
                      >
                        Revoke access
                      </button>
                    )}
                  </>
                )}
              </div>
            </section>

            <section
              className="cloud-panel"
              aria-labelledby="reservation-heading"
            >
              <div className="cloud-panel-head">
                <h2 id="reservation-heading">
                  <CalendarClock aria-hidden="true" size={17} /> Reserve time
                </h2>
              </div>
              <form className="cloud-panel-body cloud-reserve" onSubmit={book}>
                <div className="cloud-fields">
                  <label>
                    Demo slot
                    <select
                      value={slotId}
                      onChange={(event) => setSlotId(event.target.value)}
                    >
                      {LAB_CLOUD_SLOTS.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Duration
                    <select
                      value={duration}
                      onChange={(event) =>
                        setDuration(Number(event.target.value))
                      }
                    >
                      {LAB_CLOUD_DURATIONS.map((minutes) => (
                        <option key={minutes} value={minutes}>
                          {minutes} min
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="cloud-reserve-footer">
                  <div>
                    <span>Estimated demo cost</span>
                    <output aria-live="polite">
                      {money(estimateLabCloudCost(duration))}
                    </output>
                  </div>
                  <button
                    type="submit"
                    className="cloud-button cloud-button-primary"
                    disabled={!canBook}
                  >
                    Reserve time
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>

        {error && (
          <p className="cloud-error" role="alert">
            {error}
          </p>
        )}

        <section className="cloud-activity" aria-labelledby="activity-heading">
          <h2 id="activity-heading">Reservations &amp; runs</h2>
          <div className="cloud-panel">
            {cloud.reservations.length === 0 && (
              <p className="cloud-empty">
                Your reservations and simulation results will appear here.
              </p>
            )}
            {[...cloud.reservations].reverse().map((reservation) => {
              const slot = LAB_CLOUD_SLOTS.find(
                (item) => item.id === reservation.slotId,
              );
              const jobs = cloud.jobs.filter(
                (job) => job.reservationId === reservation.id,
              );
              const consumed = jobs.some(
                ({ status }) => status === "completed",
              );
              const active = jobs.some(
                ({ status }) => status === "queued" || status === "running",
              );
              const reserved = reservation.status === "reserved";
              return (
                <article className="cloud-booking" key={reservation.id}>
                  <div className="cloud-booking-head">
                    <div>
                      <h3>
                        {slot?.label} · {reservation.duration} min
                      </h3>
                      <p>
                        {money(reservation.estimateCents)} estimate ·{" "}
                        {consumed
                          ? "Used"
                          : reserved
                            ? "Reserved"
                            : "Cancelled"}
                      </p>
                    </div>
                    {role === "researcher" &&
                      reserved &&
                      !active &&
                      !consumed && (
                        <div className="cloud-actions">
                          <button
                            className="cloud-button cloud-button-primary"
                            type="button"
                            disabled={!canBook}
                            onClick={() =>
                              act({
                                type: "submit-job",
                                role,
                                reservationId: reservation.id,
                              })
                            }
                          >
                            <Play aria-hidden="true" size={15} /> Run simulation
                          </button>
                          <button
                            className="cloud-button"
                            type="button"
                            onClick={() =>
                              act({
                                type: "cancel-reservation",
                                role,
                                reservationId: reservation.id,
                              })
                            }
                          >
                            Cancel reservation
                          </button>
                        </div>
                      )}
                  </div>
                  {jobs.map((job) => (
                    <div className="cloud-job" key={job.id}>
                      <div className="cloud-job-head">
                        <p>
                          Run <code>{job.id}</code>
                          <span
                            className="cloud-status"
                            data-status={job.status}
                            role="status"
                          >
                            {job.status}
                          </span>
                        </p>
                        {role === "researcher" &&
                          (job.status === "queued" ||
                            job.status === "running") && (
                            <button
                              type="button"
                              className="cloud-button"
                              onClick={() =>
                                act({ type: "cancel-job", role, jobId: job.id })
                              }
                            >
                              Cancel run
                            </button>
                          )}
                      </div>
                      {job.result && <RunResult job={job} />}
                    </div>
                  ))}
                </article>
              );
            })}
          </div>
        </section>
        <p className="cloud-note">
          Demo roles, reservations, and results are saved in this browser.
          Estimates don’t charge a payment method.
        </p>
      </main>
    </div>
  );
}

function RunResult({ job }: { job: Job }) {
  const result = job.result;
  if (!result) return null;
  const points = result.samples
    .map(
      ({ transmissionPercent }, index) =>
        `${24 + (index * 512) / Math.max(1, result.samples.length - 1)},${112 - transmissionPercent}`,
    )
    .join(" ");

  function download() {
    const csv = getLabCloudResultCsv(job);
    if (!csv) return;
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${job.id}-simulated-optics.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="cloud-result">
      <figure>
        <svg
          viewBox="0 0 560 140"
          role="img"
          aria-label={`Simulated transmission curve from ${result.minTransmission}% to ${result.maxTransmission}%`}
        >
          <path
            d="M24 12v100h512M24 62h512M24 12h512"
            fill="none"
            stroke="#3b3648"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#a6efea"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <figcaption>
          Simulated transmission · {result.samples[0].wavelengthNm}–
          {result.samples.at(-1)?.wavelengthNm} nm
        </figcaption>
      </figure>
      <div className="cloud-result-summary">
        <dl>
          <div>
            <dt>Minimum</dt>
            <dd>{result.minTransmission}%</dd>
          </div>
          <div>
            <dt>Maximum</dt>
            <dd>{result.maxTransmission}%</dd>
          </div>
        </dl>
        <button type="button" className="cloud-button" onClick={download}>
          <Download aria-hidden="true" size={16} /> Download CSV
        </button>
      </div>
    </div>
  );
}
