import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta, queue } from "@/lib/site";

export const Route = createFileRoute("/alzheimers")({
  head: () =>
    pageMeta(
      "Alzheimer’s — Incurable?",
      "The long mission of the firm. Not a promise that Alzheimer’s is first, not a medicine in hand, not a clinic.",
    ),
  component: Alzheimers,
});

function Alzheimers() {
  return (
    <Shell>
      <PageHero
        kicker="Long mission"
        title="Alzheimer’s."
        italic="Not promised first."
        dek="The firm exists to take diseases off the list. Alzheimer’s is the one we mean when we say that out loud. It may not be the first the hall can finish. A nearer disease may fall to mRNA, or to CRISPR, sooner. We will not pretend we know which."
      />
      <section className="frame section">
        <div className="prose">
          <p>
            Alzheimer’s disease is progressive and fatal. For a long time the honest public sentence was
            that nothing slowed it. That sentence is out of date, and a serious company should not keep
            using it. Lecanemab and donanemab, antibodies against amyloid, can modestly slow cognitive
            decline in some people. They carry risks of brain swelling and bleeding. They do not stop the
            disease, and they do not touch every part of it that matters.
          </p>
          <p>
            What remains is why a loop can belong here, when the hall is ready for it. Tau continues to
            spread. Microglia both clear debris and drive damage, depending on state — TREM2 sits in that
            argument, which is why a guide library can start in that neighborhood. That is an example of a
            CRISPR question, not a decision that Alzheimer’s runs before everything else. Blood vessels
            fail. The barrier between blood and brain is not a cartoon wall. None of that is one construct
            and a press release.
          </p>
          <h2>What the hall is allowed to say</h2>
          <p>
            mRNA is how you deliver a program into a cell: a protein, a signal, a correction at the level of
            expression. CRISPR is how you ask, at industrial count, which edits in which cells move a
            phenotype you would actually recognize as relevant — clearance, inflammation, neuronal survival
            in a model that deserves the name. The hall runs those questions with the lights off. It does
            not skip ahead to a cure because the questions are expensive to ask by hand.
          </p>
          <p>
            We will not offer a date, a compassionate-use story, or a waiting list. There is no waiting
            list. Hall 01 is a specification. When it runs, the first public sentence will be a method and
            a result, not a verb like “cures.”
          </p>
        </div>
        <div className="mt-16">
          <p className="kicker">The long list. Not a run order.</p>
          <div className="mt-4 overflow-x-auto border border-hairline">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="kicker border-b border-hairline">
                  <th className="px-4 py-3 font-normal"> </th>
                  <th className="px-4 py-3 font-normal">Disease</th>
                  <th className="px-4 py-3 font-normal">Modality</th>
                  <th className="px-4 py-3 font-normal">State</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((row) => (
                  <tr key={row.name} className="border-b border-hairline last:border-b-0">
                    <td className="px-4 py-4 font-mono text-xs text-pumice">{row.n}</td>
                    <td className="px-4 py-4">{row.name}</td>
                    <td className="px-4 py-4 text-pumice">{row.modality}</td>
                    <td className="px-4 py-4">{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-pumice">
            “On the list” is not a start date. Alzheimer’s is the long mission of the firm. It is not a
            promise to be the first disease the hall can finish. Glioblastoma has a standard of care. It is
            still devastating. Both sentences fit.
          </p>
        </div>
      </section>
      <section className="rule">
        <div className="frame section">
          <h2 className="statement">
            Incurable?
            <span className="italic"> Says who.</span>
          </h2>
          <p className="dek mt-6">
            Says the tools we have, which are not enough. Not says a law. The building is the argument. A
            family does not have to be persuaded by a website, and should not be recruited by one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/science" className="btn btn-ghost">
              Read the loop
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
