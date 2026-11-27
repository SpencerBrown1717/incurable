import assert from "node:assert/strict";
import test from "node:test";
import {
  advanceLabCloud,
  createLabCloudState,
  estimateLabCloudCost,
  getLabCloudResultCsv,
  LAB_CLOUD_SLOTS,
  parseLabCloudState,
  type LabCloudAction,
  type LabCloudState,
} from "./lab-cloud.ts";

const firstSlot = LAB_CLOUD_SLOTS[0].id;
const nextSlot = LAB_CLOUD_SLOTS[1].id;
const thirdSlot = LAB_CLOUD_SLOTS[2].id;
const reserve = (slotId: string = firstSlot, duration = 5): LabCloudAction => ({
  type: "reserve",
  role: "researcher",
  slotId,
  duration,
});

function approvedState(): LabCloudState {
  const { state: pending } = advanceLabCloud(
    createLabCloudState(),
    {
      type: "request-access",
      role: "researcher",
    },
    100,
  );
  return advanceLabCloud(
    pending,
    {
      type: "review-access",
      role: "reviewer",
      decision: "approve",
    },
    200,
  ).state;
}

test("researchers can request access and reviewers decide it", () => {
  const original = createLabCloudState();
  assert.match(
    advanceLabCloud(original, reserve(), 1).error!,
    /access must be approved/i,
  );
  const { state: pending } = advanceLabCloud(
    original,
    { type: "request-access", role: "researcher" },
    10,
  );
  assert.equal(pending.access.status, "pending");
  assert.equal(original.access.status, "none");
  const selfApproval = advanceLabCloud(
    pending,
    {
      type: "review-access",
      role: "researcher",
      decision: "approve",
    },
    11,
  );
  assert.match(selfApproval.error!, /reviewer/i);
  assert.equal(selfApproval.state.access.status, "pending");
  const { state: declined } = advanceLabCloud(
    pending,
    {
      type: "review-access",
      role: "reviewer",
      decision: "decline",
    },
    12,
  );
  assert.equal(declined.access.status, "declined");
  assert.equal(
    advanceLabCloud(
      declined,
      { type: "request-access", role: "researcher" },
      13,
    ).state.access.status,
    "pending",
  );
});

test("approved bookings quote cost and reject overlapping blocks", () => {
  const { state: first } = advanceLabCloud(
    approvedState(),
    reserve(firstSlot, 15),
    300,
  );
  assert.equal(first.reservations[0].estimateCents, estimateLabCloudCost(15));
  assert.match(
    advanceLabCloud(first, reserve(firstSlot), 301).error!,
    /overlaps/,
  );
  assert.match(
    advanceLabCloud(first, reserve(nextSlot), 301).error!,
    /overlaps/,
  );
  assert.match(
    advanceLabCloud(first, reserve(thirdSlot, 12), 301).error!,
    /supported duration/,
  );
  assert.equal(
    advanceLabCloud(first, reserve(thirdSlot), 301).state.reservations.length,
    2,
  );
});

test("revoking access voids active reservations and jobs", () => {
  const { state: booked } = advanceLabCloud(approvedState(), reserve(), 300);
  const reservationId = booked.reservations[0].id;
  const { state: queued } = advanceLabCloud(
    booked,
    {
      type: "submit-job",
      role: "researcher",
      reservationId,
    },
    400,
  );
  const { state: revoked } = advanceLabCloud(
    queued,
    {
      type: "review-access",
      role: "reviewer",
      decision: "revoke",
    },
    500,
  );
  assert.equal(revoked.access.status, "revoked");
  assert.equal(revoked.reservations[0].status, "cancelled");
  assert.equal(revoked.jobs[0].status, "cancelled");
  assert.match(
    advanceLabCloud(revoked, reserve(), 600).error!,
    /access must be approved/i,
  );
  assert.equal(
    advanceLabCloud(revoked, { type: "tick" }, 10000).state.jobs[0].status,
    "cancelled",
  );
});

test("a completed simulation has stable optical samples and a labeled CSV", () => {
  const { state: booked } = advanceLabCloud(approvedState(), reserve(), 300);
  const reservationId = booked.reservations[0].id;
  const submit: LabCloudAction = {
    type: "submit-job",
    role: "researcher",
    reservationId,
  };
  const { state: queued } = advanceLabCloud(booked, submit, 400);
  assert.equal(queued.jobs[0].status, "queued");
  assert.equal(getLabCloudResultCsv(queued.jobs[0]), null);
  assert.match(advanceLabCloud(queued, submit, 500).error!, /already has/);
  const { state: running } = advanceLabCloud(queued, { type: "tick" }, 1300);
  assert.equal(running.jobs[0].status, "running");
  const { state: complete } = advanceLabCloud(running, { type: "tick" }, 2800);
  const job = complete.jobs[0];
  assert.equal(job.status, "completed");
  assert.equal(job.result?.samples.length, 13);
  assert.ok(job.result!.maxTransmission > job.result!.minTransmission);
  assert.match(
    getLabCloudResultCsv(job)!,
    /^source,wavelength_nm,transmission_percent\nsimulated_optical_reference_plate,420,\d+/,
  );
  assert.match(advanceLabCloud(complete, submit, 3000).error!, /already has/);
  assert.deepEqual(parseLabCloudState(JSON.stringify(complete)), complete);
  assert.deepEqual(parseLabCloudState('{"version":1}'), createLabCloudState());
  assert.deepEqual(parseLabCloudState("{broken JSON"), createLabCloudState());
});

test("cancelling a booking releases time and stops its active job", () => {
  const { state: booked } = advanceLabCloud(approvedState(), reserve(), 300);
  const reservationId = booked.reservations[0].id;
  const { state: queued } = advanceLabCloud(
    booked,
    { type: "submit-job", role: "researcher", reservationId },
    400,
  );
  const { state: cancelled } = advanceLabCloud(
    queued,
    { type: "cancel-reservation", role: "researcher", reservationId },
    500,
  );
  assert.equal(cancelled.reservations[0].status, "cancelled");
  assert.equal(cancelled.jobs[0].status, "cancelled");
  assert.equal(
    advanceLabCloud(cancelled, reserve(), 600).state.reservations[1].status,
    "reserved",
  );
});
