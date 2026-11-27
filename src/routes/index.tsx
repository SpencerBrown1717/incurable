import { createFileRoute, Link } from "@tanstack/react-router";
import { DarkFloor } from "@/components/site/dark-floor";
import { LabScene } from "@/components/site/lab-scene";
import { Shell } from "@/components/site/shell";
import { formatNewsDate, newsEditions, pageMeta, programs, roadmap, specs } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Incurable? — Says who.",
      "Fully automated CRISPR and mRNA, 24/7/365, at the scale of Meta’s Hyperion — about 174 football fields. Data to frontier labs. Drugs at generic scale. Alzheimer’s is the long mission, not a promise to be first.",
    ),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <section className="frame barrier">
        <div>
          <p className="kicker">incurable.ai · the discovery campus</p>
          <h1 className="display barrier-title mt-6">
            <span className="block">Incurable?</span>
            <span className="block italic">Says who.</span>
          </h1>
          <p className="dek mt-8">
            A fully autonomous wet lab for CRISPR and mRNA. Lights off, every
            hour of the year, drawn to the footprint of Meta’s largest data
            center — 173.6 football fields of floor. Data to frontier labs.
            New drugs, made at generic scale. Alzheimer’s is the long mission.
            It may not be our first breakthrough.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              Talk to us
            </Link>
            <a href="#hall" className="btn btn-ghost">
              Explore the campus
            </a>
          </div>
        </div>
        <div>
          <dl className="spec-rail">
            <div>
              <dt>Scale</dt>
              <dd>≈174 football fields</dd>
            </div>
            <div>
              <dt>Duty</dt>
              <dd>24/7/365</dd>
            </div>
            <div>
              <dt>Loop</dt>
              <dd>CRISPR · mRNA</dd>
            </div>
            <div>
              <dt>The floor</dt>
              <dd>Lights off</dd>
            </div>
          </dl>
          <p className="scroll-cue mt-8 hidden lg:block">
            Scroll to explore the campus
          </p>
        </div>
      </section>

      <section id="hall" aria-label="The Discovery Campus">
        <div className="hall-stage">
          <LabScene />
        </div>
      </section>

      <section className="rule mission-section">
        <div className="frame section mission-grid">
          <div>
            <p className="kicker">The long mission</p>
            <h2 className="title mt-4">
              A shorter list of incurable diseases.
            </h2>
          </div>
          <div>
            <p className="dek">
              Alzheimer’s is part of the long mission. There is no treatment or
              timeline to offer today. The campus is designed to keep research
              moving around the clock.
            </p>
            <Link to="/alzheimers" className="mission-link mt-6">
              Read about the mission <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="rule hall-section">
        <div className="frame section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="kicker">Lab 01</p>
              <h2 className="title mt-4">Inside Lab 01.</h2>
            </div>
            <p className="dek">
              Explore a floor plan of the proposed autonomous lab. Select a bay
              to see its role, or let the simulation cycle through all eight
              stations.
            </p>
          </div>
          <div className="hall-panel mt-10">
            <DarkFloor />
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="kicker">Scale reference</p>
              <h2 className="title mt-4">The campus, in numbers.</h2>
              <p className="dek mt-5">
                Louisiana Economic Development puts Meta’s Hyperion campus at
                nearly ten million square feet. That is equivalent to 173.6
                football fields.
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
          <h2 className="title">What the campus is built to do.</h2>
          <div className="program-grid mt-8">
            {programs.map((program) => (
              <Link
                key={program.href}
                to={program.href}
                className="program-card group"
              >
                <p className="kicker">{program.kicker}</p>
                <h3 className="idx mt-5">{program.title}</h3>
                <p className="mt-4 text-pumice">{program.body}</p>
                <span className="mission-link mt-6">
                  Explore <span aria-hidden="true">↗</span>
                </span>
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
          <p className="kicker">Manufacturing</p>
          <h2 className="statement mt-5">New medicines at generic scale.</h2>
          <p className="dek mt-6">
            The model pairs original drug design with the volume and thin
            margins of generic manufacturing.
          </p>
          <Link to="/price" className="btn btn-ghost mt-8">
            Read about the model
          </Link>
        </div>
      </section>

      <section className="rule">
        <div className="frame section">
          <div className="flex items-end justify-between gap-6">
            <h2 className="title">From the desk.</h2>
            <Link to="/news" className="nav-link hidden text-sm sm:inline">
              All news
            </Link>
          </div>
          <ul className="mt-10">
            {newsEditions[0].stories.map((story) => (
              <li key={story.slug} className="border-t border-hairline">
                <Link
                  to="/news/$slug"
                  params={{ slug: story.slug }}
                  className="grid gap-3 py-7 sm:grid-cols-[9rem_1fr]"
                >
                  <p className="kicker">
                    {story.kicker}
                    <time
                      dateTime={story.date}
                      className="mt-2 block normal-case tracking-normal text-pumice"
                    >
                      {formatNewsDate(story.date)}
                    </time>
                  </p>
                  <span>
                    <span className="idx block">{story.title}</span>
                    <span className="mt-2 block max-w-2xl text-pumice">
                      {story.dek}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/news"
            className="nav-link mt-2 inline-flex min-h-11 items-center text-sm sm:hidden"
          >
            All news
          </Link>
        </div>
      </section>

      <section className="rule contact-band">
        <div className="frame section mission-grid">
          <h2 className="title">Work with Incurable.</h2>
          <div>
            <p className="dek">
              For data partnerships, lab construction, and press inquiries.
            </p>
            <Link to="/contact" className="btn btn-primary mt-6">
              Talk to us <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
