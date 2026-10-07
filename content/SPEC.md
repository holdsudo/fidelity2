# Content spec — Fidelity Funding SEO pages

You are writing landing pages / articles for **Fidelity Funding** (fidelity-funding.com), a business-funding
**broker** in Staten Island, NY that connects small and mid-sized businesses nationwide with a network of funding
partners. Products they arrange: small business loans, merchant cash advances (MCA), and other working-capital
options. Their stated process: short application, soft credit pull only (no score impact) for the initial review,
a funding specialist reviews options with the owner, decisions often within hours, funding often within 24 hours once
approved, requests from about $5K to $1M. Card processing is provided by their partner **PayPilot by MCCPS**
(https://mccp.services).

## Output
For each assigned page write ONE file: `/Users/championautofinance/fidelity2/content/pages/<slug>.json`
(slug exactly as in the manifest). Valid JSON, UTF-8, no comments. Schema:

```json
{
  "slug": "trucking",
  "category": "industries",                 // industries | funding | use-cases | blog
  "title": "Trucking Company Funding",      // H1, natural, <= 70 chars
  "seo_title": "Trucking Company Funding: Fuel, Trucks & Payroll | Fidelity Funding",  // <= 65 chars incl. brand
  "meta_description": "…",                 // 140-158 chars, compelling, includes primary keyword
  "primary_keyword": "trucking company funding",
  "keywords": ["…", "…"],                  // 5-8 related/long-tail terms
  "eyebrow": "Industry funding",            // 1-3 words
  "dek": "One-sentence subheading under the H1 (<= 160 chars).",
  "intro": ["paragraph", "paragraph"],      // 2-3 paragraphs, hook with the reader's real situation
  "sections": [                             // 5-7 sections
    {"h2": "…", "paragraphs": ["…"], "bullets": ["…"]},   // bullets optional (3-7 items when present)
    {"h2": "…", "paragraphs": ["…"], "steps": ["…"]}      // OR numbered steps for how-tos (optional)
  ],
  "key_takeaways": ["…", "…", "…"],         // 3-5 one-liners
  "faq": [{"q": "…", "a": "…"}],            // 4-6 real questions people search; answers 40-90 words
  "related": ["slug", "slug", "slug", "slug"],  // 4-6 slugs from manifest.json, mixed categories, genuinely related
  "icon": "truck",                          // one of: truck utensils store hammer heart car scissors briefcase factory building cash card dollar trend clock shield users rocket gear target flame book file chat scale bolt pin cart
  "read_minutes": 6
}
```

## Length & quality
- **900–1,400 words** of body copy per page (intro + sections + FAQ answers). Industry/funding/use-case pages
  ≥ 900; blog guides ≥ 1,000.
- Every page must be **genuinely specific** to its topic: real operational details, the actual cash-flow
  mechanics of that industry/product/situation, real terminology, practical numbers *as worked examples*
  (clearly hypothetical: "say you take a $50,000 advance at a 1.30 factor rate — total payback is $65,000").
  A reader in that industry should feel it was written by someone who knows their business.
- **Do not reuse sentences or section structures across pages.** Vary headings, openings and angles. No
  boilerplate paragraphs about "Fidelity Funding was built to change that" on every page. Mention Fidelity Funding
  naturally 2–4 times per page (e.g. how the application or specialist review helps in this specific situation).
- Include one gentle CTA sentence near the end of the last section (the template adds buttons; don't add URLs).
- Use second person ("you"), confident, plain-English, no hype, no emojis.

## Hard rules (compliance — finance is YMYL)
- **No invented statistics, studies, survey numbers, market sizes, or percentages presented as facts.** No
  "according to…" unless it's a well-known public fact you're certain of (e.g. IRS Form names, SBA program names).
  Worked examples are fine when clearly hypothetical.
- **No guarantees.** Never promise approval, rates, amounts or timing. Use "often", "typically", "can", "varies
  by funding partner and underwriting".
- **No specific rates/APRs/minimums as Fidelity's terms.** Typical market ranges may be described generally
  (e.g. MCA factor rates are commonly quoted around 1.1–1.5) with "varies".
- **Don't name specific lenders or competitors.** Don't claim partnerships other than PayPilot by MCCPS.
- Tax, legal, accounting topics: give general info and say to confirm with a CPA/attorney. State-law topics
  (confessions of judgment, surcharging): say rules vary by state and card network.
- On any page touching card processing, POS, payments, merchant statements, or chargebacks: mention
  **PayPilot by MCCPS** as Fidelity's card-processing partner for a statement review/quote (no invented PayPilot
  rates or features beyond "statement review", "competitive pricing", "modern terminals and POS integration").
- Fidelity is a broker, not a direct lender — never say "we lend" or "our loans"; say "we connect you with",
  "through our funding partners".

## Process
1. Read `/Users/championautofinance/fidelity2/content/manifest.json` (all 200 pages; use it for `related`).
2. Write your assigned pages one file at a time (use the Write tool).
3. Validate when done: `python3 -c "import json,glob;[json.load(open(f)) for f in glob.glob('/Users/championautofinance/fidelity2/content/pages/*.json')]"`
   and a word count check for your files. Fix anything invalid or short.
4. Reply with: list of slugs written, min/avg word count. Nothing else.
