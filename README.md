# Fidelity Funding v2 — fidelity2.joe-miz.com

SEO-first rebuild of fidelity-funding.com. Static site (no frameworks) on GitHub Pages (`main` → `/docs`).

## Build
    python3 build.py      # src/ + content/ -> docs/
    cd docs && python3 -m http.server 8766

## What's here
- **200 SEO pages** as data in `content/pages/<slug>.json` (50 industries, 30 funding options, 30 use cases,
  90 blog guides). Master list: `content/manifest.py`; writing rules: `content/SPEC.md`. `build.py` renders each
  with breadcrumbs, TOC, key takeaways, mid-article CTA, FAQ, related links, an industry estimator, and JSON-LD
  (BreadcrumbList, FAQPage, Article/WebPage). Hubs at `/industries/ /funding/ /use-cases/ /blog/` with filters,
  search and pagination.
- **Tools:** funding calculator (payback + APR-equivalent), offer comparison, 60-second match quiz, card-processing
  fee check; glossary (`content/glossary.json`, DefinedTermSet schema).
- **PayPilot by MCCPS** (https://mccp.services) is the card-processing partner: `/card-processing/`, homepage block,
  footer strip, mega menu, and auto-linked mentions inside articles.
- **SEO plumbing:** sitemap index (per-section sitemaps), robots.txt, RSS (`/blog/feed.xml`), `llms.txt`,
  canonical/OG/Twitter tags, per-section OG images, search index (`/search-index.json`), WebSite SearchAction.
- **UX:** dark mode, mega menu, ⌘K search over every page, AI assistant (local knowledge base + site search),
  scroll story, speculation-rules prerender, view transitions, offline service worker.

## Not wired to a backend (by design)
Application, contact/careers/newsletter forms and the assistant run front-end only. See v1 README notes.
