import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("route inventory stays unchanged", async () => {
  const pages = (await readdir(new URL("../src/pages", import.meta.url)))
    .filter((name) => name.endsWith(".astro"))
    .sort();

  assert.deepEqual(pages, [
    "404.astro",
    "changelog.astro",
    "index.astro",
    "join.astro",
    "leaders.astro",
    "membership.astro",
    "privacy.astro",
    "resources.astro",
    "sponsorships.astro",
    "terms.astro",
  ]);
});

test("homepage preserves required integrations", async () => {
  const page = await read("src/pages/index.astro");
  const layout = await read("src/layouts/BaseLayout.astro");

  assert.match(page, /embedded-events\.min\.js/);
  assert.match(page, /data-api-key/);
  assert.match(page, /data-community-id/);
  assert.match(page, /MutationObserver/);
  assert.match(page, /sponsors\.map/);
  assert.match(page, /ml-embedded/);
  assert.match(layout, /1120932/);
  assert.match(layout, /mailerlite/iu);
});

test("approved homepage hero centers the brand mark", async () => {
  const page = await read("src/pages/index.astro");
  const css = await read("src/styles/global.css");

  assert.match(page, /class="home-hero-logo"/);
  assert.match(page, /logo-400\.png/);
  assert.match(css, /\.home-hero-inner\s*\{[^}]*align-items:\s*center/s);
  assert.match(css, /\.home-hero\s*\{[^}]*text-align:\s*center/s);
});

test("homepage uses the approved Upcoming heading", async () => {
  const page = await read("src/pages/index.astro");

  assert.match(page, />See What's Next</);
});

test("redesign has no scrolling banner", async () => {
  const page = await read("src/pages/index.astro");
  const css = await read("src/styles/global.css");

  assert.doesNotMatch(page, /marquee/iu);
  assert.doesNotMatch(css, /marquee/iu);
});

test("automatic light and dark themes remain", async () => {
  const css = await read("src/styles/global.css");

  assert.match(css, /:root\s*\{/);
  assert.match(css, /color-scheme:\s*light dark/);
  assert.match(css, /@media\s*\(prefers-color-scheme:\s*dark\)/);
});

test("shared navigation stays visible while pages scroll", async () => {
  const css = await read("src/styles/global.css");

  assert.match(css, /\.site-nav\s*\{[^}]*position:\s*sticky[^}]*top:\s*0/s);
});

test("production source contains no em dash", async () => {
  const files = [
    "src/layouts/BaseLayout.astro",
    "src/components/Nav.astro",
    "src/components/Footer.astro",
    "src/pages/index.astro",
    "src/pages/membership.astro",
    "src/pages/sponsorships.astro",
    "src/pages/resources.astro",
    "src/pages/leaders.astro",
    "src/pages/privacy.astro",
    "src/pages/terms.astro",
    "src/pages/changelog.astro",
    "src/pages/404.astro",
    "src/pages/join.astro",
    "src/styles/global.css",
  ];
  const sources = await Promise.all(files.map(read));

  assert.equal(sources.some((source) => source.includes("\u2014")), false);
});
