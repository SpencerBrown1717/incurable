import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { SiteFigure } from "@/components/site/site-figure";
import { pageMeta, queue } from "@/lib/site";

export const Route = createFileRoute("/price")({
  head: () =>
    pageMeta(
      "Generics — Incurable?",
      "Design new drugs and mass-produce them as generics. Your margin is my opportunity. The mission is still a cure for Alzheimer’s.",
      "/price",
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

function PackagingLine() {
  return (
    <SiteFigure
      label="Outline of a manufacturing line carrying repeated packs of medicine"
      caption="Manufacturing concept · Repeated packaging at generic scale"
      viewBox="0 0 640 260"
      className="order-first lg:order-none"
    >
      <path
        className="figure-grid"
        d="M43 63h554M43 115h554M43 167h554M43 219h554M80 39v181M560 39v181"
      />
      <g transform="matrix(1 0 -.48 .73 130 58)">
        <path
          className="figure-outline"
          d="M0 8h478v156H0zM0 23h478M0 146h478M0 164v10h478v-10"
        />
        <path
          className="figure-grid"
          d="M0 85h478M23 23v123M130 23v123M237 23v123M344 23v123M451 23v123"
        />
        {[33, 94].map((y) =>
          [35, 142, 249, 356].map((x) => (
            <g
              key={`${x}-${y}`}
              transform={`translate(${x} ${y})`}
              className={
                x === 356 && y === 94 ? "figure-amber" : "figure-strong"
              }
            >
              <rect width="83" height="42" rx="5" />
              <rect x="5" y="5" width="73" height="32" rx="3" opacity=".36" />
              {[12, 28, 44, 60].map((left) => (
                <g key={left} opacity=".72">
                  <rect x={left} y="9" width="10" height="9" rx="4.5" />
                  <rect x={left} y="24" width="10" height="9" rx="4.5" />
                </g>
              ))}
            </g>
          )),
        )}
        <path
          className="figure-amber figure-pulse"
          d="M339 151h112M451 83v68"
          pathLength="1"
        />
      </g>
      <path
        className="figure-outline"
        d="M51 207H36v-15M587 71h15v15M62 200v14m40-14v14m372-14v14m40-14v14"
      />
    </SiteFigure>
  );
}

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
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
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
          </div>
          <PackagingLine />
        </div>
        <ul
          className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-3"
          aria-label="Manufacturing approach"
        >
          <li className="border-t border-hairline pt-3">Original medicine design</li>
          <li className="border-t border-hairline pt-3">Generic-scale production</li>
          <li className="border-t border-hairline pt-3">Thin-margin model</li>
        </ul>
        <div className="prose mt-12">
          <h2 className="mt-0">A generic is a way of making, not a theft</h2>
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
