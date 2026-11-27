import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta, queue } from "@/lib/site";

export const Route = createFileRoute("/price")({
  head: () =>
    pageMeta(
      "Manufacturing at generic scale — Incurable?",
      "Incurable’s proposed model pairs original drug research with high-volume manufacturing and thin margins.",
    ),
  component: Price,
});

const principles = [
  {
    title: "Design original medicines.",
    body: "Use CRISPR and mRNA research to identify candidates for development.",
  },
  {
    title: "Plan for volume.",
    body: "Make high-volume production part of the design from the start.",
  },
  {
    title: "Aim for thin margins.",
    body: "Use manufacturing scale to help keep eventual prices within reach.",
  },
] as const;

function Price() {
  return (
    <Shell>
      <PageHero
        kicker="Manufacturing"
        title="New medicines"
        italic="at generic scale."
        dek="Our proposed model pairs original drug development with the high-volume, thin-margin approach of generic manufacturing."
      />

      <section className="frame pt-10 pb-16 md:pt-14 md:pb-24">
        <h2 className="sr-only">Manufacturing principles</h2>
        <ul className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.title} className="bg-graphite p-6 md:p-8">
              <h3 className="idx">{principle.title}</h3>
              <p className="mt-3 text-pumice">{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rule mission-section">
        <div className="frame section grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="title">Where the work could lead.</h2>
            <p className="dek mt-4">
              These are research interests. The lab remains at the design stage,
              with no development schedule or pricing to announce.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
            {queue.map((row) => (
              <li key={row.name} className="bg-graphite px-5 py-4">
                {row.name === "Alzheimer’s" ? (
                  <Link to="/alzheimers" className="block hover:underline">
                    {row.name}
                    <span className="mt-1 block text-sm text-iris-cyan">
                      Long-term mission
                    </span>
                  </Link>
                ) : (
                  row.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule">
        <div className="frame section mission-grid">
          <h2 className="title">From research to production.</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/science" className="btn btn-primary">
              Explore the science
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
