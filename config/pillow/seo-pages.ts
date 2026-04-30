/**
 * config/pillow/seo-pages.ts
 *
 * SEO landing page definitions for FindMyIdealPillow (UK market).
 *
 * Goal: rank for buyer-intent long-tail queries, build trust, route users
 * into the quiz, and stay safely on the right side of Amazon Associates
 * compliance (advisory tone, no fake "best", no medical claims).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * KEYWORD CLUSTER — 12 pages targeted, built incrementally
 * ──────────────────────────────────────────────────────────────────────────
 *
 *   Sleep position cluster
 *     1. best-pillow-for-side-sleepers-uk          ← BUILT (example page)
 *     2. best-pillow-for-back-sleepers-uk
 *     3. best-pillow-for-stomach-sleepers-uk
 *     4. best-pillow-for-combination-sleepers-uk
 *
 *   Health / problem cluster
 *     5. best-pillow-for-neck-pain-uk
 *     6. best-pillow-for-snoring-uk
 *     7. best-pillow-for-allergies-uk
 *
 *   Material / temperature cluster
 *     8. best-cooling-pillow-uk
 *     9. best-memory-foam-pillow-uk
 *    10. best-down-pillow-uk
 *
 *   Firmness / budget cluster
 *    11. firm-vs-soft-pillow-which-is-right-for-you
 *    12. best-budget-pillow-uk-under-30
 *
 * Each page MUST follow the structure enforced by the renderer:
 *   H1 → intro → "How the quiz works" → educational sections (H2/H3)
 *   → who-it's-for → mid-page quiz CTA → key factors → FAQ → related pages
 *
 * Content rules:
 *   • UK-first language ("pillow", "duvet", "£", no "z" spellings)
 *   • 800–1,200 words of genuinely useful content
 *   • No misleading "best ever" / "guaranteed" claims
 *   • No medical advice — frame as "what to look for", not "what will fix you"
 *   • Always link to /pillow/questionnaire for personalised result
 */

export interface PillowSeoSection {
  /** Section heading (rendered as <h2>). */
  h2: string;
  /** Optional sub-heading paragraph(s). */
  body: string;
  /** Optional H3 subsections. */
  subsections?: { h3: string; body: string }[];
}

export interface PillowSeoPage {
  /** URL slug under /pillow/<slug> */
  slug: string;
  /** Primary keyword the page targets */
  keyword: string;
  /** <title> tag (≤60 chars ideal) */
  metaTitle: string;
  /** <meta name="description"> (≤160 chars ideal) */
  metaDescription: string;
  /** Single H1 */
  h1: string;
  /** Breadcrumb label shown in the trail */
  breadcrumbLabel: string;
  /** Lead paragraph rendered directly under the H1 */
  intro: string;
  /** Short "is this page for you?" block — bullet list of audience signals */
  whoItsFor: string[];
  /** Long-form educational sections (rendered as H2/H3) */
  sections: PillowSeoSection[];
  /** Bullet list rendered under "What our quiz looks for" */
  keyFactors: string[];
  /** FAQ — also emitted as FAQPage JSON-LD */
  faq: { q: string; a: string }[];
  /** Slugs of related pages to internally link (must exist in this file) */
  relatedSlugs: string[];
  /** ISO date (YYYY-MM-DD) — drives "Last reviewed" + sitemap lastmod */
  lastReviewed: string;
}

// ──────────────────────────────────────────────────────────────────────────
// PAGE 1 — Best Pillow for Side Sleepers UK
// ──────────────────────────────────────────────────────────────────────────

const sideSleepersUk: PillowSeoPage = {
  slug: "best-pillow-for-side-sleepers-uk",
  keyword: "best pillow for side sleepers uk",
  metaTitle: "Best Pillow for Side Sleepers UK — Find Yours in 2 Minutes",
  metaDescription:
    "Side sleepers need more loft and firmness than back or stomach sleepers. Take the 2-minute quiz to find a pillow matched to your build, shoulders and budget.",
  h1: "Best Pillow for Side Sleepers (UK Guide)",
  breadcrumbLabel: "Side sleepers",
  intro:
    "Side sleeping is the most common sleep position in the UK, but most pillows on the high street are built for the average back sleeper. The result: a sagging pillow that lets your head drop, a strained neck, and a numb shoulder by morning. This guide explains exactly what side sleepers need from a pillow — and our 2-minute quiz turns that into a shortlist matched to your build, shoulder width and temperature preference.",
  whoItsFor: [
    "You spend most of the night on your left or right side",
    "You wake up with a stiff neck, sore shoulder, or tingling arm",
    "Your current pillow flattens within an hour of lying down",
    "You're a broader-shouldered sleeper struggling to find enough loft",
  ],
  sections: [
    {
      h2: "Why side sleepers need a different pillow",
      body:
        "When you lie on your side, the gap between your ear and the mattress is roughly the width of your shoulder — typically 10–15 cm for adults. A pillow has to fill that gap so your cervical spine stays in a straight line from skull to mid-back. Drop too low and the head tilts down, stretching the muscles on the upper side of the neck. Sit too high and the head tips up, crunching the lower side. Either way, you wake stiff. Back sleepers, by comparison, only need to fill 5–8 cm — which is why a generic supermarket pillow often feels fine on your back but wrecks you on your side.",
    },
    {
      h2: "The three things that actually matter",
      body: "Forget marketing claims about thread count and 'cloud-like comfort'. For a side sleeper, three measurable properties decide whether a pillow works:",
      subsections: [
        {
          h3: "1. Loft (height when lying on it)",
          body:
            "Aim for a compressed loft of 10–14 cm. Smaller-framed sleepers (under ~165 cm tall, narrower shoulders) sit at the lower end; broader sleepers need closer to 14 cm. Adjustable-fill pillows let you remove or add filling until it matches.",
        },
        {
          h3: "2. Firmness and support",
          body:
            "Side sleepers need medium-firm to firm support that holds its shape all night. Soft down or polyester clusters compress under the weight of the head and re-create the same alignment problem you started with. Memory foam, latex and shredded-foam fills tend to keep their loft for years.",
        },
        {
          h3: "3. Temperature",
          body:
            "Side sleepers trap more heat against the pillow than back sleepers because more of your face and neck is in contact with the surface. If you run warm, look for open-cell foam, latex with pinholes, or a cover with phase-change fabric — and avoid solid memory foam without ventilation.",
        },
      ],
    },
    {
      h2: "Materials compared for side sleeping",
      body:
        "Memory foam holds its loft well and contours around the head, which suits most side sleepers — but solid blocks can sleep hot. Shredded memory foam keeps the contour benefit and lets air move through. Latex feels springier and naturally cooler, with a longer lifespan, though it costs more. Down and feather are luxurious but compress quickly under side-sleeping pressure unless they're high-fill-power and densely packed. Microfibre and polyester fills are the most affordable but lose loft fastest — fine as a stop-gap, less good as a long-term match.",
    },
    {
      h2: "Common mistakes side sleepers make",
      body: "",
      subsections: [
        {
          h3: "Stacking two soft pillows",
          body:
            "Two thin pillows together create an unstable stack that shifts during the night. One correctly-lofted pillow is always better than two wrong ones.",
        },
        {
          h3: "Buying for how it feels in the shop",
          body:
            "A pillow you press with your hand for three seconds tells you almost nothing. What matters is how it behaves under 4–5 kg of head weight for eight hours. Always check the brand's returns policy.",
        },
        {
          h3: "Ignoring the pillowcase",
          body:
            "A tightly-woven cotton or bamboo case lets a breathable pillow breathe. A polyester satin case can undo the cooling benefits of a £90 latex pillow.",
        },
      ],
    },
  ],
  keyFactors: [
    "Your shoulder width and overall frame (drives loft)",
    "Whether you sleep hot, cold, or neutral",
    "Any neck or shoulder pain you wake up with",
    "Your fill preference: foam, latex, down, or microfibre",
    "Your budget — strong UK options exist from £25 to £120",
    "Whether you need machine-washable or hypoallergenic",
  ],
  faq: [
    {
      q: "How firm should a pillow be for side sleepers?",
      a: "Medium-firm to firm. Soft pillows compress too far under the weight of your head and let your neck drop out of alignment. If you currently use a soft pillow and wake with neck stiffness, firmness is the first thing to change.",
    },
    {
      q: "What loft (height) is right for side sleepers?",
      a: "Most adult side sleepers do best with a compressed loft of 10–14 cm. Narrower-shouldered sleepers sit at the lower end; broader-shouldered sleepers need the upper end. An adjustable pillow lets you fine-tune by adding or removing fill.",
    },
    {
      q: "Is memory foam or latex better for side sleeping?",
      a: "Both work well. Memory foam contours more closely and absorbs movement, which suits sleepers who want a 'sinking' feel. Latex is springier, naturally cooler, and longer-lasting, which suits sleepers who run warm or dislike a moulded feel.",
    },
    {
      q: "Can a pillow fix neck pain?",
      a: "A correctly-matched pillow can stop a pillow from causing neck pain — which is often where the pain is coming from. It is not a medical treatment. If pain persists for more than a couple of weeks after switching to a properly-lofted pillow, see a GP or physiotherapist.",
    },
    {
      q: "How often should I replace my pillow?",
      a: "Most pillows lose meaningful support after 18–24 months. Latex and high-density memory foam can last 3–5 years. If you fold yours in half and it stays folded, it's done.",
    },
  ],
  relatedSlugs: [
    // These will be valid once the pages are added; the renderer filters
    // out any slug that does not yet exist, so it's safe to list ahead.
    "best-pillow-for-neck-pain-uk",
    "best-cooling-pillow-uk",
    "best-memory-foam-pillow-uk",
  ],
  lastReviewed: "2026-04-30",
};

export const pillowSeoPages: PillowSeoPage[] = [sideSleepersUk];

export const pillowSeoPageMap: Record<string, PillowSeoPage> = Object.fromEntries(
  pillowSeoPages.map((p) => [p.slug, p])
);
