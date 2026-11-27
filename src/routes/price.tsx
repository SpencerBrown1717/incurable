import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { pageMeta, queue } from "@/lib/site";

export const Route = createFileRoute("/price")({
  head: () =>
    pageMeta(
      "Generics — Incurable?",
      "Design new drugs and mass-produce them as generics. Your margin is my opportunity. The mission is still a cure for Alzheimer’s.",
    ),
  component: Price,
});

const steps = [
  {
    n: "01",
    title: "Do not rent the molecule",
    body: "A composition someone else owns is a toll. Paying it, then adding a margin, is how a thirty-year-old drug still invoices a family like a luxury good.",
  },
  {
    n: "02",
    title: "Design it here",
    body: "CRISPR and mRNA are designable. A new sequence, a new edit, a new particle is a new medicine. That is the drug. It is not a copy of one still under someone else’s patent.",
  },
  {
    n: "03",
    title: "Make it like a generic",
    body: "Volume, thin margin, no detail force. The hall runs 24/7/365 because a specialty price has to fund shifts, a sales army, and a lit campus. Ours does not.",
  },
  {
    n: "04",
    title: "Take the list in order",
    body: "One disease, closed loops until a medicine exists, then the next name. Systematic means the gantry does not get redesigned every time the poster changes.",
  },
];

function Price() {
  return (
    <Shell>
      <PageHero
        kicker="incurable.ai · Generics"
        title="Your margin"
        italic="is my opportunity."
        dek="Jeff Bezos said it about retail. It is the plan for the medicine. Design the drug in a hall that never closes. Manufacture it the way generics are manufactured. The disease does not require the branded margin."
      />
      <section className="frame section">
        <div className="prose">
          <p>
            Incurable? designs drugs and then makes them at generic scale. The business is a fully
            autonomous CRISPR and mRNA hall, the size of Meta’s largest campus — 173.6 football fields of
            floor — running 24/7/365. Alzheimer’s is the long mission of the firm. It may not be the first
            disease this loop can finish. The records are sold to frontier labs. The medicine is not.
          </p>
          <p>
            The industry around these diseases is priced like a castle. A patent is a right to exclude, and
            the years of exclusion are what the invoice is made of. Families meet that number at the worst
            moment of their lives and are told it is the cost of science. Some of it is. A great deal of it
            is the margin.
          </p>
          <h2>A generic is a way of making, not a theft</h2>
          <p>
            We do not copy a drug that is still under someone else’s patent. That is not a business and it
            is not a cure. We design a new sequence or a new edit, then we manufacture it the way a generic
            is manufactured: at volume, with a thin margin, and without a detail force. The data can train
            a frontier lab’s model. The medicine, when the loop earns one, does not arrive with a castle
            already built into the price.
          </p>
          <p>
            Systematic is the other half. A company that announces one disease and then spends the decade
            defending one price has built a moat of its own. The list is the operating plan. Same gantry.
            Next name. The word incurable is a filing status. It gets cleared in order, at incurable.ai,
            not all at once in a keynote.
          </p>
        </div>
        <ol className="mt-16 grid gap-10 lg:grid-cols-2">
          {steps.map((step) => (
            <li key={step.n} className="border-t border-hairline pt-5">
              <p className="kicker">{step.n}</p>
              <h2 className="idx mt-3">{step.title}</h2>
              <p className="mt-3 text-pumice">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 overflow-x-auto border border-hairline">
          <table className="w-full min-w-[36rem] text-left">
            <thead>
              <tr className="kicker border-b border-hairline">
                <th className="px-4 py-3 font-normal">Order</th>
                <th className="px-4 py-3 font-normal">Disease</th>
                <th className="px-4 py-3 font-normal">Where it stands</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((row) => (
                <tr key={row.name} className="border-b border-hairline last:border-b-0">
                  <td className="px-4 py-4 font-mono text-xs text-pumice">{row.n}</td>
                  <td className="px-4 py-4">{row.name}</td>
                  <td className="px-4 py-4 text-pumice">{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="rule">
        <div className="frame section">
          <h2 className="statement">The cure is the work. The margin is the opening.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/science" className="btn btn-primary">
              The loop
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
