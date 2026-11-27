import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { FIELD_SQFT, HALLS_AT_HYPERION, HYPERION_SQFT, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/labs")({
  head: () =>
    pageMeta(
      "173.6 halls — Incurable?",
      "Hall 01 is one football field of automated CRISPR and mRNA, lights off, 24/7/365. About 174 of them fit Meta’s Hyperion footprint.",
    ),
  component: Labs,
});

const bars = [
  { label: "A bench", sqft: 24, note: "One person, one hood." },
  { label: "Hall 01", sqft: FIELD_SQFT, note: "360 × 160 ft. Lights off." },
  { label: "Hyperion reference", sqft: HYPERION_SQFT, note: "Nearly 10 million sq ft. Meta, Richland Parish." },
];

function Labs() {
  const max = HYPERION_SQFT;
  return (
    <Shell>
      <PageHero
        kicker="Labs"
        title="173.6 halls."
        italic="The size of the reference."
        dek="A fully autonomous wet lab for CRISPR and mRNA. Hall 01 is one football field, lights off, 24/7/365. Meta’s Hyperion footprint holds about 174 of them. That is the campus the business is drawn to."
      />
      <section className="frame section">
        <div className="prose">
          <p>
            Car plants learned this before biology did. When the cell no longer needs a person, you do not
            keep the overheads on out of habit. You turn them off. The line still runs. A human, elsewhere,
            still owns the stop.
          </p>
          <p>
            Drug discovery kept the lights on because the protocol was a walk. Hood to incubator to
            sequencer, with a label in between. Incurable? designs the hall the other way around. The
            gantry is the walk. mRNA synthesis, particle formation, cell dosing, CRISPR editing, and the
            readout sit on one spine. The sample does not wait for a shift change.
          </p>
          <h2>Fully autonomous, inside an envelope</h2>
          <p>
            Fully autonomous does not mean unsupervised in the moral sense. It means no person in the aisle.
            Air, interlocks, and biosafety are designed as a closed envelope — the default hall at a level a
            competent institutional board would recognize, higher containment in sealed rooms off the main
            gantry, not as an afterthought behind a door someone props open. The floor is empty. The stop is
            not automated. A person, off the floor, can cut the hall.
          </p>
        </div>

        <div className="mt-16">
          <p className="kicker">Scale, honest proportions</p>
          <p className="dek mt-4">
            The bench disappears. That is the point. Bar length is floor area, not ambition.
          </p>
          <ul className="mt-8 space-y-6">
            {bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <p>{bar.label}</p>
                  <p className="font-mono text-xs tabular-nums text-pumice">{bar.sqft.toLocaleString()} sq ft</p>
                </div>
                <div className="mt-2 h-3 bg-graphite">
                  <div
                    className="h-full bg-ash"
                    style={{ width: `${Math.max((bar.sqft / max) * 100, bar.sqft === 24 ? 0.35 : 0.8)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-pumice">{bar.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-pumice">
            {HYPERION_SQFT.toLocaleString()} ÷ {FIELD_SQFT.toLocaleString()} = {HALLS_AT_HYPERION.toFixed(1)}{" "}
            halls. Louisiana Economic Development, 13 July 2026, on Meta’s Richland Parish campus. An
            earlier public figure was four million square feet. We cite the later one, and we are not
            claiming the site.
          </p>
        </div>
      </section>
      <section className="rule">
        <div className="frame section">
          <h2 className="statement">
            One field is the module.
            <span className="italic"> The campus is the repetition.</span>
          </h2>
          <p className="dek mt-6">
            We are not building a bigger university lab. We are building the biology equivalent of a
            hyperscale floorplate, and selling the assay exhaust to the models that hyperscale exists to
            train.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/science" className="btn btn-primary">
              The loop
            </Link>
            <Link to="/data" className="btn btn-ghost">
              The data
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
