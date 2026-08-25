# Velfox — Website Copy Deck

Final site copy, written to the brief in `CONTENT.md` and fitted to the live layout in `Velfox/index.html`, `Velfox/products.html`, and `Velfox/newsletter.html`.

This is the copy. Paste it. Do not rewrite it in the templates.

**Voice:** Calm, specific, unhurried. We sound like the team that ships the system, not the team that sells the slide. Short sentences. Concrete nouns. No “unlock,” “leverage,” “cutting-edge,” “next-gen,” or “transform.” Address the operator who already knows AI should be doing more, and is tired of being pitched.

**You / we.** Never “Velfox helps businesses to…” in body copy if “we” will do. Name the company in the hero, the footer, and metadata. After that, talk like people.

---

## Decisions (so the copy is consistent)

These were open in the brief. The copy below assumes the following. Change the decision, change the line — don’t leave both versions on the page.

| Item | Decision | Why |
| --- | --- | --- |
| Brand in running copy | **Velfox** | One word, one capital. Use this in sentences, titles, copyright, and metadata. |
| Brand on the mark | **VelFox** | Wordmark only — the camel-case lockup next to the icon. |
| Legal / long form | **VelFox Technology** | Contracts, invoices, footer small print if legal needs the full name. Do not put this in headlines. |
| Nav wordmark | `VelFox` | “VelFox Technology” is too long at small sizes and fights the primary CTA. The mark already says who it is. |
| Primary CTA, sitewide | **Book a Discovery Call** | Specific, matches stage 01, not “Get started.” |
| “Sign in” | **Remove for v1** | There is no portal. A Sign in button that goes to a contact form is a broken promise. If a second nav button is required, use **Contact**. |
| Service “Learn more” | Keep the link. Label: **See related work** → `products.html` | No service detail pages exist. Don’t invent four more URLs. Point at shipped work. |
| Product names | Anonymised working titles (LineSight, Clearspan, Groundday) | Highest-priority gap. These read as real products without naming a client. Swap the title if a client allows it; keep the story. |
| Product links | One button: **Request a walkthrough** → `#contact`. Drop “Visit product site” until a URL exists. | Dead `#` links look unfinished. |
| Newsletter archive | Hide the issue list until an issue has shipped. Empty-state copy is below. | Dummy Aug/Jul/Jun 2026 issues will date the site on day one. |
| Chat availability | **Replies instantly** | True for the on-page assistant. Don’t say “usually” — it hedges a bot. |
| Legal | Add **Privacy** in the footer once the contact or newsletter form posts anywhere. Terms can wait. | Collecting work emails without a privacy line is the one legal miss worth fixing at launch. |
| LinkedIn | Keep the label. Swap the href when the company page URL is in hand. | Copy is done. The URL is not. |

---

## 0. Global

### SEO & social (per page)

**Home — `index.html`**
- Title: `Velfox — AI that does real work`
- Meta description: `We integrate AI into the systems you already run, automate the work still done by hand, and ship the web and mobile products that carry it — from first proof to production.`
- OG title: `Velfox — AI that does real work`
- OG description: `Applied AI and product engineering. Integrated into what you already run. Handed over to your team.`

**Products — `products.html`**
- Title: `What we’ve shipped — Velfox`
- Meta description: `Shipped systems, not capability slides. Computer vision on the line, operations in one dashboard, field work captured on the phone.`
- OG title: `What we’ve shipped — Velfox`
- OG description: `Real problems, real users, real technology underneath.`

**Newsletter — `newsletter.html`**
- Title: `The Velfox Signal — applied AI, without the hype`
- Meta description: `Short, practical notes on applied AI, automation, and what we’re shipping. Sent when there’s something worth saying — not because a calendar said so.`
- OG title: `The Velfox Signal`
- OG description: `Applied AI and automation, without the hype.`

---

### Navigation

**Wordmark:** VelFox

**Links (final IA, this order):**
1. Home → `index.html#top`
2. About → `index.html#about`
3. Services → `index.html#services`
4. How We Work → `index.html#how-we-work`
5. Products → `products.html`
6. Newsletter → `newsletter.html`

**Secondary (ghost, optional):** Contact → `index.html#contact`
Do not ship “Sign in.”

**Primary CTA:** Book a Discovery Call → `index.html#contact`

**Mobile toggle (aria-label):** Open menu / Close menu

---

### Footer

**Wordmark:** VelFox

**Descriptor (one sentence):**
Applied AI and product engineering — built into what you already run, and handed over to your team.

**Column: Site**
- Home
- About
- Services
- How We Work

**Column: More**
- Products
- Newsletter
- Book a Discovery Call

**Column: Contact**
- hello@velfox.com
- LinkedIn

**Copyright:** © 2026 Velfox. All rights reserved.

**Social row:** LinkedIn · Email

**Add when forms go live:** Privacy (link)

---

### Chat widget (all pages)

The strings live in `main.js` as well as the panel markup. Keep them in lockstep.

**Launcher aria-label:** Open Velfox assistant

**Display name:** Velfox Assistant

**Availability line:** Replies instantly

**Input placeholder:** Ask about our services…

**Greeting:**
Hi — I’m the Velfox assistant. I can tell you what we build, how a project runs, or get you to a Discovery Call.

**Starter prompts (4):**
1. What does Velfox do?
2. Do you build proofs of concept?
3. How does a project start?
4. What have you shipped?

**Fallback (when the question is outside the script):**
That’s a better question for the team than for this window. Book a Discovery Call and you’ll get a straight answer.

**Offline / nobody available (if the widget is ever unmanned):**
The assistant is offline just now. Email hello@velfox.com or book a Discovery Call — we reply within 24 hours.

**Suggested bot answers (keep the current knowledge-base tone; tighter wording):**

| Trigger | Reply |
| --- | --- |
| Services / what you do | Four areas, one team: AI Integrations & Automation, AI Vision, Web Applications, and Mobile Applications. Most work cuts across more than one. Which is closest to what you need? |
| Automation / workflow | We wire AI into the systems you already run and take the manual steps out of the loop — agents, internal tools, and process work, not a chatbot bolted onto the homepage. |
| Vision | Computer vision, image and video analysis, object detection, visual inspection, and monitoring that flags a problem before a person has to go looking. |
| Web | Custom web apps, SaaS products, dashboards, APIs, and integrations — with AI only where it earns its place. |
| Mobile | iOS, Android, and cross-platform. Built for people doing the work, including offline. |
| POC / prototype | Yes. We prove the risky assumption first, then you decide whether full scope is worth it. |
| Price / cost | It depends on scope. Fastest path to a real number: a Discovery Call, then an estimate within 24 hours. |
| Timeline | You’ll get a proposal with timeline and effort before anything starts. Nothing is open-ended. |
| How to start | Discovery Call, then scope, then a proposal, then kick-off. Always in that order. |
| Products | The Products page is the shipped work — not a list of things we could build. |
| Newsletter | The Velfox Signal — applied AI, without the hype. Subscribe on the Newsletter page. |
| Contact | Book a Discovery Call, or send the form. We reply within 24 hours. |
| Hello | Hi. Ask me about the work, the process, or how to start. |

---

## 1. Home — `index.html`

### 1.1 Hero (`#top`)

Fits `.hero-copy h1` at `max-width: 14ch`. Keep the line break inside the emphasised phrase so the gradient sits on its own line next to the orb.

**Eyebrow:** Applied AI & Product Engineering

**Headline (HTML):**
```html
<h1>AI that does <em>real work</em>.</h1>
```

**Subhead (2 sentences):**
We integrate AI into the systems you already run, automate the work still done by hand, and ship the web and mobile products that carry it. First we prove it. Then we put it in production.

**Primary CTA:** Book a Discovery Call → `#contact`
**Secondary CTA:** Explore Our Services → `#services`

**Scroll cue:** Scroll

---

### 1.2 Capability strip

Marquee under the hero. Keep items short — they read as a ticker, not a sentence.

- AI Integration
- Process Automation
- Computer Vision
- Intelligent Agents
- SaaS Platforms
- Business Dashboards
- API Engineering
- iOS & Android
- Proof-of-Concept Builds

---

### 1.3 About (`#about`)

`.about-copy h2` is `max-width: 17ch` — this headline is written to stack, not to sit on one line. Body is two short paragraphs at `max-width: 48ch`.

**Eyebrow:** About Velfox

**Headline:**
Built for teams who want AI to do real work, not sit in a deck.

**Paragraph 1:**
Velfox is a product engineering studio. We work with businesses that know AI should be doing more than a chatbot on the homepage — and we get them there without betting the whole roadmap on it.

**Paragraph 2:**
That means going into the stack you already run, finding where automation and intelligence actually move the needle, and building it properly: tested, integrated, and owned by your team when we leave.

**Signature (two lines, mono):**
Product engineering
for applied AI

#### Pillars

Verb labels stay as designed (`Integrate / Automate / Build / Validate`). Object phrases are short. Supporting line is ≤ 20 words.

**Integrate**
- Object: AI into existing systems
- Support: No rip-and-replace. We build into the stack you already depend on.

**Automate**
- Object: Manual, repetitive processes
- Support: The work your team shouldn’t still be doing by hand.

**Build**
- Object: Intelligent applications
- Support: Web and mobile products with AI in the workflow, not bolted on after.

**Validate**
- Object: Ideas through real POCs
- Support: Prove the risky assumption first. Commit to full scope only when it holds.

#### Stats band

These are structural facts about how we work — not invented social proof. Do not replace them with “50+ clients” or “99% satisfaction.”

| Number | Label |
| --- | --- |
| 4 | Disciplines, one team — not four vendors |
| 7 | Defined stages from first call to go-live |
| 24h | Estimate turnaround once scope is agreed |
| 100% | Handover — the system ships owned by you |

---

### 1.4 Services (`#services`)

`.head-split h2` is `max-width: 18ch`. Intro sits opposite, one sentence. Each card: tag, title, lead, four noun-phrase bullets (≤ 6 words), link.

**Eyebrow:** What We Do

**Headline (HTML):**
```html
<h2>Four areas. <span class="grad">One team.</span></h2>
```

**Intro:**
Most engagements touch more than one of these. They’re built to work together, not sold as four separate products.

---

**Card 1**
- Tag: AI · OPS
- Title: AI Integrations & Automation
- Lead: We plug intelligence into the systems you already depend on, then take the manual steps out of the loop.
- Bullets:
  - Existing-system AI integration
  - Workflow and process automation
  - Intelligent agents, internal tools
  - Process design and optimisation
- Link: See related work → `products.html`

**Card 2**
- Tag: AI · VISION
- Title: AI Vision Solutions
- Lead: Systems that see what’s happening — on a line, on a site, on a feed — and flag it before a person has to.
- Bullets:
  - Computer vision, image analysis
  - Video analysis, object detection
  - Production-line visual inspection
  - Continuous AI-powered monitoring
- Link: See related work → `products.html`

**Card 3**
- Tag: WEB
- Title: Web Applications & Solutions
- Lead: The platforms, dashboards, and APIs your operation runs on — with AI only where it earns its place.
- Bullets:
  - Custom web apps and SaaS
  - Operational business dashboards
  - APIs and system integrations
  - AI-powered web experiences
- Link: See related work → `products.html`

**Card 4**
- Tag: MOBILE
- Title: Mobile Applications
- Lead: Apps for the people doing the work — in the field, on the floor, and offline when they have to be.
- Bullets:
  - Native iOS and Android
  - Cross-platform mobile builds
  - AI-powered mobile workflows
  - Offline-capable field tools
- Link: See related work → `products.html`

---

### 1.5 How We Work (`#how-we-work`)

Seven numbered stages, always this order. Each step: title (2–4 words), one sentence, meta line = typical duration · what they leave with. The meta is the question this section always gets; don’t drop it.

**Eyebrow:** How We Work

**Headline:** A structured path from first call to go-live.

**Intro:** Seven stages, always in this order — so you know exactly where the work stands.

**01 — Discovery Call**
We start with the business, the constraint, what “done” looks like, and whether we’re the right team.
Meta: 30 minutes · call notes

**02 — Scope & Effort Estimation**
We set the technical approach, the boundaries, the timeline, and the effort it actually takes.
Meta: Within 24 hours · effort range

**03 — Proposal & Sign-Off**
You get the solution, the deliverables, and the commercials — then we agree, in writing.
Meta: Fixed scope · signed proposal

**04 — Project Kick-Off**
Teams meet, requirements lock, milestones get dates, and the build clock starts.
Meta: Week one · milestone plan

**05 — Development**
We design, build, integrate, and test in the open. You see working software, not a big reveal.
Meta: In increments · you stay in the loop

**06 — UAT & Handover**
Your team runs acceptance, we fold in the feedback, and we hand over the keys.
Meta: Your testers · ownership pack

**07 — Go-Live**
The system goes to production. We stay close for the cutover. Operations takes it from there.
Meta: In production · hypercare window

---

### 1.6 Home CTA band

`.cta-band h2` is `max-width: 20ch`. One line of intent, one line of relief, two buttons.

**Headline:** Have a system in mind?

**Support:** Bring the problem, not a spec. We’ll tell you what it takes to build — and whether it’s worth building.

**Primary:** Book a Discovery Call → `#contact`
**Secondary:** See what we’ve built → `products.html`

---

### 1.7 Contact (`#contact`)

**Eyebrow:** Get In Touch

**Headline:** Tell us what you’re trying to build.

#### Form

Mark required fields with an asterisk in the label. Keep `novalidate` off in production once real validation is wired; until then the copy below is what the UI should say.

| Field | Label | Placeholder | Required | Error |
| --- | --- | --- | --- | --- |
| Name | Name * | Your full name | Yes | Enter your name. |
| Company | Company | Company name | No | — |
| Work email | Work email * | you@company.com | Yes | Enter a work email we can reply to. |
| Phone | Phone | +1 234 567 8900 | No | Enter a valid phone number. |
| Topic | What can we help you with? * | — | Yes | Choose the closest option. |
| Details | Project details | A few lines on what you’re trying to solve — systems, users, constraints. | No | — |

**Topic options (this order):**
1. Select one *(disabled default, value empty)*
2. AI Integrations & Automation
3. AI Vision Solutions
4. Web Applications
5. Mobile Applications
6. Not sure yet

**Submit (default):** Send & book a call
**Submit (pending):** Sending…
**Submit (success, on-button):** Sent — we’ll be in touch

**Success message (show above the form, don’t rely on the button alone):**
Got it. We’ll reply within 24 hours — usually with a time to talk.

**Generic form error:**
Something didn’t send. Try again, or email hello@velfox.com.

**Consent line (under the button):**
By sending this, you agree we can use these details to reply to this enquiry. We don’t sell them or add you to a sequence.

**Privacy note (keep, shorter than the consent line if both won’t fit):**
No sales sequence. Your details are only used to reply.

**Production note:** There is still no form endpoint. The copy is ready. The form is not live until it posts somewhere.

#### Side panel

**Card 1 — booking**
- Badge: Replies within 24h
- Title: Book a Discovery Call
- Body: 30 minutes on the problem — no deck, no pitch. You’ll leave knowing whether we’re the right fit.
- Button: Book now → `#contact-form` *(replace href with the scheduling URL when it exists)*

**Card 2 — direct**
- Eyebrow: Direct
- hello@velfox.com
- LinkedIn — Velfox

**Card 3 — newsletter**
- Eyebrow: Not ready yet?
- Title: Read first, talk later
- Body: The Velfox Signal is applied AI without the hype — sent only when there’s something worth saying.
- Link: Go to the newsletter → `newsletter.html`

---

## 2. Products — `products.html`

Highest-priority gap. The three blocks below are anonymised on purpose. They are written as shipped work, not as “we could build this.” If a client permits a name, replace the title and the “a mid-size…” framing. Do not invent metrics.

Screenshots are still missing. Until a 4:3 still or demo is in the media well, use the caption as the accessible name of the asset, not as on-page body copy.

### 2.1 Page hero

**Eyebrow:** Products

**Headline (HTML):**
```html
<h1>What we've <span class="grad">actually built</span>.</h1>
```

**Intro:**
Capability slides are easy. These are shipped — real problems, real users, real technology underneath. Each one started as the kind of conversation you’d have on a Discovery Call.

### 2.2 Capability strip

- Computer Vision
- Real-time Detection
- Operations Dashboards
- API Integrations
- Offline-first Mobile
- Role-based Access
- Automated Reporting
- AI-assisted Workflows

---

### 2.3 Product 1 — LineSight

Category matches the AI Vision service card. Tags: domain, technique, constraint.

**Category eyebrow:** AI Vision

**Name:** LineSight — Visual Inspection Platform

**Tags:** Manufacturing · Computer Vision · Real-time

**The problem:**
On a mid-size manufacturer’s line, quality still depended on a person with a torch and a clipboard. Checks were slow, they drifted between shifts, and the defects that only showed under load often left the floor.

**What it does:**
LineSight watches the line in real time. Operators see a flagged item as it happens; quality leads review a queue instead of walking the floor after the fact. Inspection rules belong to the plant — they change them without waiting on a release.

**Key features:**
Real-time defect detection, configurable inspection rules, shift alerting, and a review dashboard for flagged items.

**Media caption / alt:** LineSight — live inspection view with a flagged unit on the line, 4:3

**Primary action:** Request a walkthrough → `index.html#contact`
**Secondary:** omit until a product URL exists

---

### 2.4 Product 2 — Clearspan

**Category eyebrow:** Web Application

**Name:** Clearspan — Operations Dashboard

**Tags:** Operations · Dashboards · API

**The problem:**
A multi-site operator was running the business from four tools and a weekly spreadsheet. Nobody had one picture of the day, so decisions waited on someone to stitch the numbers together.

**What it does:**
Clearspan pulls those sources into a single operations dashboard. Site managers start the morning in one place; leadership sees the same numbers without a Friday scramble. Access is role-based, so people see what they need and nothing they don’t.

**Key features:**
Unified reporting, role-based access, automated sync via API, and exportable reports.

**Media caption / alt:** Clearspan — operations dashboard with site-level KPIs, 4:3

**Primary action:** Request a walkthrough → `index.html#contact`
**Secondary:** omit until a product URL exists

---

### 2.5 Product 3 — Groundday

**Category eyebrow:** Mobile Application

**Name:** Groundday — Field Ops App

**Tags:** Field ops · Offline-first · AI-assisted

**The problem:**
A distributed field team filled paper forms that took days to reach the office. By the time the record landed, the job had moved on and the data was already wrong.

**What it does:**
Groundday is the app in the van and on the site. Crews capture the job while they’re standing in it — including offline — and it syncs when the signal comes back. Supervisors see progress the same day, not the following week.

**Key features:**
Offline data capture, automatic sync, AI-assisted form completion, and manager-facing reporting.

**Media caption / alt:** Groundday — field form on a phone, offline badge visible, 4:3

**Primary action:** Request a walkthrough → `index.html#contact`
**Secondary:** omit until a product URL exists

---

### 2.6 Products CTA band

**Headline:** Building something similar?

**Support:** Most of these started as a rough problem, not a spec. Bring yours and we’ll scope it.

**Primary:** Book a Discovery Call → `index.html#contact`
**Secondary:** See our services → `index.html#services`

---

## 3. Newsletter — `newsletter.html`

Publication name is **The Velfox Signal**. Use it as the eyebrow, in the contact-side card, and in metadata. Don’t also call it “the Velfox newsletter” on the same page.

### 3.1 Hero + signup

Centered, `max-width: 620px`. Headline uses the gradient span.

**Eyebrow / publication:** The Velfox Signal

**Headline (HTML):**
```html
<h1>AI &amp; technology, <span class="grad">without the hype</span>.</h1>
```

**Description:**
Short, practical notes on applied AI, automation, and what we’re shipping. Sent when there’s something worth saying — not because a calendar said so.

**Email placeholder:** you@company.com
**Email aria-label:** Email address
**Button (default):** Subscribe
**Button (success):** Subscribed
**Reassurance:** One email at a time. Unsubscribe whenever you want.

**Confirmation (after a real subscribe):**
You’re in. The next issue goes to this inbox — nothing else will.

**Error (invalid email):** Enter a real email address.
**Error (service down):** We couldn’t add you just now. Try again, or email hello@velfox.com.

**Production note:** No email service is wired. Don’t launch the form until it posts to one. The confirmation state above is what the UI should show when it is.

---

### 3.2 What you get

This block exists in the layout and should stay. Two cards, same service-card pattern as Home.

**Card 1**
- Tag: SIGNAL
- Title: What actually shipped
- Lead: Notes from real builds — what worked, what we’d do differently, and which AI ideas didn’t survive contact with production.

**Card 2**
- Tag: NO HYPE
- Title: Where the tech is genuinely ready
- Lead: Which capabilities are cheap and reliable enough to build on this quarter — and which are still a demo wearing a product’s clothes.

---

### 3.3 Past issues

**Do not ship the three dummy issues.** Hide `.issue-list` until an issue has a working URL.

**Section eyebrow:** Archive
**Headline:** Past issues
**Intro (when issues exist):** Everything we’ve sent. No gate, no email required to read.
**Empty state (until then):**
No issues in the archive yet. The first one goes to subscribers first — then it lives here, ungated.

**When you do publish, each row is:** date · category tag · title · one-line summary · Read.

First-issue backlog (write the issue, then unhide the row — do not link to `#`):

**Issue A**
- Date: [publish date]
- Tag: PRODUCT
- Title: What we learned shipping three POCs in one quarter
- Summary: The pattern behind which AI ideas turn into products — and which quietly don’t.
- Link: [issue URL]

**Issue B**
- Date: [publish date]
- Tag: INDUSTRY
- Title: Computer vision is getting cheap enough to matter
- Summary: Where visual inspection now makes sense for mid-size operations, not just enterprise.
- Link: [issue URL]

**Issue C**
- Date: [publish date]
- Tag: COMPANY
- Title: Why we scope every project before we estimate it
- Summary: The 24-hour rule, and why it protects both sides of a build.
- Link: [issue URL]

---

### 3.4 Newsletter CTA band

**Headline:** Prefer to just talk it through?

**Support:** Skip the reading list. Thirty minutes on a call usually gets further.

**Primary:** Book a Discovery Call → `index.html#contact`

---

## Microcopy checklist (easy to miss)

| Location | Copy |
| --- | --- |
| Back-to-top button | aria-label: Back to top |
| Chat launcher | aria-label: Open Velfox assistant |
| Nav toggle | aria-label: Open menu |
| Hero orb canvas | Decorative — no copy. Keep `aria-hidden` on the brand mark SVGs as now. |
| Product media (empty) | Visible fallback: Screenshot coming — 4:3. Don’t leave “Product screenshot / demo — 4:3” in production; it reads as a spec note. |
| 404 (if added later) | Headline: This page isn’t here. Support: The work is on the home page. Button: Back to Velfox |

---

## CTA map (one job per button)

Use these labels everywhere. Don’t invent a fourth.

| Job | Label | Goes to |
| --- | --- | --- |
| Primary commercial action | Book a Discovery Call | Contact / scheduler |
| Secondary on Home hero | Explore Our Services | `#services` |
| Secondary on Home CTA | See what we’ve built | `products.html` |
| Service cards | See related work | `products.html` |
| Product blocks | Request a walkthrough | Contact |
| Newsletter | Subscribe | Form submit |
| Contact form | Send & book a call | Form submit |
| Contact side | Book now | Form or scheduler |
| Soft opt-out | Go to the newsletter | `newsletter.html` |

---

## Still missing after this deck (not copy)

Copy cannot invent these. They are launch blockers, not wording problems.

1. Real 4:3 screenshots or demo stills for LineSight, Clearspan, Groundday
2. Scheduling URL for the Discovery Call
3. Contact form endpoint
4. Newsletter provider and endpoint
5. Company LinkedIn URL
6. Client permission if any product should use a real name
7. Privacy page, once either form actually collects an email
8. First newsletter issue — or keep the archive hidden

Until 2–4 exist, every “book” and “subscribe” action is theatre. The words are ready. The pipes are not.
