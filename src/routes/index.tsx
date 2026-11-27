import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, FlaskConical, Pill } from "lucide-react";
import { LabScene } from "@/components/site/lab-scene";
import { Shell } from "@/components/site/shell";
import { FIELD_SQFT, pageMeta, stories } from "@/lib/site";
import "./home.css";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Incurable? — The autonomous wet lab",
      "Explore Incurable’s proposed autonomous wet-lab campus for CRISPR and mRNA research in an interactive 3D facility model.",
    ),
  component: Home,
});

const researchPaths = [
  {
    href: "/science",
    icon: FlaskConical,
    title: "The science",
    summary: "CRISPR and mRNA research on diseases that still have no cure.",
  },
  {
    href: "/data",
    icon: Database,
    title: "The data",
    summary: "Lab-generated assay records for researchers and model builders.",
  },
  {
    href: "/price",
    icon: Pill,
    title: "The cost",
    summary: "A manufacturing model designed around the economics of generics.",
  },
] as const;

function Home() {
  return (
    <Shell className="home-shell">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="frame home-opening">
          <div className="home-hero-copy">
            <p className="home-label">Facility concept</p>
            <h1 id="home-title">
              The autonomous <em>wet lab.</em>
            </h1>
            <p className="home-intro">
              We’re designing a fully automated wet-lab campus for CRISPR and
              mRNA research on diseases that still have no cure.
            </p>
            <div className="home-actions">
              <a href="#hall" className="btn btn-primary">
                Explore the facility
              </a>
              <Link to="/alzheimers" className="btn btn-ghost">
                The mission
              </Link>
            </div>
          </div>
          <dl className="home-specs">
            <div>
              <dt>Hall 01 footprint</dt>
              <dd>{FIELD_SQFT.toLocaleString("en-US")} ft²</dd>
            </div>
            <div>
              <dt>Target operation</dt>
              <dd>24 hours a day</dd>
            </div>
            <div>
              <dt>Research focus</dt>
              <dd>CRISPR + mRNA</dd>
            </div>
          </dl>
        </div>

        <div className="frame home-facility" id="hall">
          <figure
            className="home-facility-figure"
            aria-labelledby="facility-title"
          >
            <figcaption className="home-facility-heading">
              <h2 id="facility-title">Wet-lab campus</h2>
              <span>Interactive 3D concept</span>
            </figcaption>
            <div className="home-model">
              <LabScene />
            </div>
          </figure>
        </div>
      </section>

      <section className="home-hall rule" aria-labelledby="hall-title">
        <div className="frame home-hall-frame">
          <div>
            <p className="home-label">Hall 01</p>
            <h2 id="hall-title" className="title mt-4">
              One hall, built to repeat.
            </h2>
          </div>
          <div className="home-hall-copy">
            <p>
              The campus starts with Hall 01, a single lab module the size of a
              football field. The design repeats that module across connected
              buildings, with lab robotics and space for continuous operation.
            </p>
            <Link to="/labs" className="home-text-link mt-3">
              See the lab design and scale
            </Link>
          </div>
        </div>
      </section>

      <section className="home-mission rule" aria-labelledby="mission-title">
        <div className="frame home-mission-frame">
          <div className="home-mission-copy">
            <p className="home-label">The long mission</p>
            <h2 id="mission-title" className="title mt-4">
              A shorter list of incurable diseases.
            </h2>
            <p className="mt-5">
              Alzheimer’s is among the diseases we hope to address. The work is
              at the concept stage, with no treatment or trial to offer.
            </p>
            <Link to="/alzheimers" className="btn mt-6">
              Why Alzheimer’s matters
            </Link>
          </div>
          <figure className="home-mission-image">
            <img
              src="/neuron-study.jpg"
              alt="Illustration of a branching neuron against a dark background"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Neuron illustration</figcaption>
          </figure>
        </div>
      </section>

      <section className="home-paths rule" aria-labelledby="research-title">
        <div className="frame section">
          <h2 id="research-title" className="title">
            From research to medicine.
          </h2>
          <div className="home-path-grid mt-7">
            {researchPaths.map(({ href, icon: Icon, title, summary }) => (
              <Link key={href} to={href} className="home-path">
                <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rule" aria-labelledby="news-title">
        <div className="frame section home-news">
          <div>
            <h2 id="news-title" className="title">
              From the desk.
            </h2>
            <Link to="/news" className="home-text-link mt-4">
              All essays
            </Link>
          </div>
          <ul className="home-essay-list">
            {stories.slice(0, 3).map((story) => (
              <li key={story.slug}>
                <Link to="/news/$slug" params={{ slug: story.slug }}>
                  <span>{story.title}</span>
                  <span>{story.kicker}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-contact rule" aria-labelledby="contact-title">
        <div className="frame section home-section-heading">
          <div>
            <h2 id="contact-title" className="title">
              Work with Incurable.
            </h2>
            <p className="home-section-note mt-4">
              Data partnerships, lab design, and press.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Talk to us
          </Link>
        </div>
      </section>
    </Shell>
  );
}
