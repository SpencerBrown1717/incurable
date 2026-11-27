import { z } from "zod";

export const LAB_CLOUD_RATE_CENTS = 100;
export const LAB_CLOUD_DURATIONS = [5, 10, 15] as const;
export const LAB_CLOUD_SLOTS = [
  { id: "optical-0900", label: "9:00 AM", startMinute: 9 * 60 },
  { id: "optical-0910", label: "9:10 AM", startMinute: 9 * 60 + 10 },
  { id: "optical-0920", label: "9:20 AM", startMinute: 9 * 60 + 20 },
  { id: "optical-0930", label: "9:30 AM", startMinute: 9 * 60 + 30 },
  { id: "optical-0940", label: "9:40 AM", startMinute: 9 * 60 + 40 },
  { id: "optical-0950", label: "9:50 AM", startMinute: 9 * 60 + 50 },
] as const;

const queueMs = 750;
const runMs = 1250;
const durationSchema = z.literal(LAB_CLOUD_DURATIONS);
const timestampSchema = z.number().nonnegative();
const resultSchema = z.object({
  minTransmission: z.number().min(0).max(100),
  maxTransmission: z.number().min(0).max(100),
  samples: z
    .array(
      z.object({
        wavelengthNm: z.number().positive(),
        transmissionPercent: z.number().min(0).max(100),
      }),
    )
    .min(1),
});
const reservationSchema = z.object({
  id: z.string(),
  slotId: z.string(),
  duration: durationSchema,
  estimateCents: z.number().int().nonnegative(),
  createdAt: timestampSchema,
  status: z.enum(["reserved", "cancelled"]),
});
const jobSchema = z.object({
  id: z.string(),
  reservationId: z.string(),
  status: z.enum(["queued", "running", "completed", "cancelled"]),
  createdAt: timestampSchema,
  result: resultSchema.optional(),
});
const stateSchema = z.object({
  version: z.literal(1),
  access: z.object({
    status: z.enum(["none", "pending", "approved", "declined", "revoked"]),
    requestedAt: timestampSchema.optional(),
    reviewedAt: timestampSchema.optional(),
  }),
  reservations: z.array(reservationSchema),
  jobs: z.array(jobSchema),
});

export type LabCloudState = z.infer<typeof stateSchema>;
export type LabCloudJob = z.infer<typeof jobSchema>;
export type LabCloudRole = "researcher" | "reviewer";
export type LabCloudAction =
  | { type: "request-access"; role: LabCloudRole }
  | {
      type: "review-access";
      role: LabCloudRole;
      decision: "approve" | "decline" | "revoke";
    }
  | { type: "reserve"; role: LabCloudRole; slotId: string; duration: number }
  | { type: "cancel-reservation"; role: LabCloudRole; reservationId: string }
  | { type: "submit-job"; role: LabCloudRole; reservationId: string }
  | { type: "cancel-job"; role: LabCloudRole; jobId: string }
  | { type: "tick" };

type LabCloudTransition = { state: LabCloudState; error?: string };

export function createLabCloudState(): LabCloudState {
  return { version: 1, access: { status: "none" }, reservations: [], jobs: [] };
}

export function parseLabCloudState(raw: string | null): LabCloudState {
  if (raw !== null) {
    try {
      const parsed = stateSchema.safeParse(JSON.parse(raw));
      if (parsed.success) return parsed.data;
    } catch {
      // A damaged local demo record can safely start fresh.
    }
  }
  return createLabCloudState();
}

export function estimateLabCloudCost(duration: number): number {
  return duration * LAB_CLOUD_RATE_CENTS;
}

function simulateReferencePlate(): z.infer<typeof resultSchema> {
  const samples = Array.from({ length: 13 }, (_, index) => {
    const wavelengthNm = 420 + index * 20;
    const normalizedDistance = (wavelengthNm - 550) / 58;
    const transmissionPercent = Number(
      (24 + 65 * Math.exp(-(normalizedDistance ** 2))).toFixed(2),
    );
    return { wavelengthNm, transmissionPercent };
  });
  const transmission = samples.map(
    ({ transmissionPercent }) => transmissionPercent,
  );
  return {
    minTransmission: Math.min(...transmission),
    maxTransmission: Math.max(...transmission),
    samples,
  };
}

function isActive(job: LabCloudJob): boolean {
  return job.status === "queued" || job.status === "running";
}

function advanceJobs(state: LabCloudState, now: number): LabCloudState {
  let changed = false;
  const jobs = state.jobs.map((job): LabCloudJob => {
    if (!isActive(job)) return job;
    const elapsed = now - job.createdAt;
    if (elapsed >= queueMs + runMs) {
      changed = true;
      return { ...job, status: "completed", result: simulateReferencePlate() };
    }
    if (elapsed >= queueMs && job.status === "queued") {
      changed = true;
      return { ...job, status: "running" };
    }
    return job;
  });
  return changed ? { ...state, jobs } : state;
}

export function advanceLabCloud(
  previous: LabCloudState,
  action: LabCloudAction,
  now = Date.now(),
): LabCloudTransition {
  const state = advanceJobs(previous, now);
  const reject = (error: string): LabCloudTransition => ({ state, error });
  if (action.type === "tick") return { state };
  if (action.type === "review-access") {
    if (action.role !== "reviewer")
      return reject("Switch to the reviewer to decide access.");
    if (action.decision === "revoke") {
      if (state.access.status !== "approved")
        return reject("There is no approved access to revoke.");
      const completedReservations = new Set(
        state.jobs
          .filter((job) => job.status === "completed")
          .map((job) => job.reservationId),
      );
      return {
        state: {
          ...state,
          access: { ...state.access, status: "revoked", reviewedAt: now },
          reservations: state.reservations.map((reservation) =>
            completedReservations.has(reservation.id)
              ? reservation
              : { ...reservation, status: "cancelled" },
          ),
          jobs: state.jobs.map((job) =>
            isActive(job) ? { ...job, status: "cancelled" } : job,
          ),
        },
      };
    }
    if (state.access.status !== "pending")
      return reject("There is no access request to review.");
    const status = action.decision === "approve" ? "approved" : "declined";
    return {
      state: { ...state, access: { ...state.access, status, reviewedAt: now } },
    };
  }

  if (action.role !== "researcher")
    return reject(
      "Switch to the researcher to manage requests and reservations.",
    );
  switch (action.type) {
    case "request-access": {
      if (state.access.status === "pending")
        return reject("An access request is already pending.");
      if (state.access.status === "approved")
        return reject("The researcher already has access.");
      return {
        state: { ...state, access: { status: "pending", requestedAt: now } },
      };
    }
    case "reserve": {
      if (state.access.status !== "approved")
        return reject("Access must be approved before reserving time.");
      const slot = LAB_CLOUD_SLOTS.find(({ id }) => id === action.slotId);
      const duration = durationSchema.safeParse(action.duration);
      if (!slot || !duration.success)
        return reject("Choose a demo time and a supported duration.");
      const conflicts = state.reservations.some((reservation) => {
        if (reservation.status !== "reserved") return false;
        const existing = LAB_CLOUD_SLOTS.find(
          ({ id }) => id === reservation.slotId,
        );
        return (
          existing !== undefined &&
          slot.startMinute < existing.startMinute + reservation.duration &&
          existing.startMinute < slot.startMinute + duration.data
        );
      });
      if (conflicts)
        return reject(
          "That time overlaps a reservation. Choose a different slot.",
        );
      return {
        state: {
          ...state,
          reservations: [
            ...state.reservations,
            {
              id: `reservation-${state.reservations.length + 1}`,
              slotId: slot.id,
              duration: duration.data,
              estimateCents: estimateLabCloudCost(duration.data),
              createdAt: now,
              status: "reserved",
            },
          ],
        },
      };
    }
    case "cancel-reservation": {
      const reservation = state.reservations.find(
        ({ id }) => id === action.reservationId,
      );
      if (!reservation || reservation.status !== "reserved")
        return reject("Select an active reservation.");
      if (
        state.jobs.some(
          (job) =>
            job.reservationId === reservation.id && job.status === "completed",
        )
      ) {
        return reject("This reservation already has a completed run.");
      }
      return {
        state: {
          ...state,
          reservations: state.reservations.map((item) =>
            item.id === reservation.id
              ? { ...item, status: "cancelled" }
              : item,
          ),
          jobs: state.jobs.map((job) =>
            job.reservationId === reservation.id && isActive(job)
              ? { ...job, status: "cancelled" }
              : job,
          ),
        },
      };
    }
    case "submit-job": {
      if (state.access.status !== "approved")
        return reject("Access must be approved before running the simulation.");
      const reservation = state.reservations.find(
        ({ id }) => id === action.reservationId,
      );
      if (!reservation || reservation.status !== "reserved")
        return reject("Reserve a time before starting a run.");
      if (
        state.jobs.some(
          (job) =>
            job.reservationId === reservation.id && job.status !== "cancelled",
        )
      ) {
        return reject(
          "This reservation already has a queued, running, or completed job.",
        );
      }
      return {
        state: {
          ...state,
          jobs: [
            ...state.jobs,
            {
              id: `job-${state.jobs.length + 1}`,
              reservationId: reservation.id,
              status: "queued",
              createdAt: now,
            },
          ],
        },
      };
    }
    case "cancel-job": {
      const job = state.jobs.find(({ id }) => id === action.jobId);
      if (!job || !isActive(job))
        return reject("Only a queued or running job can be cancelled.");
      return {
        state: {
          ...state,
          jobs: state.jobs.map((item) =>
            item.id === job.id ? { ...item, status: "cancelled" } : item,
          ),
        },
      };
    }
  }
}

export function getLabCloudResultCsv(job: LabCloudJob): string | null {
  if (job.status !== "completed" || !job.result) return null;
  return (
    [
      "source,wavelength_nm,transmission_percent",
      ...job.result.samples.map(
        ({ wavelengthNm, transmissionPercent }) =>
          `simulated_optical_reference_plate,${wavelengthNm},${transmissionPercent.toFixed(2)}`,
      ),
    ].join("\n") + "\n"
  );
}
