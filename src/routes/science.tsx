import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFigure } from "@/components/site/site-figure";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/science")({
  head: () =>
    pageMeta(
      "CRISPR and mRNA — Incurable?",
      "The only two modalities. Fully automated, 24/7/365. Whichever closes a disease first — mRNA or CRISPR — is the one that does it.",
    ),
  component: Science,
});

const mrna = [
  {
    n: "01",
    title: "Design",
    body: "A coding sequence for a program a cell has lost or never ran. The loop writes it.",
  },
  {
    n: "02",
    title: "Synthesize",
    body: "Oligo line, unattended. No batch waiting on a person between rooms.",
  },
  {
    n: "03",
    title: "Pack",
    body: "Lipid nanoparticle, formed, sized, held cold under the gantry.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "iPSC neurons, microglia, a barrier model. Did the program arrive. Did it work.",
  },
];

const crispr = [
  {
    n: "05",
    title: "Library",
    body: "Guides against loci that recur in Alzheimer’s, starting with TREM2 and its neighborhood.",
  },
  {
    n: "06",
    title: "Edit",
    body: "Ribonucleoprotein into the cell type the question is actually about.",
  },
  {
    n: "07",
    title: "Confirm",
    body: "Sequence the allele. Do not trust a fluorescent proxy and go home.",
  },
  {
    n: "08",
    title: "Phenotype",
    body: "A readout that matters — clearance, inflammation, survival — tied to that edit.",
  },
];

function ResearchTracks() {
  return (
    <SiteFigure
      label="One curved mRNA trace and two parallel CRISPR traces meet an outline of a shared research platform."
      caption="Two research tracks share a single automated platform."
      viewBox="0 0 640 260"
    >
      <g className="figure-grid">
        <path d="M40 50h560M40 91h560M40 132h560M40 173h560M40 214h560" />
        <path d="M40 50v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164m56-164v164" />
      </g>
      <g className="figure-outline">
        <circle cx="320" cy="133" r="82" strokeDasharray="2 6" />
        <circle cx="320" cy="133" r="69" />
        <path d="M320 44v17m0 144v17m-89-89h17m144 0h17" />
      </g>
      <g className="figure-cyan" strokeLinecap="round" strokeLinejoin="round">
        <path d="M64 113h24c14 0 14-21 28-21s14 42 28 42 14-54 28-54 14 33 28 33h55" />
        <circle cx="64" cy="113" r="4" />
        <path
          className="figure-pulse figure-strong"
          d="M235 113h20"
          strokeWidth="2.5"
        />
      </g>
      <g className="figure-violet" strokeLinecap="round" strokeLinejoin="round">
        <path d="M386 152h42l26-21h121m-189 33h47l26-21h116" />
        <path d="M475 131v12m22-12v12m22-12v12m22-12v12m22-12v12" />
        <circle cx="579" cy="137" r="4" />
        <path
          className="figure-pulse figure-strong"
          d="M386 152h20m-20 12h20"
          strokeWidth="2.5"
        />
      </g>
      <g className="figure-strong">
        <rect x="280" y="107" width="80" height="52" rx="7" />
        <path d="M297 126h46m-46 14h46" />
        <circle cx="302" cy="126" r="3" />
        <circle cx="334" cy="140" r="3" />
      </g>
      <g className="figure-label">
        <text x="64" y="173">
          mRNA
        </text>
        <text x="519" y="103">
          CRISPR
        </text>
      </g>
    </SiteFigure>
  );
}

function Steps({
  items,
}: {
  items: { n: string; title: string; body: string }[];
}) {
  return (
    <ol>
      {items.map((item) => (
        <li
          key={item.n}
          className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-hairline py-5"
        >
          <span className="font-mono text-xs text-pumice">{item.n}</span>
          <div>
            <h3 className="text-lg">{item.title}</h3>
            <p className="mt-1 text-pumice">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Science() {
  return (
    <Shell>
      <PageHero
        kicker="Science"
        title="CRISPR and mRNA,"
        italic="already real, not yet industrial."
        dek="CRISPR and mRNA, and nothing else on the gantry. Both are medicines today. What does not exist is a wet lab that runs them as one autonomous loop, every hour of the year. Whichever finishes a disease first is the one that does it."
      />
      <section className="frame section">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.22fr] lg:gap-12">
          <ResearchTracks />
          <div className="prose lg:order-first">
            <p>
              The modalities are not a wager that biology might someday become
              programmable. A handful of approvals already settled that.
              Sickle-cell disease has an edited-cell therapy. Infectious disease
              has mRNA at population scale. Rare disease has more of both on the
              way. The bottleneck we are built for is different: the number of
              closed design-build-test loops a year, aimed at diseases that are
              still mostly managed rather than ended.
            </p>
            <p>
              A disease like Alzheimer’s is a bad fit for a single heroic
              construct and a good fit for a loop. Amyloid antibodies —
              lecanemab, donanemab — can slow decline for some people and can
              harm them. Tau, microglia, vasculature, and the blood-brain
              barrier do not retire because amyloid moved. That is why it sits
              on the long list. It is not a decision that research starts there.
              A nearer disease may be the one mRNA or CRISPR can finish first.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker">mRNA</p>
            <h2 className="idx mt-3">Send a program in.</h2>
            <div className="mt-6">
              <Steps items={mrna} />
            </div>
          </div>
          <div>
            <p className="kicker">CRISPR</p>
            <h2 className="idx mt-3">Ask which gene matters.</h2>
            <div className="mt-6">
              <Steps items={crispr} />
            </div>
          </div>
        </div>
        <p className="measure mt-10 text-pumice">
          They share the last room. Sequencing, phenotype, and the decision to
          keep or kill a design sit on the same gantry, so an mRNA outcome and a
          CRISPR outcome land in one record. That record is what we sell. The
          decision about the disease stays here.
        </p>
      </section>
      <section className="rule">
        <div className="frame section">
          <h2 className="statement">No readout is implied by the building.</h2>
          <p className="dek mt-6">
            A lab design is still a concept. We will not publish a timeline to a
            patient, because we do not have one we could defend. The loop is the
            business. Alzheimer’s is the long mission of the firm, not a promise
            that this loop starts there.
          </p>
          <Link to="/alzheimers" className="btn btn-primary mt-8">
            The long mission
          </Link>
        </div>
      </section>
    </Shell>
  );
}
