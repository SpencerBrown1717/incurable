import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { FIELD_FT, FIELD_SQFT, HALLS_AT_HYPERION, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/labs")({
  head: () =>
    pageMeta(
      "Labs — Incurable?",
      "Explore Hall 01, a proposed autonomous wet lab the size of a football field, and the campus footprint that inspired its scale.",
    ),
  component: Labs,
});

const HALL_COUNT = Math.round(HALLS_AT_HYPERION);

const hallFeatures = [
  {
    title: "One automated line",
    description: "A shared gantry connects the CRISPR and mRNA workstations.",
  },
  {
    title: "Lights-out operation",
    description:
      "The design calls for continuous operation with an empty aisle.",
  },
  {
    title: "A human owns the stop",
    description: "An operator outside the enclosed floor can stop the line.",
  },
];

function Labs() {
  return (
    <Shell>
      <PageHero
        kicker="Labs"
        title="A lab the size of a football field."
        dek="Hall 01 is the design for an autonomous CRISPR and mRNA wet lab. One field is the building block for a much larger campus."
      />

      <section className="frame section" aria-labelledby="lab-scale">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="lab-scale" className="title">
              One hall. Room to repeat.
            </h2>
            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-hairline pt-5">
              <div>
                <dt className="text-sm text-pumice">Hall 01</dt>
                <dd className="idx mt-2 tabular-nums">
                  {FIELD_SQFT.toLocaleString("en-US")} sq ft
                </dd>
                <dd className="mt-1 text-sm text-pumice">
                  {FIELD_FT.length} × {FIELD_FT.width} ft
                </dd>
              </div>
              <div>
                <dt className="text-sm text-pumice">Meta Hyperion campus</dt>
                <dd className="idx mt-2 tabular-nums">~10 million sq ft</dd>
                <dd className="mt-1 text-sm text-pumice">Area reference</dd>
              </div>
            </dl>
            <a
              className="nav-link mt-6 inline-flex border-b border-hairline pb-1 text-sm"
              href="https://www.opportunitylouisiana.gov/news/meta-commits-more-than-50-billion-for-north-louisiana-project-becoming-one-of-the-largest-data-centers-in-history"
            >
              Louisiana Economic Development, July 2026
            </a>
          </div>

          <figure className="rounded-xl border border-hairline bg-graphite p-5 sm:p-8">
            <div
              aria-hidden="true"
              className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[3px] sm:gap-1"
            >
              {Array.from({ length: HALL_COUNT }, (_, index) => (
                <span
                  key={index}
                  className={`aspect-[9/4] rounded-[2px] ${index === 0 ? "bg-iris-violet" : "bg-iris-violet/20"}`}
                />
              ))}
            </div>
            <figcaption className="mt-5 flex items-start gap-3 text-sm text-pumice">
              <span
                aria-hidden="true"
                className="mt-1.5 size-2.5 shrink-0 rounded-[2px] bg-iris-violet"
              />
              <span>
                The highlighted tile is Hall 01. About {HALL_COUNT} halls would
                cover the area of Meta’s expanded Richland Parish campus.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="rule" aria-labelledby="lab-operation">
        <div className="frame section">
          <h2 id="lab-operation" className="title">
            How the hall would run.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {hallFeatures.map(({ title, description }) => (
              <div key={title} className="border-t border-hairline pt-5">
                <h3 className="idx">{title}</h3>
                <p className="mt-3 max-w-xs text-pumice">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" hash="hall" className="btn btn-primary">
              Explore the hall
            </Link>
            <Link to="/science" className="btn btn-ghost">
              The research loop
            </Link>
            <Link to="/data" className="btn btn-ghost">
              The assay data
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
