import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { SiteFigure } from "@/components/site/site-figure";
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
      <section className="frame section pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0 lg:order-last">
            <SiteFigure
              label="A branching neuron with a signal traced along its axon"
              caption="Neural signaling, illustrated"
              viewBox="0 0 640 260"
            >
              <g className="figure-grid">
                <path d="M44 65H596M44 109H596M44 153H596M44 197H596M101 32V228M189 32V228M277 32V228M365 32V228M453 32V228M541 32V228" />
                <path d="M53 42h12m-6-6v12M575 219h12m-6-6v12" />
              </g>
              <g className="figure-outline" strokeLinecap="round" strokeLinejoin="round">
                <path d="M231 104C209 87 204 65 183 54c-12-6-30-4-45-17m45 17c1-15-7-22-17-29m39 50c-22 2-40-5-52-15" />
                <path d="M216 122c-21-10-34-30-56-30-15 0-33 1-49-11m49 11c-14 3-20 8-34 8m-15-19c-11 0-20-8-28-10" />
                <path d="M214 142c-19-1-45 12-62 4-16-7-39-12-60-2m60 2c-13 7-29 14-45 10m-15-12c-11-4-24 0-32 3" />
                <path d="M229 160c-19 16-35 13-47 25-15 16-38 22-57 17m57-17c-2 17-15 31-28 36" />
                <path d="M250 165c-1 20-10 28-16 35-9 10-12 22-8 34m8-34c-13 4-23 2-31 11" />
                <path d="M267 109c10-13 11-26 19-37 11-14 29-19 38-34m-38 34c19 2 33-4 46-14" />
                <path d="M499 141c26 1 40-21 55-31 11-7 27-7 43-16m-43 16c3-16 12-22 22-27m-77 58c20 8 27 23 46 33 15 8 29 3 46 8m-46-8c5 17 14 25 28 28" />
              </g>
              <path
                className="figure-strong"
                strokeLinecap="round"
                d="M216 122c7-3 12-10 15-18 5 5 13 8 22 7 5-1 10-2 14-2-1 9 2 17 11 24 24 19 50-8 77-7 26 1 43 23 70 23 25 0 48-9 74-8m-250 24c-8 0-15-1-20-5-5-4-8-13-15-18 4-5 4-15 2-20m33 43c14-3 17-14 25-21"
              />
              <circle className="figure-violet" cx="245" cy="137" r="9" />
              <path
                className="figure-cyan figure-pulse"
                strokeLinecap="round"
                strokeDasharray="3 7"
                d="M277 132c24 19 51-8 78-6 26 1 43 23 70 23 25 0 48-9 74-8"
              />
            </SiteFigure>
            <dl className="mt-5 grid gap-3 border-t border-hairline pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="kicker">Research stage</dt>
                <dd className="mt-2">Hall 01 design</dd>
              </div>
              <div>
                <dt className="kicker">Availability</dt>
                <dd className="mt-2">No treatment or waiting list</dd>
              </div>
            </dl>
          </div>
          <div className="prose">
            <p>
              Alzheimer’s disease is progressive and fatal. For a long time the honest public sentence
              was that nothing slowed it. That sentence is out of date, and a serious company should not
              keep using it. Lecanemab and donanemab, antibodies against amyloid, can modestly slow
              cognitive decline in some people. They carry risks of brain swelling and bleeding. They do
              not stop the disease, and they do not touch every part of it that matters.
            </p>
            <p>
              What remains is why a loop can belong here, when the hall is ready for it. Tau continues to
              spread. Microglia both clear debris and drive damage, depending on state — TREM2 sits in
              that argument, which is why a guide library can start in that neighborhood. That is an
              example of a CRISPR question, not a decision that Alzheimer’s runs before everything else.
              Blood vessels fail. The barrier between blood and brain is not a cartoon wall. None of
              that is one construct and a press release.
            </p>
          </div>
        </div>
        <div className="prose mt-10">
          <h2 className="mt-0">What the hall is allowed to say</h2>
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
