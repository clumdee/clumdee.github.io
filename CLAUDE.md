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

Per-category images live in `<category>/img/` and are referenced as `{{ site.url }}/<category>/img/<filename>`. Shared assets live in `static/img/`, `static/css/`, `static/js/`.

## Layouts and includes

- `_layouts/base.html` — root wrapper.
- `_layouts/post.html` — used by every post. Includes the jumbotron, MathJax, and the live quote injector (calls `quoteslate.vercel.app`).
- `_layouts/base_coding.html`, `base_optics.html`, `base_random.html`, `base_talks.html` — category landing-page wrappers.
- `_includes/head.html` — meta, Bootstrap CDN, **Google Analytics `G-NG12M3TDGG`**, **Google Ads gtag `AW-16846140344`** with conversion event `AW-16846140344/itOgCOnf-r0aELjn7uA-`, **AdSense `ca-pub-1469161366135496`**.
- `_includes/navbar.html`, `footer.html`, `image.html`, `script.html` (quote fetcher), `script_drunkard2D.html` (one-off post script).

## Don't touch without intent

- **`_config.yml` `exclude:` block** — keeps `CLAUDE.md`, `.claude/`, `memory/`, `ONBOARDING.md`, `AGENTS.md`, etc. out of `_site/`. Don't shrink it; new Claude/agent files should be added here.
- **Analytics / Ads / AdSense IDs in `_includes/head.html`** — production live. Don't edit casually.
- **`ads.txt`** at repo root — ad-exchange authorization file (`google.com, pub-1469161366135496, DIRECT, …`). Leave alone unless asked.
- **`blog/<slug>/index.html` redirect stubs** — preserve URL history; don't delete.

## Conventions worth knowing

- MathJax loads globally on the `post` layout, so LaTeX works in posts out of the box.
- Some `optics/_posts/` entries embed `mybinder.org` launch buttons to companion notebooks on GitHub. Preserve those links when editing those posts.
- `wip/` and `_site/` are gitignored — scratch and build output.
- `.claude/` is also out of git globally (user's global gitignore).

## Before declaring a content change done

1. `bundle exec jekyll build` runs clean.
2. The new file appears at the expected path under `_site/<category>/<slug>.html`.
3. New posts have all four front-matter keys (`layout`, `title`, `date`, `category`) and the filename date matches the front-matter date.
