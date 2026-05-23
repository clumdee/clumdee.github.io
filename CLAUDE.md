# CLAUDE.md

Onboarding notes for Claude Code sessions in this repo. Not served — `_config.yml` excludes it from the Jekyll build.

## What this is

Personal Jekyll blog **"Tua's Random Walk"** at https://clumdee.github.io, hosted on GitHub Pages from the `main` branch of `clumdee/clumdee.github.io`. Repo root is the Jekyll source.

## Run locally

```sh
bundle exec jekyll serve   # http://127.0.0.1:4000
bundle exec jekyll build   # writes _site/
```

No Makefile, no `package.json`, no test suite, no linter. Built with the `github-pages` gem (see `Gemfile`) — only plugins on the GitHub Pages allowlist work. `Gemfile.lock` is intentionally gitignored so GH Pages controls versions.

## Build CSS (Tailwind)

Styling is **Tailwind v3** compiled by the standalone CLI binary at `bin/tailwindcss` (gitignored — re-download per [tailwindcss-macos-arm64 v3.4.17 release](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17) on a fresh checkout).

```sh
./bin/build-css.sh             # one-shot build
./bin/build-css.sh --watch     # rebuild on changes (run alongside jekyll serve)
```

The build reads [`tailwind.config.js`](tailwind.config.js) and [`static/css/tailwind.input.css`](static/css/tailwind.input.css), writes minified output to [`static/css/main.css`](static/css/main.css). **Commit `static/css/main.css`** — GitHub Pages serves it as-is; it has no build step on their side.

`tailwind.input.css` includes a **Bootstrap-compatibility shim** in `@layer components` that aliases the Bootstrap 4 utility classes still embedded in `_posts/*.md` (`.w-75`, `.text-center`, `.my-4`, `.btn`, `.jumbotron`, `.d-flex`, `.col-*`, …). Do not delete this layer without first auditing post bodies.

## Content model

Posts live in **per-category `_posts/` dirs**, one dir per category:

- `coding/_posts/`
- `optics/_posts/`
- `random/_posts/`

`blog/` is **not** a `_posts` dir — it holds legacy redirect stubs (one `<slug>/index.html` per old URL, each a `<meta http-equiv="refresh">` pointing at the new permalink). Don't put new posts there; do preserve existing stubs.

`talks/index.md` is a static landing page using `layout: base_talks`. PDFs live in `talks/talks-pdf/`. No `_posts/` under talks.

### Post filename and front matter (canonical)

Filename: `YYYY-MM-DD-slug.md` inside the category's `_posts/`.

```yaml
---
layout: post
title: "..."
date: YYYY-MM-DD
category: coding   # or optics, random
---
```

Permalink shape (from `_config.yml`): `/:categories/:title` → `coding/_posts/2017-04-19-basic-stock-analysis.md` renders to `/coding/basic-stock-analysis`.

### Images

Per-category images live in `<category>/img/`. Shared assets live in `static/img/`, `static/css/`, `static/js/`.

Two ways to reference a post image:
- **Preferred (new posts):** `{% include image.html img="coding/img/foo.png" title="..." caption="..." width="md" align="center" %}` — renders a semantic `<figure>` with lazy-loading and an optional `<figcaption>`. See [`_includes/image.html`](_includes/image.html) for all args.
- **Inline (legacy posts):** `<img src="{{ site.url }}/<category>/img/<filename>">` still works via the Tailwind shim.

## Layouts and includes

- `_layouts/base.html` — root wrapper (nav + footer + scripts).
- `_layouts/post.html` — every post. Compact header (quote injector + title + date · category breadcrumb), then `<article class="prose ...">` body, then MathJax loaded lazily. No jumbotron, no per-post social buttons.
- `_layouts/base_coding.html`, `base_optics.html`, `base_random.html`, `base_talks.html` — category landing wrappers. Each is a tight hero (quote in `max-w-3xl`) + a content section. Talks uses `.prose`; the others use a plain section.
- `_includes/head.html` — meta, Prompt + Source Serif 4 from Google Fonts, compiled Tailwind CSS at [`static/css/main.css`](static/css/main.css), **Google Analytics `G-NG12M3TDGG`**, **Google Ads gtag `AW-16846140344`** with conversion event `AW-16846140344/itOgCOnf-r0aELjn7uA-`, **AdSense `ca-pub-1469161366135496`**.
- `_includes/navbar.html` — sticky nav, hamburger driven by vanilla JS in [`static/js/main.js`](static/js/main.js).
- `_includes/footer.html`, `image.html`, `category_list.html` (renders a category's posts as a `date | title` list with optional `intro` arg), `script.html` (loads FontAwesome + `main.js`), `script_drunkard2D.html` (one-off post script).
- `static/js/main.js` — site JS: navbar toggle, active-nav highlight via `<body data-page-category>`, quote-injector with 3s timeout.

## Don't touch without intent

- **`_config.yml` `exclude:` block** — keeps `CLAUDE.md`, `.claude/`, `memory/`, `ONBOARDING.md`, `AGENTS.md`, etc. out of `_site/`. Don't shrink it; new Claude/agent files should be added here.
- **Analytics / Ads / AdSense IDs in `_includes/head.html`** — production live. Don't edit casually.
- **`ads.txt`** at repo root — ad-exchange authorization file (`google.com, pub-1469161366135496, DIRECT, …`). Leave alone unless asked.
- **`blog/<slug>/index.html` redirect stubs** — preserve URL history; don't delete.

## Conventions worth knowing

- **CV path is centralized.** `site.social.cv` in [`_config.yml`](_config.yml) (currently `/static/etc/ChatdanaiLumdee_202506.pdf`). To update the CV, drop the new PDF into `static/etc/` and edit that one line. Consumers use `{{ site.social.cv | prepend: site.baseurl }}` — don't hardcode the path.
- **Typography.** Inside `.prose` blocks (post bodies, `base_talks`): body text uses Source Serif 4 (Latin) with Prompt as the Thai fallback; H1–H6 stay in Prompt sans. Outside `.prose` (nav, footer, heroes, category landings) everything is Prompt sans. Defined in [`tailwind.config.js`](tailwind.config.js) `fontFamily.serif` and applied in [`static/css/tailwind.input.css`](static/css/tailwind.input.css).
- **`/random/` timeline** uses native `<details>` / `<summary>` elements (no JS). Chevron rotates via CSS in `tailwind.input.css`. Several panels are still `To be filled …` placeholders — fill or delete when you get to them.
- **Accent color is teal-600** (`#0d9488`); see `theme.extend.colors.accent` in `tailwind.config.js`. Hover state is `accent-dark`. The Rouge syntax palette in `tailwind.input.css` is keyed to this family.
- MathJax loads globally on the `post` layout, so LaTeX works in posts out of the box.
- Some `optics/_posts/` entries embed `mybinder.org` launch buttons to companion notebooks on GitHub. Preserve those links when editing those posts.
- `wip/` and `_site/` are gitignored — scratch and build output.
- `.claude/` is also out of git globally (user's global gitignore).

## Before declaring a change done

1. `bundle exec jekyll build` runs clean.
2. If you changed `tailwind.input.css`, `tailwind.config.js`, or added new utility classes anywhere in templates: run `./bin/build-css.sh` and **commit the updated `static/css/main.css`**. Jekyll on `--watch` does not auto-rebuild Tailwind.
3. If you changed `_config.yml`: restart `bundle exec jekyll serve` to pick it up (`--watch` doesn't reload config).
4. For new posts: front matter has all four keys (`layout`, `title`, `date`, `category`); filename date matches front-matter date; the rendered file appears at `_site/<category>/<slug>.html`.
5. For UI changes: spot-check at mobile + desktop. Chrome headless on macOS has a ~500px minimum viewport floor — true 375px mobile needs to be verified in a real browser's responsive mode.
