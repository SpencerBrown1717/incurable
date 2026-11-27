import { createFileRoute, Link } from "@tanstack/react-router";
import { DarkFloor } from "@/components/site/dark-floor";
import { IndexList, Shell } from "@/components/site/shell";
import { darkLab, pageMeta, programs, roadmap, specs, stories, today } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Incurable? — Says who.",
      "Fully automated CRISPR and mRNA, 24/7/365, at the scale of Meta’s Hyperion — 173.6 football-field halls. Data to frontier labs. Drugs at generic scale. Alzheimer’s is the long mission, not a promise to be first.",
    ),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <section className="frame section">
        <p className="kicker">incurable.ai · the business is the hall</p>
        <h1 className="display mt-6">
          <span className="block">Incurable?</span>
          <span className="block italic">Says who.</span>
        </h1>
        <p className="dek mt-8">
          A fully autonomous wet lab for CRISPR and mRNA. Lights off, every hour of the year, drawn to the
          footprint of Meta’s largest data center — 173.6 football fields of floor. Data to frontier labs.
          New drugs, made at generic scale. Alzheimer’s is the long mission of the firm. It may not be the
          first thing the hall finishes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn btn-primary">
            Talk to us
          </Link>
          <a href="#hall" className="btn btn-ghost">
            See the hall
          </a>
        </div>
        <dl className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
          {[
            ["Scale", "173.6 halls"],
            ["Duty", "24/7/365"],
            ["Loop", "CRISPR · mRNA"],
          ].map(([k, v]) => (
            <div key={k} className="bg-obsidian px-4 py-4">
              <dt className="kicker">{k}</dt>
              <dd className="stat mt-2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rule">
        <div className="frame section grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">Hyperion, in football fields</p>
            <p className="display mt-4">173.6</p>
          </div>
          <div>
            <p className="dek">
              Nearly ten million square feet, the later public figure for Meta’s Richland Parish campus,
              divided by one field. About 174 halls. That is the size of building the business is drawn to.
              Biology, not racks. We are not claiming their parish.
            </p>
            <Link to="/labs" className="btn btn-ghost mt-8">
              See the scale
            </Link>
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <p className="lede mt-0">
            The business is the automation. CRISPR and mRNA, at the size of the largest data centers being
            built. The long mission is the incurable list. Alzheimer’s is on it. A nearer disease may fall
            sooner, and it may be mRNA or it may be CRISPR. The hall does not wait on that argument.
          </p>
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="kicker mb-2">The way it is done</h2>
              <IndexList items={today} />
            </div>
            <div>
              <h2 className="kicker mb-2">The dark lab</h2>
              <IndexList items={darkLab} />
            </div>
          </div>
        </div>
      </section>

      <section id="hall" className="rule">
        <div className="frame section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="kicker">Now look into the dark</p>
              <h2 className="title mt-4">A field with the lights off.</h2>
            </div>
            <p className="dek">
              Eight stations. One gantry. Design a sequence, make it, put it in a cell, edit, read, decide,
              and queue the next one before a person would have capped the tube. Choose a bay, or let the
              model run.
            </p>
          </div>
          <div className="mt-12">
            <DarkFloor />
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="kicker">Specified, not implied</p>
              <h2 className="title mt-4">The hall, in numbers.</h2>
              <p className="dek mt-5">
                Hyperion, Meta’s Richland Parish campus, was put at nearly ten million square feet by
                Louisiana Economic Development in July 2026. Earlier figures said four million. We use the
                later number as a scale reference. We are not building their site.
              </p>
            </div>
            <dl>
              {specs.map((row) => (
                <div
                  key={row.k}
                  className="grid gap-1 border-t border-hairline py-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6"
                >
                  <dt className="text-pumice">{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <p className="kicker">What the building is for</p>
          <div className="mt-8 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
            {programs.map((program) => (
              <Link key={program.href} to={program.href} className="group bg-obsidian p-6 sm:p-8">
                <p className="kicker">{program.kicker}</p>
                <h2 className="idx mt-5 group-hover:italic">{program.title}</h2>
                <p className="mt-4 text-pumice">{program.body}</p>
                <p className="mt-6 text-sm text-ash">Read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <p className="kicker">The build</p>
          <h2 className="title mt-4">From one field to the campus.</h2>
          <ol className="mt-12 grid gap-10 lg:grid-cols-3">
            {roadmap.map((step) => (
              <li key={step.n} className="border-t border-hairline pt-5">
                <p className="kicker">
                  {step.n} · {step.when}
                </p>
                <h3 className="idx mt-4">{step.title}</h3>
                <p className="mt-3 text-pumice">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <p className="kicker">Generics · Jeff Bezos</p>
          <h2 className="statement mt-5">
            Your margin
            <span className="italic"> is my opportunity.</span>
          </h2>
          <p className="dek mt-6">
            Design the drug. Then manufacture it the way a generic is manufactured — volume, thin margin, no
            detail force. A patent still in force is not a recipe we copy. A new sequence is. The fat margin
            on the old one is the opening.
          </p>
          <Link to="/price" className="btn btn-ghost mt-8">
            How the moat gets walked around
          </Link>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <div className="flex items-end justify-between gap-6">
            <h2 className="title">From the desk.</h2>
            <Link to="/news" className="nav-link hidden text-sm sm:inline">
              All essays
            </Link>
          </div>
          <ul className="mt-10">
            {stories.slice(0, 3).map((story) => (
              <li key={story.slug} className="border-t border-hairline">
                <Link to="/news/$slug" params={{ slug: story.slug }} className="grid gap-3 py-7 sm:grid-cols-[9rem_1fr]">
                  <p className="kicker">
                    {story.kicker}
                    <span className="mt-2 block normal-case tracking-normal text-pumice">{story.date}</span>
                  </p>
                  <span>
                    <span className="idx block">{story.title}</span>
                    <span className="mt-2 block max-w-2xl text-pumice">{story.dek}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/news" className="nav-link mt-2 inline-flex min-h-11 items-center text-sm sm:hidden">
            All essays
          </Link>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <h2 className="statement">
            The lights stay off.
            <span className="italic"> The year doesn’t pause.</span>
          </h2>
          <p className="dek mt-6">
            Frontier labs buying data. People who have run a dark factory. Press who want the unglamorous
            version. Families looking for a treatment will be told the truth: the long mission includes a
            cure for Alzheimer’s. We cannot offer one, and we are not promising it is first.
          </p>
          <Link to="/contact" className="btn btn-primary mt-8">
            Talk to us
          </Link>
        </div>
      </section>
    </Shell>
  );
}
