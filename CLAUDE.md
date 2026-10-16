# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal bilingual (English / Japanese) portfolio site (`task4233.dev`) built on **VitePress 1.x**. Single-page portfolio (profile / links / employments / publications / awards / education / skills, etc.). Blog articles live in a separate site at `blog.task4233.dev` — they are linked from the top nav but are **not** part of this repo.

Content lives in `src/`; the production site is built into `docs/` and published to GitHub Pages via GitHub Actions on every push to `master`. The custom domain is configured by `src/public/CNAME` (copied into `docs/CNAME` at build time).

## Commands

```bash
corepack enable        # yarn 4 is provided via corepack
yarn install           # install dependencies
yarn dev               # local dev server on port 3030
yarn build             # production build into ../docs (relative to src/)
yarn preview           # serve the built site on port 3030
```

Node `>=22.18 <23` is required (`package.json` `engines`). Package manager is yarn 4 (`packageManager` field in `package.json`).

There is no test suite. CI workflows in `.github/workflows/`:
- `deploy.yml` — builds with VitePress and deploys `docs/` to GitHub Pages on push to `master`.
- `typos.yml` — runs `crate-ci/typos` against the whole repo using `.github/typos.toml` (note the `extend-exclude` list — add new files there if a legitimate term trips the spell checker).
- `i18n.yml` — runs `scripts/check-i18n-parity.mjs`, which fails when `src/*.md` and `src/ja/*.md` differ in heading order or in the number of top-level list items under each heading. Run it locally with `node scripts/check-i18n-parity.mjs`.
- `labeler.yml` — `srvaroa/labeler` auto-labels PRs by branch prefix: `feat/*` → feature, `fix/*` → bug, `chore/*` → chore (see `.github/labeler.yml`). Use these prefixes when creating branches.

## Content layout

- `src/index.md` — the entire portfolio page (English). Frontmatter disables sidebar/aside/outline (`sidebar: false`, `aside: false`, `outline: false`) to render as a single full-width page.
- `src/ja/` — Japanese pages (`/ja/`, `/ja/card`). **When editing `src/index.md` or `src/card.md`, update the `src/ja/` counterpart too.** Keep `##` headings in English so anchors (`#links`) match across locales. Use the original (Japanese) titles of books/talks from their link targets instead of translating the English titles.
- `adr/` — Architecture Decision Records (not published). Write a new ADR for decisions someone would later ask "why?" about; see `adr/README.md`. File names are kebab-case, matching the rest of the repo.
- `src/public/` — static assets served from site root (`CNAME`, `manifest.json`, favicons under `imgs/icons/`).
- `docs/` — build output. Git-ignored (`.gitignore`); CI builds it and uploads it as the Pages artifact. Do not hand-edit or commit it.

There is no `src/article/` or `src/tags/` directory — blog content was split out to a separate site during the VitePress migration.

## VitePress configuration

- `src/.vitepress/config.ts` is the single source of truth for site title, description, nav, GA tag, head metadata, and build destination (`outDir: '../docs'`). `locales` defines `root` (English, `en-US`) and `ja` (`/ja/`, `ja-JP`); each has its own `nav`, `description` and UI labels — update both when adding top-level pages.
- `transformPageData` sets `frontmatter.availableLocales`; `transformHead` emits per-page OGP and `hreflang`. A Vite alias swaps the default theme's internal `composables/langs` for `theme/locale-links.ts` so the language switcher hides locales without a counterpart page (ADR 0002). After a VitePress upgrade, check that a page without a counterpart in the other locale shows no language switcher.
- `src/.vitepress/theme/index.ts` re-exports the VitePress default theme; `theme/custom.css` adds project-specific overrides only:
  - H2 border restyled to match the old VuePress 1 look (`border-bottom` instead of default `border-top`).
  - Brand color variables (`--vp-c-brand-*`) set to `#1976D2` blues.
  - Wider content width on pages without an aside (`max-width: 80% !important`).
- `appearance: false` disables the light/dark toggle. The `.dark` variables in `custom.css` are therefore unreachable in the current setup.
- Google Analytics 4 is wired in via the standard gtag.js snippet in `config.ts` `head` (`GA_MEASUREMENT_ID`). The tags are emitted only when the ID is set and only in `vitepress build` (`NODE_ENV === 'production'`), so `yarn dev` sends nothing. SPA page transitions (including `/` ↔ `/ja/`) are counted by GA4 enhanced measurement ("page changes based on browser history events"), not by code here — keep that setting on in the GA4 data stream (ADR 0003).

## Dependencies

`.github/dependabot.yml` groups all npm updates into a single daily PR (`npm-all`) limited to one open PR. Stay on the VitePress 1.x line for now — VitePress 2 is not yet stable.
