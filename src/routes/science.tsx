import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/science")({
  head: () =>
    pageMeta(
      "CRISPR and mRNA — Incurable?",
      "Two approaches to studying disease in a proposed automated wet lab.",
    ),
  component: Science,
});

const approaches = [
  {
    name: "mRNA",
    title: "Give cells an instruction.",
    description:
      "Study how cells respond when they receive a new instruction through mRNA.",
    border: "border-t-iris-violet/40",
    accent: "text-iris-violet",
  },
  {
    name: "CRISPR",
    title: "Change a gene. See what follows.",
    description:
      "Study how an edit changes cell behavior and record the observed effects.",
    border: "border-t-iris-cyan/40",
    accent: "text-iris-cyan",
  },
] as const;

const loop = [
  {
    title: "Design",
    description: "Write a question an experiment can answer.",
  },
  {
    title: "Test",
    description: "Compare the outcome with a reference.",
  },
  {
    title: "Record",
    description: "Keep the outcome and conditions together.",
  },
] as const;

function Science() {
  return (
    <Shell>
      <PageHero
        kicker="Science"
        title="CRISPR and mRNA."
        italic="One research loop."
        dek="Hall 01 is a proposed wet lab for running and measuring experiments around the clock."
      />

      <section className="frame pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {approaches.map((approach) => (
            <article
              key={approach.name}
              className={`rounded-xl border border-hairline border-t-2 bg-graphite p-6 md:p-9 ${approach.border}`}
            >
              <p className={`font-mono text-sm ${approach.accent}`}>
                {approach.name}
              </p>
              <h2 className="idx mt-4">{approach.title}</h2>
              <p className="mt-3 max-w-sm text-pumice">
                {approach.description}
              </p>
            </article>
          ))}
        </div>
        <h2 className="idx mt-12">The shared loop</h2>
        <ol className="mt-5 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
          {loop.map((step) => (
            <li key={step.title} className="bg-obsidian p-6">
              <h3 className="font-sans text-lg">{step.title}</h3>
              <p className="mt-2 text-pumice">{step.description}</p>
            </li>
          ))}
        </ol>
        <Link to="/data" className="mission-link mt-5">
          See the proposed assay record
        </Link>
      </section>

      <section className="rule mission-section">
        <div className="frame section mission-grid">
          <h2 className="title">The long mission.</h2>
          <div>
            <p className="dek">
              Alzheimer’s is a long-term research goal. Hall 01 is at the design
              stage, with no clinical results or treatment timeline.
            </p>
            <Link to="/alzheimers" className="btn btn-primary mt-6">
              The Alzheimer’s mission
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
