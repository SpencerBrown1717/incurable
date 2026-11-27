import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsFigure } from "@/components/site/news-figure";
import { essays, formatNewsDate, newsEditions, pageMeta, type Story } from "@/lib/site";

export const Route = createFileRoute("/news/")({
  head: () =>
    pageMeta(
      "From the desk — Incurable?",
      "Three stories each week on gene editing, emerging medicines, magnetic resonance, and AI in biology and drug discovery.",
    ),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <>
      <header className="frame section grid items-end gap-8 pb-0 md:grid-cols-2">
        <div>
          <p className="kicker">News</p>
          <h1 className="title mt-5">From the desk.</h1>
          <p className="dek mt-6">
            Three stories each week on gene editing, emerging medicines, magnetic resonance,
            and how AI is changing biology and drug discovery.
          </p>
        </div>
        <NewsFigure className="w-full max-w-sm md:justify-self-end" />
      </header>
      <div className="frame section space-y-12 pt-12">
        {newsEditions.map((edition) => (
          <section key={edition.publishedAt}>
            <h2 className="kicker mb-4">
              <time dateTime={edition.publishedAt}>{formatNewsDate(edition.publishedAt)}</time> edition
            </h2>
            <StoryList stories={edition.stories} />
          </section>
        ))}
        <section>
          <h2 className="kicker mb-4">Essays from Incurable</h2>
          <StoryList stories={essays} />
        </section>
      </div>
    </>
  );
}

function StoryList({ stories }: { stories: Story[] }) {
  return (
    <ul>
      {stories.map((story) => (
        <li key={story.slug} className="border-t border-hairline">
          <Link
            to="/news/$slug"
            params={{ slug: story.slug }}
            className="grid gap-3 py-8 md:grid-cols-[11rem_1fr]"
          >
            <p className="kicker">
              {story.kicker}
              <span className="mt-2 block font-sans text-sm normal-case tracking-normal">
                {story.sources ? (
                  <time dateTime={story.date}>{formatNewsDate(story.date)}</time>
                ) : (
                  story.date
                )}
              </span>
            </p>
            <span>
              <span className="idx block max-w-2xl">{story.title}</span>
              <span className="mt-3 block max-w-2xl text-pumice">{story.dek}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
