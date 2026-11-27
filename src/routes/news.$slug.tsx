import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { NewsFigure } from "@/components/site/news-figure";
import { pageMeta, storyBySlug, stories } from "@/lib/site";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const story = storyBySlug(params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return pageMeta("Essay — Incurable?", "An essay from Incurable?.");
    return pageMeta(`${loaderData.title} — Incurable?`, loaderData.dek);
  },
  component: StoryPage,
  notFoundComponent: MissingStory,
});

function StoryPage() {
  const story = Route.useLoaderData();
  const index = stories.findIndex((item) => item.slug === story.slug);
  const next = stories[(index + 1) % stories.length];
  const firstHeading = story.blocks.findIndex((block) => block.type === "h2");

  return (
    <article>
      <header className="frame section pb-0">
        <p className="kicker">
          <Link to="/news" className="nav-link">
            News
          </Link>
          <span className="px-2 text-pumice">/</span>
          {story.kicker}
        </p>
        <h1 className="title mt-5 max-w-4xl">{story.title}</h1>
        <p className="kicker mt-6">{story.date}</p>
        <p className="dek mt-6">{story.dek}</p>
      </header>
      <div className="frame section">
        <div className="prose">
          {story.blocks.map((block, i) => (
            <Fragment key={i}>
              {i === firstHeading ? (
                <NewsFigure storySlug={story.slug} className="my-9 max-w-lg" />
              ) : null}
              {block.type === "h2" ? <h2>{block.text}</h2> : <p>{block.text}</p>}
            </Fragment>
          ))}
        </div>
        {next ? (
          <div className="mt-16 border-t border-hairline pt-8">
            <p className="kicker">Next</p>
            <Link to="/news/$slug" params={{ slug: next.slug }} className="idx mt-3 block max-w-xl">
              {next.title}
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function MissingStory() {
  return (
    <div className="frame section">
      <p className="kicker">News</p>
      <h1 className="title mt-4">That essay is not on the desk.</h1>
      <Link to="/news" className="btn btn-primary mt-8">
        All essays
      </Link>
    </div>
  );
}
