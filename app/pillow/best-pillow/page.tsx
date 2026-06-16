import type { Metadata } from "next";
import Link from "next/link";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";

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
  "best-pillow-for-neck-pain",
  "best-cooling-pillow",
  "best-memory-foam-pillow",
  "best-pillow-for-allergies",
  "best-budget-pillow-under-30",
  "best-pillow-for-hot-sleepers",
  "best-pillow-for-shoulder-pain",
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
            There is no universally best pillow. The right choice depends on your sleep position,
            support needs, temperature preference, materials and budget.
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
        </div>
      </section>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 64px" }}>
        <section
          style={{
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

        <section style={{ marginTop: 24 }}>
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
      </main>
    </div>
  );
}