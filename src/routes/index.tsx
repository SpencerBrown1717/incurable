import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, FlaskConical, Pill } from "lucide-react";
import { DarkFloor } from "@/components/site/dark-floor";
import { LabScene } from "@/components/site/lab-scene";
import { Shell } from "@/components/site/shell";
import { FIELD_SQFT, pageMeta, stories } from "@/lib/site";
import "./home.css";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Incurable? — Says who.",
      "Incurable is designing an automated wet lab for CRISPR and mRNA research. Explore the Hall 01 concept and the long-term mission.",
    ),
  component: Home,
});

const researchPaths = [
  {
    href: "/science",
    icon: FlaskConical,
    title: "The science",
    summary: "CRISPR and mRNA research in a shared experimental workflow.",
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
    <Shell>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="frame">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-label">Autonomous wet lab concept</p>
              <h1 id="home-title">
                Incurable?
                <em>Says who.</em>
              </h1>
              <p className="home-intro">
                We’re designing an automated lab to study diseases medicine
                still can’t cure.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#hall" className="btn btn-primary">
                  Explore Hall 01
                </a>
                <Link to="/alzheimers" className="btn btn-ghost">
                  The mission
                </Link>
              </div>
            </div>
            <div className="home-model">
              <LabScene />
            </div>
          </div>

          <dl className="home-specs">
            <div>
              <dt>Proposed footprint</dt>
              <dd>{FIELD_SQFT.toLocaleString("en-US")} sq ft</dd>
            </div>
            <div>
              <dt>Design target</dt>
              <dd>24/7 operation</dd>
            </div>
            <div>
              <dt>Research methods</dt>
              <dd>CRISPR + mRNA</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="home-mission" aria-labelledby="mission-title">
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
              alt="Illustration of a branching neuron glowing violet against a dark background"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Neuron illustration</figcaption>
          </figure>
        </div>
      </section>

      <section
        id="hall"
        className="home-hall rule"
        aria-labelledby="hall-title"
      >
        <div className="frame section">
          <div className="home-section-heading">
            <div>
              <p className="home-label">The floor plan</p>
              <h2 id="hall-title" className="title mt-3">
                Inside Hall 01.
              </h2>
            </div>
            <p className="home-section-note">
              Select a bay to see how the proposed lab would work.
            </p>
          </div>
          <DarkFloor />
          <Link to="/labs" className="home-text-link mt-6">
            See the lab design and scale
          </Link>
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
