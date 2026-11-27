import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta, queue } from "@/lib/site";

export const Route = createFileRoute("/alzheimers")({
  head: () =>
    pageMeta(
      "Alzheimer’s — Incurable?",
      "Alzheimer’s is a long-term research priority for Incurable. Explore the proposed research and where the work stands.",
    ),
  component: Alzheimers,
});

function Alzheimers() {
  return (
    <Shell>
      <PageHero
        kicker="The long mission"
        title="Alzheimer’s."
        dek="Finding better answers for Alzheimer’s is a long-term goal for Incurable. The lab is still in design, and the research sequence is open."
      />

      <section className="frame section" aria-labelledby="alz-evidence">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-graphite p-6 sm:p-8">
            <h2 id="alz-evidence" className="idx">
              What treatments can do today
            </h2>
            <p className="mt-4 max-w-md text-pumice">
              Some treatments can slow decline in early Alzheimer’s and carry
              serious risks. A cure remains out of reach.
            </p>
            <a
              className="nav-link mt-5 inline-flex border-b border-hairline pb-1 text-sm"
              href="https://www.nia.nih.gov/health/alzheimers-treatment/how-alzheimers-disease-treated"
            >
              National Institute on Aging treatment overview
            </a>
          </div>
          <div className="rounded-xl border border-hairline bg-graphite p-6 sm:p-8">
            <h2 className="idx">What the lab would study</h2>
            <p className="mt-4 max-w-md text-pumice">
              The proposed CRISPR and mRNA program would study how cells respond
              to changes tied to disease, including inflammation and neuronal
              survival.
            </p>
            <Link
              to="/science"
              className="nav-link mt-5 inline-flex border-b border-hairline pb-1 text-sm"
            >
              Explore the research loop
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-3 border-y border-hairline py-6 sm:grid-cols-[1fr_2fr] sm:items-center">
          <h2 className="idx">Where the work stands</h2>
          <p className="max-w-xl text-pumice">
            Hall 01 is a specification. Incurable has no treatment to offer,
            enrollment to open, or clinical timeline to share.
          </p>
        </div>
      </section>

      <section className="rule" aria-labelledby="alz-scope">
        <div className="frame section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 id="alz-scope" className="title">
                The wider research mission.
              </h2>
              <p className="dek mt-5">
                Alzheimer’s anchors a wider set of disease areas under
                consideration. The order is still open.
              </p>
            </div>
            <ul className="grid grid-cols-1 border-b border-hairline min-[420px]:grid-cols-2">
              {queue.map(({ name }) => (
                <li
                  key={name}
                  className="flex min-h-14 items-center border-t border-hairline py-3 pr-4"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/contact" className="btn btn-primary mt-8">
            Discuss a research partnership
          </Link>
        </div>
      </section>
    </Shell>
  );
}
