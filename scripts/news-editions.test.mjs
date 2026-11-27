import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const editionsPath = new URL("../src/lib/news-editions.json", import.meta.url);
const day = 86_400_000;
const essaySlugs = ["lights-go-off", "use-the-field", "sell-the-data", "first-name-on-the-list"];

function dateValue(value, label) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${label} must use YYYY-MM-DD`);
  const timestamp = Date.parse(value);
  assert.ok(Number.isFinite(timestamp), `${label} must be a valid calendar date`);
  assert.equal(new Date(timestamp).toISOString().slice(0, 10), value, `${label} rolls over`);
  return timestamp;
}

function plainText(value, label) {
  assert.ok(typeof value === "string" && value.trim(), `${label} must contain text`);
  assert.doesNotMatch(value, /<\/?[a-z][^>]*>/i, `${label} must contain plain text`);
}

test("news editions contain three distinct, timely, sourced stories", () => {
  const editions = JSON.parse(readFileSync(editionsPath, "utf8"));
  assert.ok(Array.isArray(editions) && editions.length > 0, "Expected published editions");

  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Los_Angeles" }).format(
    new Date(),
  );
  let previousEdition = dateValue(today, "Pacific calendar date") + day;
  const slugs = new Set(essaySlugs);
  const primaryUrls = new Set();

  for (const edition of editions) {
    const publishedAt = dateValue(edition.publishedAt, "Edition date");
    assert.ok(publishedAt < previousEdition, "Edition dates must be newest first and never future");
    previousEdition = publishedAt;
    assert.ok(Array.isArray(edition.stories), `${edition.publishedAt} must contain stories`);
    assert.equal(
      edition.stories.length,
      3,
      `${edition.publishedAt} must contain exactly three stories`,
    );

    for (const story of edition.stories) {
      const slug = story.slug;
      assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a URL-friendly story slug");
      assert.ok(!slugs.has(slug), `Story slug already exists: ${slug}`);
      slugs.add(slug);

      const sourceDate = dateValue(story.date, `${slug} source date`);
      const age = publishedAt - sourceDate;
      assert.ok(age >= 0 && age <= 14 * day, `${slug} source date is outside the edition window`);

      for (const field of ["kicker", "title", "dek"]) plainText(story[field], `${slug} ${field}`);

      assert.ok(Array.isArray(story.blocks), `${slug} must contain article blocks`);
      for (const block of story.blocks) {
        assert.ok(["p", "h2"].includes(block.type), `${slug} has an unknown article block type`);
        plainText(block.text, `${slug} article block`);
      }
      assert.ok(
        story.blocks.some((block, index) => block.type === "h2" && story.blocks[index + 1]?.type === "p"),
        `${slug} must contain a section heading followed by a paragraph`,
      );

      assert.ok(Array.isArray(story.sources) && story.sources.length > 0, `${slug} needs a source`);
      const sourceUrls = story.sources.map(({ name, url }) => {
        plainText(name, `${slug} source name`);
        const parsed = typeof url === "string" ? URL.parse(url) : null;
        assert.ok(
          parsed?.protocol === "https:" && !parsed.username && !parsed.password,
          `${slug} needs an HTTPS source URL`,
        );
        parsed.hash = "";
        return parsed.href.replace(/\/$/, "");
      });
      assert.ok(!primaryUrls.has(sourceUrls[0]), `${slug} reuses a primary source URL`);
      primaryUrls.add(sourceUrls[0]);
    }
  }
});
