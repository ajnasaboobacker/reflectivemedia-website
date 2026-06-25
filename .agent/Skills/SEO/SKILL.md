---
name: seo-audit-and-optimization
description: Comprehensive framework for auditing, diagnosing, and improving any website's organic search (SEO) performance, and for benchmarking it against competitors. Use this skill whenever the user asks to analyze, audit, or improve SEO for a website, compare a site against competitors for search rankings, diagnose why a site isn't ranking on Google, or wants guidance on technical SEO (crawlability, indexing, rendering, Core Web Vitals, schema markup, meta tags, backlinks). Always use this skill when the user is building or maintaining a website — especially a React/Next.js/Vue/Angular single-page app — and asks about making the site "crawlable," "indexable," "SEO-friendly," or wants server-side rendering (SSR), static generation (SSG), or pre-rendering configured for Google. Trigger even if the user just shares a URL and asks "why does this rank" or "what's wrong with my SEO."
---

# SEO Audit & Optimization

A site-agnostic playbook for diagnosing why a website does or doesn't rank, and for fixing it. Works for any vertical (e-commerce, finance, local business, SaaS, content sites). Includes a dedicated section for implementing proper server-side rendering in Next.js, since JS-framework rendering issues are the single most common silent killer of SEO.

## Core philosophy: audit in this order, not randomly

Ranking differences almost always trace back to four layers, and they have a strict dependency order:

1. **Can search engines actually read the page?** (crawlability/rendering)
2. **Does the page target the right query with real depth?** (on-page + content)
3. **Does the rest of the web vouch for the domain?** (authority/backlinks/citations)
4. **Is the technical foundation solid?** (speed, mobile, security, schema)

Fixing #2–#4 is wasted effort if #1 fails — a beautifully optimized page that Google can't read ranks nowhere. Always check #1 first, and lead with it in any audit you deliver.

---

## Step 1 — Crawlability & Rendering Audit (always do this first)

This is the highest-leverage check in any audit. Most failures here are invisible to the human eye (the browser renders fine) but fatal to search engines.

**How to check it:**
- Fetch the page's **raw HTML** (not the browser-rendered DOM) — via `web_fetch`, `curl`, or "View Page Source" (Ctrl+U), never just DevTools' Elements panel (that shows post-JS DOM).
- Look at what's actually in the raw response for: `<title>`, `<meta name="description">`, and the main content of `<body>`.

**Red flags that mean the site is invisible to crawlers / link previews:**
- The same generic `<title>` and `<meta description>` on every page (e.g., just the brand name)
- Raw HTML body contains placeholder text like `"You need to enable JavaScript to run this app"` or an empty `<div id="root"></div>`
- Content only appears after API calls fire client-side
- `site:domain.com` in Google returns far fewer pages than the site actually has

**Other crawlability checks:**
- `robots.txt` exists and isn't accidentally blocking important paths (`Disallow: /`)
- `sitemap.xml` exists, is referenced in `robots.txt`, and lists real, current URLs
- Canonical tags point to the correct self-referencing URL (not duplicated/looping)
- If the user has Google Search Console access, use **URL Inspection → Tested Live URL → View Crawled Page** — this shows exactly what Googlebot received. This is the ground-truth check; recommend it whenever available.

**If the site is a JS framework (React/Vue/Angular/Next.js/etc.) and fails this check** — flag it as the #1 priority, above everything else, and jump to the **Next.js Rendering** section below (or the equivalent for other frameworks: Nuxt for Vue, Angular Universal for Angular).

---

## Step 2 — On-Page SEO Checklist

Run this per important page (homepage, category pages, product/service pages):

- **Title tag**: unique per page, ~50–60 characters, primary keyword near the front, brand at the end (e.g., `Buy Gold Bars Online Dubai | 24K Bullion | BrandName`)
- **Meta description**: unique per page, ~150–160 characters, includes the target keyword + a reason to click
- **One `<h1>` per page**, logical `<h2>`/`<h3>` hierarchy below it (don't skip levels, don't use headings for styling only)
- **URLs**: descriptive and keyword-bearing, not just IDs (`/gold-bars/10g-pamp-suisse` beats `/product?id=4471`)
- **Image alt text** on meaningful images
- **Internal linking** between topically related pages (this also helps crawlers discover deep pages)
- **Open Graph / Twitter Card tags** so shared links render properly with title/image/description
- **Canonical tag** on every page

---

## Step 3 — Site Architecture & Content Strategy

- **Silo / hub-and-spoke structure**: one dedicated, indexable page per distinct product, service, or topic rather than one page trying to rank for everything. This is how sites end up ranking for dozens of long-tail queries instead of just their brand name.
- **Blend commercial + informational intent on the same page** where it fits naturally — e.g., a product/category page that also answers "how do I choose/use/buy this" satisfies both transactional and research searches without needing a separate blog post.
- **Freshness signals**: anything that visibly updates (live data widgets, prices, stock status, "last updated" dates, a news/blog section) helps both rankings and dwell time, especially in finance, travel, or any time-sensitive vertical.
- **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust) — especially critical for YMYL (finance, health, legal, safety) niches:
  - Real About page, physical address, named contact methods
  - Visible customer reviews/testimonials
  - Transparent policies (returns, privacy, regulatory status if applicable)
  - Author/expert attribution on advice content where relevant

---

## Step 4 — Off-Page Authority

- Identify **niche-relevant directories, review platforms, trade associations, and marketplaces** for the specific industry — these are far higher-ROI and more attainable than generic guest posting, and search engines treat them as more relevant trust signals.
- **NAP consistency** (Name, Address, Phone) — must match exactly across the website, Google Business Profile, and every directory/citation listing.
- Build and **link out to active social profiles** (and link back from them).
- To benchmark a competitor or the user's own domain's authority, web_search things like:
  - `"[domain]" backlinks OR domain rating`
  - `"[domain]" reviews`
  - `site:[domain]` to gauge indexed page count
  - Free tools/aggregator sites (ahrefs free checker, similar tools) often surface Domain Rating and referring-domain counts in search snippets without needing a paid subscription.

---

## Step 5 — Technical Foundation

- HTTPS everywhere, no mixed content
- Mobile responsiveness (`<meta name="viewport" content="width=device-width, initial-scale=1">`)
- Core Web Vitals: LCP, INP, CLS — flag render-blocking scripts, unoptimized images, layout shifts
- **Structured data (schema.org / JSON-LD)** matching the page type: `Organization`, `Product`, `FAQPage`, `Article`, `BreadcrumbList`, `LocalBusiness` as applicable
- Lazy-load below-the-fold images/content; don't lazy-load above-the-fold hero content (hurts LCP)

---

## Competitive Benchmark Procedure

Use this exact sequence when the user asks "why does my competitor rank better" or wants a head-to-head comparison:

1. `web_fetch` the competitor's homepage (and a key category/product page) — extract raw title, meta description, and whether content is present without JS execution.
2. `web_search` the competitor's main money keywords to confirm where they actually appear in results.
3. `web_search` `"[competitor domain]" reviews OR backlinks OR domain rating` to surface authority and trust signals (directory listings, review platforms, DR/traffic estimates).
4. Repeat steps 1–3 for the user's own site under the same conditions.
5. Build a side-by-side comparison table covering at minimum: rendering/crawlability, titles/meta, indexed page count, domain authority signals, directory citations, freshness signals, schema markup, trust signals.
6. Always close with a **prioritized, numbered action list** — rendering/indexing fixes first, then on-page, then architecture/content, then off-page authority. Don't bury the most important fix in the middle of a list.

**Delivery format:** lead with the single biggest blocking issue if one exists (usually rendering), use a comparison table for benchmarking, and end with concrete next steps naming exact tags/files/settings to change — never vague "improve your SEO" advice.

---

## Next.js: Making a Site Fully Server-Rendered & Crawlable

This is the most common fix needed for modern JS-framework sites. The good news: **Next.js (App Router, v13+) server-renders by default** — you only lose that benefit when a component opts into client-only rendering unnecessarily.

### Quick diagnosis

Run `curl -s https://yoursite.com/some-page | grep -i "<title>"` (or just View Page Source in the browser). If you see your real title and content in the raw HTML, you're already server-rendered. If you see a near-empty shell or a generic placeholder title, something is forcing client-side rendering for that route.

### Decision matrix: which rendering mode for which page

| Page type | Strategy | Why |
|---|---|---|
| Marketing/about/static info pages | **SSG** (static, build-time) | Fastest, fully crawlable, content rarely changes |
| Product/category pages, blog posts | **ISR** (static + timed revalidation) | Crawlable like static, but stays fresh without a full rebuild |
| Live prices, stock, personalized/account data | **SSR** (rendered per request) | Needs to be correct at request time |
| Highly interactive widgets (calculators, filters, cart) | Server Component shell + small **Client Component** islands | Keep the page's HTML/content server-rendered; isolate interactivity to the smallest possible client boundary |

### App Router patterns (Next.js 13+) — recommended approach

**1. Default to Server Components.** Don't add `'use client'` at the top of a whole page just because one widget needs interactivity. Push `'use client'` down to the smallest leaf component:

```tsx
// app/products/[slug]/page.tsx — Server Component (no 'use client')
// This renders fully on the server; content is in the raw HTML.
import AddToCartButton from './AddToCartButton'; // this one is client-rendered

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug); // runs on the server
  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} /> {/* only this is interactive/client */}
    </article>
  );
}
```

```tsx
// app/products/[slug]/AddToCartButton.tsx
'use client';
export default function AddToCartButton({ productId }: { productId: string }) {
  return <button onClick={() => addToCart(productId)}>Add to Cart</button>;
}
```

**2. Choose freshness behavior per fetch call:**

```tsx
// SSG (default) — cached indefinitely at build time
const data = await fetch('https://api.example.com/page-data');

// ISR — static, but auto-refreshes in the background every N seconds
const data = await fetch('https://api.example.com/price', {
  next: { revalidate: 60 }, // re-fetch at most every 60s
});

// True SSR — re-rendered fresh on every single request, never cached
const data = await fetch('https://api.example.com/account', {
  cache: 'no-store',
});
```

Or force a whole route to always be dynamic (true SSR):

```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';
```

**3. Per-page dynamic metadata (titles/descriptions)** — this is what fixes the "every page has the same title" problem:

```tsx
// app/products/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} | Buy Online | YourBrand`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}
```

**4. Auto-generate `sitemap.xml` and `robots.txt`:**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  return [
    { url: 'https://yoursite.com', lastModified: new Date() },
    ...products.map((p) => ({
      url: `https://yoursite.com/products/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

**5. Structured data (JSON-LD)** — render it server-side so it's in the raw HTML:

```tsx
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    offers: { '@type': 'Offer', price: product.price, priceCurrency: 'AED' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{product.name}</h1>
      {/* ... */}
    </>
  );
}
```

### Pages Router equivalent (if not on App Router yet)

| Goal | Function |
|---|---|
| SSR (per request) | `getServerSideProps` |
| ISR (static + revalidate) | `getStaticProps` with `revalidate: N` |
| Pure SSG | `getStaticProps` without `revalidate` |
| Per-page meta tags | `next/head` (`<Head><title>...</title></Head>`) |

### Verifying the fix actually worked

1. **View Page Source** (Ctrl+U / Cmd+Opt+U) on a live page — the real title, meta description, and main content must appear in the raw HTML, not just `<div id="__next"></div>`.
2. `curl -s https://yoursite.com/page | grep -i "<title>\|<h1>"` from a terminal — confirms what a non-JS crawler receives.
3. **Google Search Console → URL Inspection → Test Live URL → View Crawled Page / Screenshot** — the definitive check of what Googlebot itself rendered.
4. Re-run `site:yoursite.com` in Google a few days after deploying and re-submitting the sitemap — indexed page count should climb toward the real number of pages on the site.

---

## Output format expectations for this skill

When delivering results from this skill:
- Lead with the single biggest blocking issue if one exists (rendering/crawlability almost always wins this slot)
- Use a comparison table when benchmarking against a competitor
- Close with a prioritized, numbered action list in the dependency order from "Core philosophy" above
- Be specific — name the exact tag, file, or config to change, not generic advice
