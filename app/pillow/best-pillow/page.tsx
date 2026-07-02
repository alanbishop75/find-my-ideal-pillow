import type { Metadata } from "next";
import Link from "next/link";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import HubQuickBuySection from "./HubQuickBuySectionClient";

const quickAnswerBullets = [
  "If you sleep on your side, you almost always need more loft and firmer support than a standard pillow provides.",
  "If you sleep hot, breathable fills and ventilated covers matter more than brand name or premium materials.",
  "If you wake with neck or shoulder pain, loft mismatch is usually the first thing to fix before buying.",
];

const comparisonOptions = [
  {
    label: "Best baseline for most sleepers",
    guideSlug: "best-pillow-for-side-sleepers",
    guideTitle: "Best Pillow for Side Sleepers",
    summary: "Highest-loft requirement and firmness need — the profile most standard pillows underserve.",
  },
  {
    label: "Best for alignment issues",
    guideSlug: "best-pillow-for-neck-pain",
    guideTitle: "Best Pillow for Neck Pain",
    summary: "Structured cervical support for sleepers waking with stiffness or recurring neck pain.",
  },
  {
    label: "Best for temperature control",
    guideSlug: "best-cooling-pillow",
    guideTitle: "Best Cooling Pillow",
    summary: "Breathable fills and cool-touch covers for sleepers who overheat through the night.",
  },
  {
    label: "Best value-first route",
    guideSlug: "best-budget-pillow-under-30",
    guideTitle: "Best Budget Pillow Under £30",
    summary: "Well-matched UK options under £30 for sleepers who want performance without overspending.",
  },
];

const decisionRows = [
  {
    profile: "Side sleeper with neck or shoulder issues",
    prioritise: "High loft, firm support, adjustable fill",
    start: "best-pillow-for-side-sleepers",
  },
  {
    profile: "Back or stomach sleeper",
    prioritise: "Medium or low loft, softer support",
    start: "best-pillow-for-back-sleepers",
  },
  {
    profile: "Hot sleeper or allergy sufferer",
    prioritise: "Breathable fills, hypoallergenic cover",
    start: "best-cooling-pillow",
  },
  {
    profile: "Not sure / combination sleeper",
    prioritise: "Adjustable loft, versatile support",
    start: "best-pillow-for-combination-sleepers",
  },
];

const NAVY = "#1a1a3e";
const LAVENDER = "#9b87bc";
const SURFACE = "#f5f3f8";
const BORDER = "#e6e1ec";
const TEXT = "#1a1a3e";
const TEXT2 = "#5a5478";

export const metadata: Metadata = {
  title: "Best Pillow (2026): Find the Right Pillow for You | FindYourIdeal",
  description:
    "There is no single best pillow for everyone. Learn what matters for your sleep style, then use our 2-minute quiz to get a personalised recommendation.",
  alternates: {
    canonical: "/pillow/best-pillow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const coreGuides = [
  "best-pillow-for-side-sleepers",
  "best-pillow-for-back-sleepers",
  "best-pillow-for-stomach-sleepers",
  "best-pillow-for-combination-sleepers",
  "best-pillow-for-neck-pain",
  "best-pillow-for-snoring",
  "best-cooling-pillow",
  "best-memory-foam-pillow",
  "best-pillow-for-allergies",
  "best-down-pillow",
  "firm-vs-soft-pillow-which-is-right-for-you",
  "best-budget-pillow-under-30",
  "best-pillow-for-hot-sleepers",
  "best-pillow-for-shoulder-pain",
  "best-latex-pillow",
];

const guideCards = coreGuides
  .map((slug) => pillowSeoPageMap[slug])
  .filter((page) => Boolean(page));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best pillow overall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single best pillow for everyone. The right pillow depends on your sleep position, body frame, temperature preference, support needs and budget.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the right pillow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with how you actually sleep. Side sleepers usually need more loft and support, back sleepers often need medium loft, and hot sleepers should prioritise breathable materials and cooler covers.",
      },
    },
    {
      "@type": "Question",
      name: "Is memory foam, down or cooling pillow better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each can be the right fit depending on your needs. Memory foam suits sleepers who want support and contouring, down suits sleepers who prefer softness, and cooling designs suit hot sleepers who overheat at night.",
      },
    },
  ],
};

export default function BestPillowHubPage() {
  return (
    <div style={{ width: "100%", background: SURFACE }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section
        style={{
          background: "linear-gradient(135deg, #1a1a3e 0%, #221f4a 55%, #2c2855 100%)",
          color: "#ffffff",
          padding: "48px 20px 56px",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 18 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 6px" }}>›</span>
            <span>Best Pillow</span>
          </div>

          <h1 style={{ margin: "0 0 12px 0", fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.1, letterSpacing: -0.6 }}>
            Best Pillow: Find the Right Pillow for How You Sleep
          </h1>
          <p style={{ margin: "0 0 24px", maxWidth: 700, color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.6 }}>
            There is no universally best pillow, because the right pillow depends on how you sleep,
            what support your neck and shoulders need, your temperature preference, and whether you prefer
            natural or synthetic materials.
          </p>
          <p style={{ margin: "0 0 24px", maxWidth: 760, color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.6 }}>
            A side sleeper fighting neck pain usually needs a very different pillow from a back sleeper looking for
            softness, and someone who runs hot at night often benefits from a cooler gel or latex option than
            a sleeper who values deep contouring. This guide helps you narrow down the best pillow
            for your sleep needs, then points you to the most relevant topic pages and the fitting quiz if you want a more
            precise match.
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 14,
              padding: "18px 18px 20px",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Start with a personalised fitting</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                2-minute quiz. No sign-up. Recommendation based on how you sleep.
              </p>
            </div>
            <Link
              href="/pillow/questionnaire?ref=best-pillow-hub"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: LAVENDER,
                color: NAVY,
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Start fitting now
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              margin: "16px 0",
              opacity: 0.6,
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 14,
              padding: "18px 18px 20px",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Quick Buy Guide</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                Preset recommendations. Start exploring by sleep type or need.
              </p>
            </div>
            <Link
              href="#quick-buy-starting-points"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: LAVENDER,
                color: NAVY,
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              See options
            </Link>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 64px" }}>
        <section
          id="quick-answer"
          style={{
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", fontSize: 24, color: NAVY }}>Quick answer</h2>
          <p style={{ margin: "0 0 10px", color: TEXT2, lineHeight: 1.7 }}>
            If you want a fast starting point before diving into all guides, use this 30-second summary.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: TEXT, lineHeight: 1.8 }}>
            {quickAnswerBullets.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </section>

        <section
          id="jump-links"
          style={{
            marginTop: 16,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "16px 18px",
          }}
          aria-label="Jump links"
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 20, color: NAVY }}>Jump to a section</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {([
              ["Quick answer", "#quick-answer"],
              ["Compare options", "#compare-options"],
              ["How we rank", "#how-we-rank"],
              ["Decision matrix", "#decision-matrix"],
              ["Quick Buy", "#quick-buy-starting-points"],
              ["Browse guides", "#browse-guides"],
              ["FAQ", "#faq"],
            ] as [string, string][]).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 999,
                  padding: "8px 12px",
                  color: NAVY,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "#ffffff",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section
          id="compare-options"
          style={{
            marginTop: 16,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>Best options at a glance</h2>
          <p style={{ margin: "0 0 14px", color: TEXT2, lineHeight: 1.7 }}>
            These options represent the most common pillow decision paths: baseline support, alignment, temperature, and value.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {comparisonOptions.map((item, index) => (
              <article
                key={item.guideSlug}
                style={{
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "14px 14px",
                  background: "#ffffff",
                }}
              >
                <p style={{ margin: "0 0 8px", color: NAVY, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  #{index + 1} · {item.label}
                </p>
                <h3 style={{ margin: "0 0 8px", color: NAVY, fontSize: 17, lineHeight: 1.35 }}>{item.guideTitle}</h3>
                <p style={{ margin: "0 0 10px", color: TEXT2, fontSize: 14, lineHeight: 1.6 }}>{item.summary}</p>
                <Link
                  href={`/pillow/${item.guideSlug}`}
                  style={{ color: NAVY, textDecoration: "none", fontWeight: 700, fontSize: 14 }}
                >
                  Open guide →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-we-rank"
          style={{
            marginTop: 16,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>How we rank options on this page</h2>
          <p style={{ margin: "0 0 10px", color: TEXT2, lineHeight: 1.7 }}>
            We prioritise fit-to-sleep-profile first, then support consistency and value. That means we favour options that fix the most common sleep problems before recommending premium materials or brands.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: TEXT, lineHeight: 1.8 }}>
            <li>Sleep position fit first: loft, firmness, and support type matched to how you actually sleep.</li>
            <li>Problem relevance second: neck pain, heat, allergies and snoring all change the priority order.</li>
            <li>Value third: we include realistic UK price context so every option is actionable, not aspirational.</li>
          </ul>
        </section>

        <section
          id="decision-matrix"
          style={{
            marginTop: 16,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>Decision matrix: where to start</h2>
          <p style={{ margin: "0 0 12px", color: TEXT2, lineHeight: 1.7 }}>
            If you are not sure which guide to open first, start with the closest profile below.
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {decisionRows.map((row) => {
              const startPage = pillowSeoPageMap[row.start];
              return (
                <div
                  key={row.start}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "grid",
                    gap: 8,
                    gridTemplateColumns: "minmax(180px, 1.2fr) minmax(220px, 1.6fr) minmax(180px, 1fr)",
                  }}
                >
                  <p style={{ margin: 0, color: NAVY, fontWeight: 700, fontSize: 14 }}>{row.profile}</p>
                  <p style={{ margin: 0, color: TEXT2, fontSize: 14 }}>{row.prioritise}</p>
                  <Link
                    href={`/pillow/${row.start}`}
                    style={{ color: NAVY, textDecoration: "none", fontWeight: 700, fontSize: 14, textAlign: "right" }}
                  >
                    {startPage?.h1 ?? "Open guide"} →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section
          style={{
            marginTop: 16,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", fontSize: 24, color: NAVY }}>How to think about the best pillow</h2>
          <p style={{ margin: "0 0 10px", color: TEXT2, lineHeight: 1.7 }}>
            Most sleepers get worse results from a mismatch than from choosing the wrong brand. A pillow
            that fits your sleep position and body frame usually performs better than a premium option
            chosen for marketing claims alone.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: TEXT, lineHeight: 1.8 }}>
            <li>Need better neck alignment? Prioritise loft and support matched to your sleep position.</li>
            <li>Need a cooler sleep surface? Prioritise breathable fills, ventilated foams and cooler covers.</li>
            <li>Need a softer or firmer feel? Prioritise material and fill adjustability before brand name.</li>
          </ul>
        </section>

        <HubQuickBuySection />

        <section id="browse-guides" style={{ marginTop: 24 }}>
          <h2 style={{ margin: "0 0 14px 0", fontSize: 24, color: NAVY }}>Browse by sleep need and pillow type</h2>
          <p style={{ margin: "0 0 14px", color: TEXT2, lineHeight: 1.7 }}>
            Use these detailed guides if you want a deeper breakdown for your specific sleep style or problem.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 14,
            }}
          >
            {guideCards.map((page) => (
              <Link
                key={page.slug}
                href={`/pillow/${page.slug}`}
                style={{
                  background: "#ffffff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "16px 16px",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <h3 style={{ margin: "0 0 8px", color: NAVY, fontSize: 17, lineHeight: 1.35 }}>{page.h1}</h3>
                <p style={{ margin: 0, color: TEXT2, fontSize: 14, lineHeight: 1.6 }}>{page.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 24,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <h2 style={{ margin: "0 0 8px", fontSize: 22, color: NAVY }}>What pillow should I choose right now?</h2>
          <p style={{ margin: "0 0 14px", color: TEXT2, lineHeight: 1.7 }}>
            If you want a fast answer, the fitting quiz is the best starting point. It compares how you sleep
            against our recommendation logic and returns the most suitable pillow options for your needs.
          </p>
          <Link
            href="/pillow/questionnaire?ref=best-pillow-hub-bottom"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: LAVENDER,
              color: NAVY,
              borderRadius: 999,
              padding: "12px 24px",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Get my pillow recommendation
          </Link>
        </section>

        <section
          id="faq"
          style={{
            marginTop: 24,
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <h2 style={{ margin: "0 0 12px", fontSize: 22, color: NAVY }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                q: "What is the best pillow overall?",
                a: "There is no single best pillow for everyone. The right pillow depends on your sleep position, body frame, temperature preference, support needs and budget.",
              },
              {
                q: "How do I choose the right pillow?",
                a: "Start with how you actually sleep. Side sleepers usually need more loft and support, back sleepers often need medium loft, and hot sleepers should prioritise breathable materials and cooler covers.",
              },
              {
                q: "Is memory foam, down or cooling pillow better?",
                a: "Each can be the right fit depending on your needs. Memory foam suits sleepers who want support and contouring, down suits sleepers who prefer softness, and cooling designs suit hot sleepers who overheat at night.",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  borderTop: index > 0 ? `1px solid ${BORDER}` : "none",
                  paddingTop: index > 0 ? 16 : 0,
                }}
              >
                <p style={{ margin: "0 0 6px", color: NAVY, fontWeight: 800 }}>{item.q}</p>
                <p style={{ margin: 0, color: TEXT2, lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}