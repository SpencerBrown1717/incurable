import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
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
  ["hall", "01"],
  ["lights", "off"],
  ["modality", "crispr"],
  ["cell", "ipsc-microglia"],
  ["locus", "TREM2"],
  ["edit", "confirmed by sequence"],
  ["phenotype", "phagocytosis, direction of change"],
  ["protocol", "attached, replayable"],
  ["patient_record", "none"],
  ["source", "minted in hall, not scraped"],
];

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
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="prose">
            <p>
              Every closed loop writes one record. Sequence in. Edit, if there was one. Cell state.
              Phenotype out. The protocol beside them, so a model can replay the conditions instead of
              guessing. That is the product we sell to frontier labs.
            </p>
            <p>
              It is not a patient’s chart, a claims database, or a hospital note with the name removed
              badly. We do not buy medical records, and we will not pretend a scraped corpus is the same
              thing as an experiment we ran. If a record cannot name its protocol, it does not leave the
              hall.
            </p>
            <h2>What the buyer is actually getting</h2>
            <p>
              Supervised pairs at a volume a bench will not produce, with the failure modes still in the
              file. Most loops should fail. A dataset of only the pretty successes is how you train a model
              to flatter you. The dark hall is useful because it can afford the misses.
            </p>
            <p>
              Selling the data to frontier labs pays for the next hall. It does not transfer the long mission.
              The list stays here. Alzheimer’s is on it, and it is not a promise to be the first disease the
              hall finishes. A smarter model should make the next hour shorter. The medicine, if the loop
              ever earns one, is not a line item in a data contract.
            </p>
          </div>
          <div>
            <p className="kicker">One record, the shape of it</p>
            <dl className="mt-4 border border-hairline">
              {record.map(([key, value]) => (
                <div key={key} className="grid grid-cols-[9.5rem_1fr] gap-3 border-b border-hairline px-4 py-3 font-mono text-sm last:border-b-0">
                  <dt className="text-pumice">{key}</dt>
                  <dd className={key === "patient_record" ? "text-trace" : "text-ash"}>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-pumice">
              Illustrative. Hall 01 is specified, not online. Nothing here is a patient, and TREM2 is the
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
