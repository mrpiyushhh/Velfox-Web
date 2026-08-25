# Velfox — Site Content Brief

A map of every section on the site and the content each one needs. This is a
**brief, not the copy** — it defines what has to be written, how long it should
be, and where it comes from. Final wording is written separately.

Files covered: `Velfox/index.html`, `Velfox/products.html`, `Velfox/newsletter.html`.

**Status key**
- `DRAFT` — real copy is in place, may need a review pass
- `PLACEHOLDER` — visible dummy text that must be replaced before launch
- `MISSING` — asset or link the layout expects and doesn't have yet

---

## 0. Global (all pages)

### Navigation bar
Status: `DRAFT`

| Item | Needs |
| --- | --- |
| Brand | Final lockup — decide between "VelFox Technology" (nav) and "Velfox" (footer/products). Currently inconsistent across pages. |
| Links | Home, About, Services, How We Work, Products, Newsletter — confirm this is the final IA and order |
| "Sign in" | Decide whether this ships in v1. If yes, it needs a destination (client portal? none exists yet) |
| Primary CTA | One CTA label used sitewide — currently "Book a Discovery Call" |

### Footer
Status: `DRAFT` · `MISSING` links

Needs: brand line + one-sentence descriptor, column headings (Site / More / Contact),
contact email, LinkedIn URL (currently the generic `https://linkedin.com`),
copyright line, and a decision on whether legal pages (Privacy, Terms) are required.

### Chat widget
Status: `PLACEHOLDER`

Needs: assistant display name, availability line ("Usually replies instantly" —
only true if it is), a greeting message, 3–5 suggested starter prompts, and the
fallback text for when nobody is available.

---

## 1. Home — `index.html`

### 1.1 Hero (`#top`)
Status: `DRAFT`

- Eyebrow — category label, 3–5 words
- Headline — one line, with the emphasised phrase marked
- Subhead — 2 sentences max; must say what Velfox does and for whom
- Two CTAs — primary (book) + secondary (explore services)
- Visual: animated orb, no copy needed

### 1.2 About (`#about`)
Status: `DRAFT`

- Section eyebrow + headline (one sentence, positioning statement)
- Body — 2 short paragraphs: what kind of firm this is, and how the work is done
- Four pillar cards, each: verb label (Integrate / Automate / Build / Validate),
  a short object phrase, and one supporting sentence (≤ 20 words)

### 1.3 Services (`#services`)
Status: `DRAFT`

- Eyebrow, headline, one-sentence intro explaining the areas combine
- Four service cards — AI Integrations & Automation, AI Vision, Web Applications,
  Mobile Applications. Each needs: tag label, title, 4 capability bullets
  (noun phrases, ≤ 6 words each), and a "Learn more" destination.
- **Open:** "Learn more" has no target. Either write four service detail pages
  or drop the link.

### 1.4 How We Work (`#how-we-work`)
Status: `DRAFT`

- Eyebrow, headline, one-sentence intro
- Seven numbered stages (Discovery Call → Go-Live), each: title (2–4 words) and
  one sentence on what happens
- **Consider adding:** typical duration per stage, and what the client receives
  at each one — the most common question this section gets asked

### 1.5 CTA band
Status: `DRAFT` — one line + two buttons

### 1.6 Contact (`#contact`)
Status: `DRAFT` · `MISSING` behaviour

- Eyebrow + headline
- Form fields: Name*, Company, Work email*, Phone, "What can we help you with?"
  (five options matching the service areas + "Not sure yet"), Project details
- Each field needs a label and placeholder; required fields must be marked
- Submit button label
- **MISSING:** success message, per-field validation errors, and a privacy/consent
  line. There is also no form endpoint — where do submissions go?
- Side panel: booking-link CTA with a one-line description, direct email,
  LinkedIn. **MISSING:** the actual scheduling URL.

---

## 2. Products — `products.html`

### 2.1 Page hero
Status: `DRAFT` — eyebrow, headline, one-paragraph intro

### 2.2 Product blocks (×3)
Status: `PLACEHOLDER` — **highest-priority gap on the site**

Every block still says "Product Name" and "Replace this block with your product's
real story". Each of the three needs:

- Real product name
- Category label (AI Vision / Web Application / Mobile Application)
- 3 short tags (domain, technique, constraint)
- **The problem** — 1–2 sentences on the situation before
- **What it does** — 2–3 sentences: daily use, who uses it, what changed after launch
- **Key features** — one sentence listing 3–4 capabilities
- Screenshot or demo video, 4:3 (`MISSING` — placeholder box is showing)
- Two links: "View demo" and "Visit product site" (both currently `#`) — remove
  either if it doesn't exist for that product
- **Needed per product:** client permission to name them, or an agreed anonymised
  framing ("a mid-size manufacturer")

### 2.3 CTA band
Status: `DRAFT`

---

## 3. Newsletter — `newsletter.html`

### 3.1 Hero + signup
Status: `DRAFT` · `MISSING` behaviour

- Publication name, headline, one-paragraph description of what subscribers get
  and how often
- Email field placeholder, subscribe button, reassurance line under the form
- **MISSING:** confirmation state, error state, and the email service this posts
  to. No endpoint is wired up.

### 3.2 Past issues
Status: `PLACEHOLDER`

Three sample issues are listed (Aug/Jul/Jun 2026) with `#` links. Needs either
real published issues — date, category tag, title, one-line summary, working link —
or the section hidden until the first issue ships.

### 3.3 CTA band
Status: `DRAFT`

---

## Priorities

1. Real product stories + screenshots on `products.html` — the only fully dummy content
2. Working destinations: booking URL, form endpoint, newsletter endpoint, LinkedIn
3. Decide on "Learn more" service pages and the "Sign in" link
4. Newsletter archive — real issues or hide the section
5. Consistent brand name, chat widget copy, legal pages
