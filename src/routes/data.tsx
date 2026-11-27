import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { SiteFigure } from "@/components/site/site-figure";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/data")({
  head: () =>
    pageMeta(
      "Data for frontier labs — Incurable?",
      "Assay records minted in a wet lab that does not close: sequence, edit, phenotype, protocol. Sold to frontier labs. Not patient charts.",
    ),
  component: Data,
});

const record = [
  ["record", "INC-01-004418"],
  ["lab", "01"],
  ["lights", "off"],
  ["modality", "crispr"],
  ["cell", "ipsc-microglia"],
  ["locus", "TREM2"],
  ["edit", "confirmed by sequence"],
  ["phenotype", "phagocytosis, direction of change"],
  ["protocol", "attached, replayable"],
  ["patient_record", "none"],
  ["source", "generated in the lab"],
];

function RecordTrace() {
  return (
    <SiteFigure
      label="Abstract observations on the left converge into an organized record on the right"
      caption="Data concept · Observations organized as an assay record"
      viewBox="0 0 640 260"
      className="order-first lg:order-none"
    >
      <path
        className="figure-grid"
        d="M48 48h544M48 130h544M48 212h544M198 39v182M314 39v182"
      />
      <g className="figure-outline">
        <path d="M85 59h35m-35 11h59m-59 11h24M85 119h51m-51 11h35m-35 11h53M85 179h24m-24 11h59m-59 11h39" />
        <circle cx="64" cy="70" r="7" />
        <circle cx="64" cy="130" r="7" />
        <circle cx="64" cy="190" r="7" />
        <path d="M155 70h43c42 0 45 60 88 60M155 190h43c42 0 45-60 88-60M155 130h185" />
      </g>
      <path className="figure-violet" d="M58 130h12m-6-6v12" />
      <path
        className="figure-cyan figure-pulse"
        d="M155 70h43c42 0 45 60 88 60h65"
        pathLength="1"
      />
      <circle className="figure-cyan" cx="286" cy="130" r="4" fill="currentColor" />
      <path className="figure-outline" d="M365 49h205v156H365M351 62v156h205" />
      <rect className="figure-strong" x="351" y="62" width="205" height="156" rx="2" />
      <path className="figure-grid" d="M351 101h205M351 140h205M351 179h205M413 62v156" />
      <g className="figure-outline">
        <path d="M370 81h25m-25 39h22m-22 39h28m-28 39h20" />
        <path d="M429 81h87m-87 39h61m-61 39h104m-104 39h70" />
      </g>
      <circle className="figure-cyan" cx="524" cy="81" r="2.5" fill="currentColor" />
      <circle className="figure-violet" cx="499" cy="120" r="2.5" fill="currentColor" />
      <circle className="figure-amber" cx="507" cy="198" r="2.5" fill="currentColor" />
    </SiteFigure>
  );
}

function Data() {
  return (
    <Shell>
      <PageHero
        kicker="Data · frontier labs"
        title="Mint the biology"
        italic="the web does not have."
        dek="Frontier labs buy compute because they cannot wish it into existence. They will buy this for the same reason. A microglia answering a guide is not a paragraph someone already posted."
      />
      <section className="frame section">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="prose">
            <p>
              Every closed loop writes one record. Sequence in. Edit, if there was one. Cell state.
              Phenotype out. The protocol beside them, so a model can replay the conditions instead of
              guessing. That is the product we sell to frontier labs.
            </p>
            <p>
              It is not a patient’s chart, a claims database, or a hospital note with the name removed
              badly. We do not buy medical records, and we will not pretend a scraped corpus is the same
              thing as an experiment we ran. If a record cannot name its protocol, it does not leave the lab.
            </p>
          </div>
          <RecordTrace />
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-3" aria-label="About the data">
          <li className="border-t border-hairline pt-3">Generated in the lab</li>
          <li className="border-t border-hairline pt-3">Observations with context</li>
          <li className="border-t border-hairline pt-3">No patient records</li>
        </ul>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="prose">
            <h2 className="mt-0">What the buyer is actually getting</h2>
            <p>
              Supervised pairs at a volume a bench will not produce, with the failure modes still in the
              file. Most loops should fail. A dataset of only the pretty successes is how you train a model
              to flatter you. The automated lab is useful because it can afford the misses.
            </p>
            <p>
              Selling the data to frontier labs pays for the next lab module. It does not transfer the long mission.
              The list stays here. Alzheimer’s is on it, and it is not a promise to be our first breakthrough. A smarter model should make the next hour shorter. The medicine, if the loop
              ever earns one, is not a line item in a data contract.
            </p>
          </div>
          <div>
            <p className="kicker">One record, the shape of it</p>
            <dl className="mt-4 border border-hairline">
              {record.map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-3 border-b border-hairline px-4 py-3 font-mono text-sm last:border-b-0 sm:grid-cols-[9.5rem_minmax(0,1fr)]"
                >
                  <dt className="break-words text-pumice">{key}</dt>
                  <dd
                    className={
                      key === "patient_record"
                        ? "break-words text-trace"
                        : "break-words text-ash"
                    }
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-pumice">
              Illustrative. Lab 01 is specified, not online. Nothing here is a patient, and TREM2 is the
              kind of locus the library is built to interrogate — not a result we are announcing.
            </p>
          </div>
        </div>
      </section>
      <section className="rule">
        <div className="frame section">
          <h2 className="statement">If you train the models, start here.</h2>
          <p className="dek mt-6">
            Say which lab, what you want the records to condition, and what you will not accept in a
            corpus. We will answer in the same register.
          </p>
          <Link to="/contact" className="btn btn-primary mt-8">
            Talk about the data
          </Link>
        </div>
      </section>
    </Shell>
  );
}
