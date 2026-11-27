import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/data")({
  head: () =>
    pageMeta(
      "Data for frontier labs — Incurable?",
      "A proposed assay dataset that connects experimental inputs, conditions, and outcomes.",
    ),
  component: Data,
});

const record = [
  { field: "Input", example: "Sequence or edit under study" },
  { field: "Cell context", example: "Cell type and starting state" },
  { field: "Readout", example: "Measured change in cell behavior" },
  { field: "Protocol", example: "Linked experiment conditions" },
  { field: "Source", example: "Lab assay" },
] as const;

const features = [
  {
    title: "Results in context",
    body: "Pair each measured outcome with the conditions that produced it.",
  },
  {
    title: "Negative results",
    body: "Keep failed and inconclusive experiments alongside successes.",
  },
  {
    title: "Lab-generated data",
    body: "Build the dataset from experiments. Patient records are outside its scope.",
  },
] as const;

function Data() {
  return (
    <Shell>
      <PageHero
        kicker="Data"
        title="Biology worth recording."
        dek="We plan to license assay datasets to research labs. Each record would connect an experiment’s inputs, conditions, and results."
      />

      <section className="frame grid items-start gap-8 pt-10 pb-16 md:pt-14 md:pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <h2 className="idx">What a lab would get</h2>
          <ul className="mt-5">
            {features.map((feature) => (
              <li key={feature.title} className="border-t border-hairline py-4">
                <h3 className="font-sans text-lg">{feature.title}</h3>
                <p className="mt-1 max-w-md text-pumice">{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="overflow-hidden rounded-xl border border-hairline bg-graphite">
          <figcaption className="border-b border-iris-cyan/25 p-5 sm:p-7">
            <h2 className="idx">An example assay record</h2>
            <p className="mt-2 text-sm text-pumice">
              Illustrative fields from the proposed Hall 01 dataset.
            </p>
          </figcaption>
          <dl className="divide-y divide-hairline">
            {record.map(({ field, example }) => (
              <div
                key={field}
                className="grid gap-1 px-5 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4 sm:px-7"
              >
                <dt className="font-mono text-sm text-iris-cyan">{field}</dt>
                <dd>{example}</dd>
              </div>
            ))}
          </dl>
        </figure>
      </section>

      <section className="rule contact-band">
        <div className="frame section mission-grid">
          <h2 className="title">Help shape the dataset.</h2>
          <div>
            <p className="dek">
              Tell us which experiments, outcomes, and metadata your team needs.
            </p>
            <Link to="/contact" className="btn btn-primary mt-6">
              Talk about the data
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
