import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFigure } from "@/components/site/site-figure";
import { PageHero, Shell } from "@/components/site/shell";
import {
  FIELD_FT,
  FIELD_SQFT,
  HALLS_AT_HYPERION,
  HYPERION_SQFT,
  pageMeta,
} from "@/lib/site";

export const Route = createFileRoute("/labs")({
  head: () =>
    pageMeta(
      "173.6 halls — Incurable?",
      "Hall 01 is one football field of automated CRISPR and mRNA, lights off, 24/7/365. About 174 of them fit Meta’s Hyperion footprint.",
    ),
  component: Labs,
});

const hallCount = Math.round(HALLS_AT_HYPERION);

function HallScale() {
  return (
    <SiteFigure
      label={`An enlarged outline of Hall 01 beside ${hallCount} smaller outlines representing the Hyperion area comparison.`}
      caption="Hall 01 enlarged beside the area equivalent of Meta’s Hyperion campus."
      viewBox="0 0 640 260"
    >
      <g className="figure-grid">
        <path d="M30 46h580M30 216h580M30 32v194m580-194v194" />
        <path d="M151 54v138M48 128h214" strokeDasharray="4 5" />
        <rect x="322" y="38" width="277" height="171" />
      </g>
      <g className="figure-outline">
        <path d="M52 72h198M52 68v8m198-8v8M42 84v88m-4-88h8m-8 88h8" />
        <rect x="57" y="89" width="188" height="78" />
        <path d="M57 112h188m-188 32h188M87 89v78m32-78v78m32-78v78m32-78v78m32-78v78" />
        {Array.from({ length: hallCount - 1 }, (_, index) => {
          const tile = index + 1;
          const x = 334 + (tile % 15) * 17.1;
          const y = 50 + Math.floor(tile / 15) * 13.1;
          return <rect key={tile} x={x} y={y} width="14.4" height="6.4" />;
        })}
      </g>
      <rect className="figure-strong" x="52" y="84" width="198" height="88" />
      <path
        className="figure-cyan"
        d="M250 128h47V53.2h37"
        strokeDasharray="4 5"
      />
      <rect className="figure-cyan" x="334" y="50" width="14.4" height="6.4" />
      <path
        className="figure-pulse figure-strong"
        d="M297 72V53.2h37"
        strokeDasharray="14 40"
        strokeWidth="2"
      />
      <g className="figure-label">
        <text x="52" y="204">
          HALL 01
        </text>
        <text x="334" y="237">
          AREA EQUIVALENTS
        </text>
      </g>
    </SiteFigure>
  );
}

function Labs() {
  return (
    <Shell>
      <PageHero
        kicker="Labs"
        title="173.6 halls."
        italic="The size of the reference."
        dek="A fully autonomous wet lab for CRISPR and mRNA. Hall 01 is one football field, lights off, 24/7/365. Meta’s Hyperion footprint holds about 174 of them. That is the campus the business is drawn to."
      />
      <section className="frame section">
        <div className="grid items-center gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
          <div>
            <h2 className="idx">One hall at campus scale.</h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="border-t border-hairline pt-3">
                <dt className="text-sm text-pumice">Hall 01 module</dt>
                <dd className="mt-1">
                  {FIELD_FT.length} × {FIELD_FT.width} ft
                </dd>
                <dd className="text-sm text-pumice">
                  {FIELD_SQFT.toLocaleString("en-US")} sq ft
                </dd>
              </div>
              <div className="border-t border-hairline pt-3">
                <dt className="text-sm text-pumice">Hyperion area reference</dt>
                <dd className="mt-1">Nearly 10 million sq ft</dd>
                <dd className="text-sm text-pumice">
                  About {hallCount} Hall 01 equivalents
                </dd>
              </div>
            </dl>
          </div>
          <HallScale />
        </div>
        <p className="mt-8 max-w-2xl text-sm text-pumice">
          A single-person bench is about 24 sq ft in this comparison.{" "}
          {HYPERION_SQFT.toLocaleString("en-US")} ÷{" "}
          {FIELD_SQFT.toLocaleString("en-US")} = {HALLS_AT_HYPERION.toFixed(1)}{" "}
          halls. Louisiana Economic Development, 13 July 2026, on Meta’s
          Richland Parish campus. An earlier public figure was four million
          square feet. We cite the later one, and we are not claiming the site.
        </p>

        <div className="prose mt-16">
          <p>
            Car plants learned this before biology did. When the cell no longer
            needs a person, you do not keep the overheads on out of habit. You
            turn them off. The line still runs. A human, elsewhere, still owns
            the stop.
          </p>
          <p>
            Drug discovery kept the lights on because the protocol was a walk.
            Hood to incubator to sequencer, with a label in between. Incurable?
            designs the hall the other way around. The gantry is the walk. mRNA
            synthesis, particle formation, cell dosing, CRISPR editing, and the
            readout sit on one spine. The sample does not wait for a shift
            change.
          </p>
          <h2>Fully autonomous, inside an envelope</h2>
          <p>
            Fully autonomous does not mean unsupervised in the moral sense. It
            means no person in the aisle. Air, interlocks, and biosafety are
            designed as a closed envelope — the default hall at a level a
            competent institutional board would recognize, higher containment in
            sealed rooms off the main gantry, not as an afterthought behind a
            door someone props open. The floor is empty. The stop is not
            automated. A person, off the floor, can cut the hall.
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
            We are not building a bigger university lab. We are building the
            biology equivalent of a hyperscale floorplate, and selling the assay
            exhaust to the models that hyperscale exists to train.
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
