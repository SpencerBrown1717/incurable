import { createFileRoute, Link } from "@tanstack/react-router";
import { DarkFloor } from "@/components/site/dark-floor";
import { LabScene } from "@/components/site/lab-scene";
import { Shell } from "@/components/site/shell";
import { pageMeta, programs, roadmap, specs, stories } from "@/lib/site";

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
      <section className="landing-hero">
        <div className="frame landing-grid">
          <div className="landing-copy">
            <p className="landing-label">Autonomous wet lab</p>
            <h1 className="landing-heading">
              173.6 halls.
              <span>One long mission.</span>
            </h1>
            <p className="landing-intro">
              A fully autonomous wet lab for CRISPR and mRNA, designed at the
              scale of Meta’s Hyperion campus. The long mission includes
              Alzheimer’s.
            </p>
            <div className="landing-actions">
              <a href="#hall" className="btn btn-primary">
                Explore the hall <span aria-hidden="true">↘</span>
              </a>
              <Link to="/alzheimers" className="btn btn-ghost">
                Alzheimer’s mission
              </Link>
            </div>
          </div>
          <div className="landing-model">
            <LabScene />
          </div>
          <dl className="landing-measurements">
            <div>
              <dt>Proposed footprint</dt>
              <dd>~10 million sq ft</dd>
            </div>
            <div>
              <dt>Scale reference</dt>
              <dd>Meta Hyperion</dd>
            </div>
            <div>
              <dt>Designed duty cycle</dt>
              <dd>24/7/365</dd>
            </div>
          </dl>
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
              timeline to offer today. The hall is designed to keep research
              moving around the clock.
            </p>
            <Link to="/alzheimers" className="mission-link mt-6">
              Read about the mission <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="hall" className="rule hall-section">
        <div className="frame section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="kicker">Hall 01</p>
              <h2 className="title mt-4">Inside the hall.</h2>
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
              <h2 className="title mt-4">The hall, in numbers.</h2>
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
          <h2 className="title">What the hall is for.</h2>
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
              All essays
            </Link>
          </div>
          <ul className="mt-10">
            {stories.slice(0, 3).map((story) => (
              <li key={story.slug} className="border-t border-hairline">
                <Link
                  to="/news/$slug"
                  params={{ slug: story.slug }}
                  className="grid gap-3 py-7 sm:grid-cols-[9rem_1fr]"
                >
                  <p className="kicker">
                    {story.kicker}
                    <span className="mt-2 block normal-case tracking-normal text-pumice">
                      {story.date}
                    </span>
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
            All essays
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
