# NorCal EVs Full Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every existing NorCal EVs route with the approved Community Poster visual system while preserving page structure, themes, integrations, and behavior.

**Architecture:** Keep the existing Astro 6 static-site architecture and data modules. Update the shared layout, navigation, footer, and semantic CSS system first, then migrate the homepage and interior routes onto reusable layout primitives. Add source-level contract tests for required routes, integrations, and scope constraints, then verify the rendered site in both themes and responsive sizes.

**Tech Stack:** Astro 6, TypeScript data modules, plain CSS, Node built-in test runner, GitHub Pages

## Global Constraints

- Do not add routes, sections, user-facing features, or runtime dependencies.
- Preserve the current page order and each page's basic section order.
- Preserve automatic system-reactive light and dark modes.
- Preserve the Heylo event script, identifiers, loading state, MutationObserver fallback, and calendar links.
- Preserve the MailerLite universal script, embedded form identifier, validation, and submission behavior.
- Preserve the homepage sponsor block, sponsor data, links, and light and dark logo variants.
- Center the NorCal EVs logo in the homepage hero.
- Do not add a scrolling banner or auto-moving decorative content.
- Use semantic CSS variables for production colors.
- Use no em dashes and no hashtags.
- Keep the existing Astro architecture and GitHub Pages deployment.
- Do not deploy without explicit approval.

---

## File Map

- `package.json`: expose the Node contract tests through `npm test`.
- `tests/redesign-contracts.test.mjs`: protect route inventory, integrations, theme behavior, approved hero structure, and prohibited marquee behavior.
- `src/styles/global.css`: own tokens, typography, responsive layout, shared poster primitives, page-specific layouts, focus states, and theme overrides.
- `src/layouts/BaseLayout.astro`: preserve head scripts and compose the shared site chrome.
- `src/components/Nav.astro`: preserve destinations and mobile behavior with redesigned markup classes.
- `src/components/Footer.astro`: preserve all links and contact details with redesigned layout classes.
- `src/pages/index.astro`: implement the approved centered-logo homepage and preserve all current sections and integrations.
- `src/pages/membership.astro`: implement the approved interior-page system and preserve membership content.
- `src/pages/sponsorships.astro`: apply the interior system to audience, tiers, event options, note, and contact sections.
- `src/pages/resources.astro`: apply the interior system to the existing resource list and contribution section.
- `src/pages/leaders.astro`: apply the interior system to board, leadership roles, expectations, and invitation sections.
- `src/pages/privacy.astro`, `src/pages/terms.astro`, `src/pages/changelog.astro`: apply restrained document styling without changing legal or historical content.
- `src/pages/404.astro`: apply the shared page treatment without changing actions.
- `src/pages/join.astro`: preserve redirect behavior and align its minimal fallback screen with the redesigned theme.

---

### Task 1: Add Redesign Contract Tests

**Files:**
- Create: `tests/redesign-contracts.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: current Astro route files and shared stylesheet as source text
- Produces: `npm test`, a stable contract suite that later tasks must keep green

- [ ] **Step 1: Write the failing contract tests**

Create `tests/redesign-contracts.test.mjs` with Node's built-in test runner. The tests should read source files directly so no browser dependency is required:

```js
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
```

- [ ] **Step 2: Add the test script**

Add this script to `package.json` without changing dependencies:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 3: Run the tests and verify the expected failure**

Run: `npm test`

Expected: route, integration, theme, and em-dash tests pass. The centered brand-mark test fails because `.home-hero-logo` and the approved centering selectors do not exist yet.

- [ ] **Step 4: Commit the contract tests**

```bash
git add package.json tests/redesign-contracts.test.mjs
git commit -m "test: protect redesign contracts"
```

---

### Task 2: Build the Shared Community Poster System

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Nav.astro`
- Modify: `src/components/Footer.astro`

**Interfaces:**
- Consumes: current navigation and social data, current theme behavior, existing logo assets
- Produces: `.site-nav`, `.site-footer`, `.poster-kicker`, `.poster-title`, `.poster-section`, `.poster-grid`, `.interior-hero`, `.poster-button`, `.poster-button-ghost`, `.document-prose`, and semantic tokens for every route

- [ ] **Step 1: Define the semantic theme roles**

Replace the current token block with roles based on the existing color family. Keep values in one light block and one dark override block:

```css
:root {
  color-scheme: light dark;
  --page: #f2e8d5;
  --page-alt: #faf6ec;
  --ink: #07110d;
  --ink-muted: #5f6c63;
  --poster: #07110d;
  --poster-soft: #0d1b14;
  --poster-ink: #f2e8d5;
  --poster-muted: rgba(242, 232, 213, 0.7);
  --volt: #25c7dc;
  --volt-ink: #07110d;
  --brand-green: #2b542f;
  --rule: rgba(7, 17, 13, 0.18);
  --rule-dark: rgba(242, 232, 213, 0.16);
  --focus: #1596a8;
  --max-width: 1200px;
  --nav-height: 68px;
  --font-display: "Archivo", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page: #07110d;
    --page-alt: #0d1b14;
    --ink: #f2e8d5;
    --ink-muted: rgba(242, 232, 213, 0.68);
    --rule: rgba(242, 232, 213, 0.16);
    --focus: #25c7dc;
  }
}
```

- [ ] **Step 2: Add shared typography, spacing, grid, button, and focus primitives**

Implement the approved visual language with these stable class contracts:

```css
.poster-kicker {
  display: inline-flex;
  color: var(--volt);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.poster-title {
  font-size: clamp(2.8rem, 7vw, 5.6rem);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.88;
  text-transform: uppercase;
}

.poster-grid {
  display: grid;
  border-top: 1px solid var(--rule);
  border-left: 1px solid var(--rule);
}

.poster-button,
.poster-button-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:where(a, button, input, select, textarea):focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Redesign navigation without changing destinations or behavior**

Keep the existing data mapping, dropdown, mobile toggle, and join destination. Update classes to `.site-nav`, `.site-nav-inner`, `.site-nav-brand`, `.site-nav-links`, `.site-nav-submenu`, `.site-nav-join`, and `.site-nav-toggle`. Retain `aria-expanded`, the existing menu script, external-link attributes, and keyboard behavior.

- [ ] **Step 4: Redesign the footer without changing its content**

Keep the brand, tagline, community links, social links, email address, privacy, terms, copyright, and changelog information. Use a ruled three-column desktop grid that stacks to one column below 760px.

- [ ] **Step 5: Preserve shared head behavior**

In `BaseLayout.astro`, keep canonical metadata, theme-color metadata, favicons, Google Fonts, Tinylytics, MailerLite, skip link, and the shared component composition. Update class names only where the redesigned shared CSS requires them.

- [ ] **Step 6: Run contract and build checks**

Run: `npm test && npm run check && npm run build`

Expected: the centered-homepage test still fails. All other tests pass. Astro check and production build pass.

- [ ] **Step 7: Commit the shared system**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/Nav.astro src/components/Footer.astro
git commit -m "feat: build Community Poster design system"
```

---

### Task 3: Redesign the Homepage

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/redesign-contracts.test.mjs`

**Interfaces:**
- Consumes: shared poster primitives, `sponsors`, current image assets, MailerLite embed, Heylo embed
- Produces: `.home-hero`, `.home-hero-inner`, `.home-hero-logo`, `.home-about`, `.pillar-grid`, `.brand-photo-grid`, `.events-layout`, `.sponsor-grid`, and `.newsletter-band`

- [ ] **Step 1: Replace the hero with the approved centered composition**

Keep the two current actions and current positioning intent. Use this structure:

```astro
<section class="home-hero">
  <div class="home-hero-inner container">
    <img class="home-hero-logo" src="/assets/images/logo-400.png" alt="NorCal EVs" />
    <span class="poster-kicker">Northern California, every EV</span>
    <h1 class="poster-title">Plug in.<br /><span>Show up.</span></h1>
    <p>Meetups, drives, and good people. Every brand belongs here.</p>
    <div class="poster-actions">
      <a class="poster-button" href="/membership">Join the community</a>
      <a class="poster-button-ghost" href="#events">Upcoming events</a>
    </div>
  </div>
</section>
```

Set `.home-hero` to `text-align: center` and `.home-hero-inner` to a centered flex column. Use the current hero photograph with a strong contrast overlay. Do not add a banner.

- [ ] **Step 2: Reduce the About section to one visual statement**

Keep the current meaning and 501(c)(7) statement, but split the section into a compact label column and one large statement column. Do not add a new claim.

- [ ] **Step 3: Preserve all six pillars in a compact grid**

Keep the `pillars` array and its six entries. Shorten descriptions while preserving each pillar's meaning. Render a three-column desktop grid, two columns at tablet widths, and one column on mobile.

- [ ] **Step 4: Redesign the four-image brand strip**

Keep the current four assets and labels. Render a four-column image row with static labels, grayscale at rest on hover-capable devices, and a color-safe touch fallback.

- [ ] **Step 5: Preserve and reframe the Heylo section**

Keep the exact script, data attributes, loading state, fallback markup, view-all link, and MutationObserver. Use a two-column layout with concise copy and the widget inside a light or dark framed panel that uses semantic tokens.

- [ ] **Step 6: Preserve and redesign Sponsors and Newsletter**

Keep `sponsors.map`, both logo variants, sponsor links, the sponsorship link, the `.ml-embedded` form, and its `data-form="AbIwuu"` identifier. Use a restrained sponsor grid and a teal newsletter band.

- [ ] **Step 7: Run the homepage tests**

Run: `npm test && npm run check && npm run build`

Expected: all contract tests pass. Astro check and build pass.

- [ ] **Step 8: Render and inspect the homepage**

Run `npm run dev`, then capture:

- Desktop light at 1440 by 1200
- Desktop dark at 1440 by 1200
- Mobile light at 390 by 844
- Mobile dark at 390 by 844

Inspect hero centering, logo scale, heading wrapping, image crop, integrations, sponsor logos, newsletter overflow, focus states, and horizontal scrolling.

- [ ] **Step 9: Commit the homepage**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: redesign NorCal EVs homepage"
```

---

### Task 4: Redesign Membership

**Files:**
- Modify: `src/pages/membership.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `.interior-hero`, `.poster-kicker`, `.poster-title`, `.poster-button`, shared grid primitives
- Produces: `.membership-steps`, `.launch-offer`, `.membership-tiers`, `.membership-tier`, `.benefits-grid`, and the reference pattern for data-heavy interior pages

- [ ] **Step 1: Build the approved membership hero**

Use the approved split composition: large statement and actions on the left, current EV photography with the centered logo on the right. Keep current membership meaning and actions.

- [ ] **Step 2: Convert the five-step path into a ruled strip**

Keep all five step names and meanings. Shorten only repeated supporting phrases. Stack steps on mobile.

- [ ] **Step 3: Preserve the Launch Edition offer**

Keep the `launchClaimed < launchTotal` condition, current offer details, and current action. Style it as a high-contrast teal band immediately before the tiers.

- [ ] **Step 4: Rebuild the three tiers as a clear comparison**

Keep names, prices, benefits, destinations, and the Best Value label. Use a light Standard Range card, a dark featured Long Range card, and a light Max Pack card in light mode. Use semantic equivalents in dark mode. Stack all three on mobile.

- [ ] **Step 5: Convert the benefits section into a two-column ruled grid**

Keep all six benefits and qualifiers. Do not remove tier distinctions.

- [ ] **Step 6: Preserve the All Brands Welcome closing section**

Keep the existing message and section position. Use the current Ford image as the full-width background with an accessible overlay.

- [ ] **Step 7: Run checks and inspect responsive layouts**

Run: `npm test && npm run check && npm run build`

Inspect Membership at 1440, 768, and 390 pixels in both themes. Verify tier benefits, prices, buttons, Launch Edition visibility, and absence of overflow.

- [ ] **Step 8: Commit Membership**

```bash
git add src/pages/membership.astro src/styles/global.css
git commit -m "feat: redesign membership page"
```

---

### Task 5: Redesign Sponsorships, Resources, and Leaders

**Files:**
- Modify: `src/pages/sponsorships.astro`
- Modify: `src/pages/resources.astro`
- Modify: `src/pages/leaders.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: approved interior-page primitives and membership comparison patterns
- Produces: `.audience-grid`, `.sponsorship-tiers`, `.event-options`, `.resource-grid`, `.leadership-grid`, `.expectations-grid`, and `.closing-band`

- [ ] **Step 1: Apply the interior hero to Sponsorships**

Keep the current introduction and sponsorship email action. Use the same page family as Membership without repeating the membership imagery.

- [ ] **Step 2: Preserve Sponsorships section order and data**

Keep audience overview, four annual tiers, event add-ons, current growth note, and contact section. Use compact grid comparisons. Do not change prices, benefits, claims, or mailto content during visual implementation.

- [ ] **Step 3: Apply the interior system to Resources**

Keep the introduction, four resources, status labels, links, and closing contribution section. Use a ruled list or two-column grid that makes external and coming-soon states obvious.

- [ ] **Step 4: Apply the interior system to Leaders**

Keep introduction, board section, community leadership roles, leadership expectations, and closing invitation. Keep all names, roles, links, and descriptions unchanged except for approved brevity edits that do not change meaning.

- [ ] **Step 5: Run checks and inspect all three routes**

Run: `npm test && npm run check && npm run build`

Inspect desktop and mobile in both themes. Verify all mailto and external destinations, tier content, status labels, board content, and closing actions.

- [ ] **Step 6: Commit the primary interior pages**

```bash
git add src/pages/sponsorships.astro src/pages/resources.astro src/pages/leaders.astro src/styles/global.css
git commit -m "feat: redesign interior community pages"
```

---

### Task 6: Redesign Utility and Document Routes

**Files:**
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/terms.astro`
- Modify: `src/pages/changelog.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/join.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `.interior-hero`, `.document-prose`, `.poster-button`, theme tokens
- Produces: consistent styling across every remaining route without changing content or behavior

- [ ] **Step 1: Apply restrained document styling to Privacy and Terms**

Keep every section and sentence. Use readable line length, strong heading hierarchy, ruled metadata, and minimal decoration.

- [ ] **Step 2: Apply a ruled timeline treatment to Changelog**

Keep all entries and their order. Do not add search, filtering, accordions, or other functionality.

- [ ] **Step 3: Redesign 404 without adding content**

Keep the current headline, supporting sentence, and two actions. Use the shared poster hero treatment.

- [ ] **Step 4: Align Join redirect with the theme**

Keep the target constant, meta refresh, canonical destination, fallback link, and minimal standalone document. Update only its typography, semantic colors, and focus style.

- [ ] **Step 5: Run checks and inspect utility routes**

Run: `npm test && npm run check && npm run build`

Verify readable legal content, unchanged changelog entries, correct 404 actions, and working Join redirect fallback.

- [ ] **Step 6: Commit utility routes**

```bash
git add src/pages/privacy.astro src/pages/terms.astro src/pages/changelog.astro src/pages/404.astro src/pages/join.astro src/styles/global.css
git commit -m "feat: redesign utility pages"
```

---

### Task 7: Full-Site Verification and Refinement

**Files:**
- Modify as needed: files already in redesign scope
- Update: `CHANGELOG.md`

**Interfaces:**
- Consumes: all redesigned routes and shared components
- Produces: a verified production build ready for Zak's visual review, not deployment

- [ ] **Step 1: Run automated verification**

Run:

```bash
npm test
npm run check
npm run build
```

Expected: all commands exit successfully with no test failures or Astro errors.

- [ ] **Step 2: Audit route inventory and prohibited scope changes**

Run:

```bash
find src/pages -maxdepth 1 -name '*.astro' -print | sort
rg -n 'marquee|new feature|#[0-9a-fA-F]{3,8}' src
rg -n '—' src
```

Expected: route list matches the contract test. No marquee or em dash is present. Any raw color is limited to documented theme definitions or necessary standalone redirect metadata.

- [ ] **Step 3: Verify every route visually**

Inspect `/`, `/membership`, `/sponsorships`, `/resources`, `/leaders`, `/privacy`, `/terms`, `/changelog`, `/join`, and a nonexistent route at desktop and mobile widths. Check both color schemes.

- [ ] **Step 4: Verify third-party and navigation behavior**

Confirm:

- Heylo events populate or reveal the preserved fallback.
- MailerLite renders and retains its validation and consent UI.
- Sponsor links and dark variants work.
- Desktop dropdown and mobile menu work with mouse, touch, and keyboard.
- Join, membership, sponsor, resource, social, legal, and email links remain correct.

- [ ] **Step 5: Verify accessibility and layout quality**

Check visible focus, heading order, alternative text, tap targets, contrast, reduced motion, body line length, responsive image crops, tier stacking, and horizontal overflow.

- [ ] **Step 6: Update the changelog**

Add one new top entry describing the full visual redesign, reduced copy density, preserved integrations, and retained automatic themes. Do not claim deployment.

- [ ] **Step 7: Run final verification after changelog update**

Run: `npm test && npm run check && npm run build && git diff --check`

Expected: all commands pass.

- [ ] **Step 8: Commit final refinements**

```bash
git add CHANGELOG.md src tests package.json
git commit -m "chore: verify full site redesign"
```

- [ ] **Step 9: Present local visual review**

Keep the local preview running and provide Zak with the local URL and representative homepage and membership screenshots. Do not push or deploy. Iterate from Zak's visual feedback before any publication step.
