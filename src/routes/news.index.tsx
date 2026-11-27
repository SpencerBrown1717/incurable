import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsFigure } from "@/components/site/news-figure";
import { pageMeta, stories } from "@/lib/site";

export const Route = createFileRoute("/news/")({
  head: () =>
    pageMeta(
      "From the desk — Incurable?",
      "Essays on lights-out labs, 173.6 halls, selling assay data, and why Alzheimer’s is the long mission rather than the schedule.",
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
            Four essays. No product announcements disguised as science, because the hall is not online and
            we will not write as if it were.
          </p>
        </div>
        <NewsFigure className="w-full max-w-sm md:justify-self-end" />
      </header>
      <section className="frame section pt-12">
        <ul>
          {stories.map((story) => (
            <li key={story.slug} className="border-t border-hairline">
              <Link to="/news/$slug" params={{ slug: story.slug }} className="grid gap-3 py-8 md:grid-cols-[11rem_1fr]">
                <p className="kicker">
                  {story.kicker}
                  <span className="mt-2 block font-sans text-sm normal-case tracking-normal">{story.date}</span>
                </p>
                <span>
                  <span className="idx block max-w-2xl">{story.title}</span>
                  <span className="mt-3 block max-w-2xl text-pumice">{story.dek}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
