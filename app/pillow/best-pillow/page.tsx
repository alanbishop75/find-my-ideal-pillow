import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import { products } from "../../../config/pillow/products";
import { pillowComparisonPages } from "../../../config/pillow/comparison-pages";
import HubQuickBuySection from "./HubQuickBuySectionClient";

const quickAnswerBullets = [
  "If you sleep on your side, you almost always need more loft and firmer support than a standard pillow provides.",
  "If you sleep hot, breathable fills and ventilated covers matter more than brand name or premium materials.",
  "If you wake with neck or shoulder pain, loft mismatch is usually the first thing to fix before buying.",
];

const comparisonCards = pillowComparisonPages.map((page) => ({
  label: page.searchIntent,
  title: page.h1,
  summary: page.metaDescription,
  leftProductId: page.leftProductId,
  rightProductId: page.rightProductId,
  slug: page.slug,
  cta: "Open comparison page",
}));

const decisionRows = [
  {
    icon: "🛌",
    profile: "Side sleeper with neck or shoulder issues",
    prioritise: "High loft, firm support, adjustable fill",
    start: "best-pillow-for-side-sleepers",
  },
  {
    icon: "🌙",
    profile: "Back or stomach sleeper",
    prioritise: "Medium or low loft, softer support",
    start: "best-pillow-for-back-sleepers",
  },
  {
    icon: "❄️",
    profile: "Hot sleeper or allergy sufferer",
    prioritise: "Breathable fills, hypoallergenic cover",
    start: "best-cooling-pillow",
  },
  {
    icon: "🔄",
    profile: "Not sure / combination sleeper",
    prioritise: "Adjustable loft, versatile support",
    start: "best-pillow-for-combination-sleepers",
  },
];

const NAVY = "#1a1a3e";
const LAVENDER = "#9b87bc";
const SURFACE = "#f5f3f8";
const WHITE = "#ffffff";
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
          id="jump-links"
          style={{
            marginTop: 0,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "14px 16px 16px",
          }}
          aria-label="Jump links"
        >
          <div style={{ marginBottom: 10 }}>
            <p style={{ margin: "0 0 3px", color: NAVY, fontSize: 13, fontWeight: 800, letterSpacing: 0.4, textTransform: "uppercase" }}>
              On this page
            </p>
            <p style={{ margin: 0, color: TEXT2, fontSize: 13 }}>
              Jump straight to the section you want.
            </p>
          </div>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
            {([
              ["Quick answer", "#quick-answer"],
              ["Compare products", "#compare-options"],
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
                  padding: "7px 14px",
                  color: NAVY,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            ))}
            </div>
          </div>
        </section>

        <section
          id="quick-answer"
          style={{
            marginTop: 14,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>Quick answer</h2>
          <p style={{ margin: "0 0 10px", color: TEXT2, lineHeight: 1.7 }}>
            If you want a fast starting point before diving into all guides, use this 30-second summary.
          </p>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {quickAnswerBullets.map((line, index) => (
              <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: TEXT, lineHeight: 1.6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: LAVENDER, flexShrink: 0, marginTop: 6 }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="how-we-rank"
          style={{
            marginTop: 16,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>How we rank options on this page</h2>
          <p style={{ margin: "0 0 10px", color: TEXT2, lineHeight: 1.7 }}>
            We prioritise fit-to-sleep-profile first, then support consistency and value. That means we favour options that fix the most common sleep problems before recommending premium materials or brands.
          </p>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Sleep position fit first:", text: "loft, firmness, and support type matched to how you actually sleep." },
              { label: "Problem relevance second:", text: "neck pain, heat, allergies and snoring all change the priority order." },
              { label: "Value third:", text: "we include realistic UK price context so every option is actionable, not aspirational." },
            ].map((item) => (
              <li key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: TEXT, lineHeight: 1.6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: LAVENDER, flexShrink: 0, marginTop: 6 }} />
                <span><strong>{item.label}</strong> {item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="decision-matrix"
          style={{
            marginTop: 16,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>Decision matrix: where to start</h2>
          <p style={{ margin: "0 0 12px", color: TEXT2, lineHeight: 1.7 }}>
            If you are not sure which guide to open first, start with the closest profile below.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {decisionRows.map((row) => {
              const startPage = pillowSeoPageMap[row.start];
              return (
                <article
                  key={row.start}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    padding: "13px 14px",
                    background: "#f9f7fc",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#efe8f5",
                        border: `1px solid ${LAVENDER}`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        flexShrink: 0,
                      }}
                    >
                      {row.icon}
                    </span>
                    <p style={{ margin: 0, color: NAVY, fontWeight: 800, fontSize: 15, lineHeight: 1.45 }}>{row.profile}</p>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px", color: NAVY, fontSize: 11, fontWeight: 800, letterSpacing: 0.4, textTransform: "uppercase" }}>
                      Prioritise
                    </p>
                    <p style={{ margin: 0, color: TEXT2, fontSize: 14, lineHeight: 1.55 }}>{row.prioritise}</p>
                  </div>
                  <Link
                    href={`/pillow/${row.start}`}
                    style={{ color: NAVY, textDecoration: "none", fontWeight: 800, fontSize: 14, marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    Start here: {startPage?.h1 ?? "Open guide"} →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section
          style={{
            marginTop: 16,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
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
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Need better neck alignment?", text: "Prioritise loft and support matched to your sleep position." },
              { label: "Need a cooler sleep surface?", text: "Prioritise breathable fills, ventilated foams and cooler covers." },
              { label: "Need a softer or firmer feel?", text: "Prioritise material and fill adjustability before brand name." },
            ].map((item) => (
              <li key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: TEXT, lineHeight: 1.6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: LAVENDER, flexShrink: 0, marginTop: 6 }} />
                <span><strong>{item.label}</strong> {item.text}</span>
              </li>
            ))}
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
                  borderLeft: `4px solid ${LAVENDER}`,
                  borderRadius: 12,
                  padding: "16px 16px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                <h3 style={{ margin: "0 0 8px", color: NAVY, fontSize: 17, lineHeight: 1.35 }}>{page.h1}</h3>
                <p style={{ margin: "0 0 12px", color: TEXT2, fontSize: 14, lineHeight: 1.6, flex: 1 }}>{page.metaDescription}</p>
                <span style={{ color: NAVY, fontWeight: 700, fontSize: 13 }}>Open guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="compare-options"
          style={{
            marginTop: 24,
            background: "#ffffff",
            borderTop: `1px solid ${BORDER}`,
            borderRight: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: `4px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "22px 24px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 24, color: NAVY }}>Compare before you pick</h2>
          <p style={{ margin: "0 0 14px", color: TEXT2, lineHeight: 1.7 }}>
            These are direct pillow product-vs-product comparisons for common decision searches.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {comparisonCards.map((card, index) => {
              const leftProduct = card.leftProductId ? products.find((product) => product.id === card.leftProductId) : undefined;
              const rightProduct = card.rightProductId ? products.find((product) => product.id === card.rightProductId) : undefined;
              return (
                <article
                  key={card.slug}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderLeft: `4px solid ${LAVENDER}`,
                    borderRadius: 12,
                    padding: "14px 14px 12px",
                    background: "#fbfafd",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minHeight: 0,
                  }}
                >
                  <p style={{ margin: 0, color: NAVY, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>
                    #{index + 1} · {card.label}
                  </p>
                  <h3 style={{ margin: 0, color: NAVY, fontSize: 16, lineHeight: 1.35 }}>{card.title}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
                    {[leftProduct, rightProduct].map((product) => (
                      <div
                        key={product?.id}
                        style={{
                          border: `1px solid ${BORDER}`,
                          borderRadius: 12,
                          background: WHITE,
                          padding: 8,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {product ? (
                          <>
                            <Image
                              src={product.imageUrl}
                              alt={`${product.brand} ${product.name}`}
                              width={120}
                              height={120}
                              style={{ width: "100%", height: 104, objectFit: "cover", borderRadius: 10 }}
                            />
                            <div>
                              <p style={{ margin: "0 0 2px", color: NAVY, fontSize: 11, fontWeight: 800, letterSpacing: 0.4, textTransform: "uppercase" }}>{product.brand}</p>
                              <p style={{ margin: 0, color: NAVY, fontSize: 14, fontWeight: 800, lineHeight: 1.35 }}>{product.name}</p>
                            </div>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: 0, color: TEXT2, fontSize: 14, lineHeight: 1.6, flex: 1 }}>{card.summary}</p>
                  <Link
                    href={`/pillow/compare/${card.slug}`}
                    style={{ color: NAVY, textDecoration: "none", fontWeight: 800, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    {card.cta} →
                  </Link>
                </article>
              );
            })}
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