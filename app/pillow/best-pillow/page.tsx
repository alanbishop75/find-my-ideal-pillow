import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import { pillowBuyLinks } from "../../../config/pillow/buy-links";
import { products } from "../../../config/pillow/products";

const NAVY = "#1a1a3e";
const LAVENDER = "#9b87bc";
const SURFACE = "#f5f3f8";
const BORDER = "#e6e1ec";
const TEXT = "#1a1a3e";
const TEXT2 = "#5a5478";

const quickBuyBySlug: Record<string, { productId: string; bestFor: string; buttonLabel: string }> = {
  "best-pillow-for-side-sleepers": {
    productId: "talatex-adjustable-cervical",
    bestFor: "Built for side sleepers who need more loft and support control.",
    buttonLabel: "Buy Talatex now",
  },
  "best-pillow-for-back-sleepers": {
    productId: "snuggledown-hungarian-goose-down",
    bestFor: "Built for a medium-loft, softer preset that suits back sleeping.",
    buttonLabel: "Buy Snuggledown now",
  },
  "best-pillow-for-stomach-sleepers": {
    productId: "martian-dreams-velistra-2pack",
    bestFor: "Built for a lower, softer feel that is easier for stomach sleepers.",
    buttonLabel: "Buy Velistra now",
  },
  "best-pillow-for-combination-sleepers": {
    productId: "aeyla-dual-adjustable-pillow",
    bestFor: "Built for flexible loft and all-position switching through the night.",
    buttonLabel: "Buy Aeyla now",
  },
  "best-pillow-for-neck-pain": {
    productId: "gluckstoff-orthopedic-neck",
    bestFor: "Built for structured neck support and a more cervical-friendly shape.",
    buttonLabel: "Buy Glückstoff now",
  },
  "best-pillow-for-snoring": {
    productId: "gluckstoff-orthopedic-neck",
    bestFor: "Built for steadier neck support that keeps the airway area more aligned.",
    buttonLabel: "Buy Glückstoff now",
  },
  "best-pillow-for-allergies": {
    productId: "silentnight-anti-allergy",
    bestFor: "Built for hypoallergenic hollowfibre and easy-care buying.",
    buttonLabel: "Buy Silentnight now",
  },
  "best-cooling-pillow": {
    productId: "martian-made-coolbreeze-hybrid",
    bestFor: "Built for cooling gel comfort and better airflow overnight.",
    buttonLabel: "Buy CoolBreeze now",
  },
  "best-memory-foam-pillow": {
    productId: "silentnight-adjustable-memory-foam",
    bestFor: "Built for contouring support with adjustable memory foam fill.",
    buttonLabel: "Buy Silentnight now",
  },
  "best-down-pillow": {
    productId: "snuggledown-hungarian-goose-down",
    bestFor: "Built for premium down feel and breathable natural fill.",
    buttonLabel: "Buy Snuggledown now",
  },
  "firm-vs-soft-pillow-which-is-right-for-you": {
    productId: "aeyla-dual-adjustable-pillow",
    bestFor: "Built for comparing firmer and softer feel with adjustable support.",
    buttonLabel: "Buy Aeyla now",
  },
  "best-budget-pillow-under-30": {
    productId: "slumberdown-hotel-quality-firm",
    bestFor: "Built for value-first support without pushing the budget too far.",
    buttonLabel: "Buy Slumberdown now",
  },
  "best-pillow-for-hot-sleepers": {
    productId: "talatex-natural-dunlop-latex",
    bestFor: "Built for breathable latex and a cooler sleep surface.",
    buttonLabel: "Buy Talatex latex now",
  },
  "best-pillow-for-shoulder-pain": {
    productId: "winthome-memory-foam-neck",
    bestFor: "Built for structured shoulder and neck support.",
    buttonLabel: "Buy Winthome now",
  },
  "best-latex-pillow": {
    productId: "talatex-natural-dunlop-latex",
    bestFor: "Built for breathable latex support and springy resilience.",
    buttonLabel: "Buy Talatex now",
  },
};

const quickBuyReasonBySlug: Record<string, string> = {
  "best-pillow-for-side-sleepers": "We use Talatex here because side sleepers usually need the most control over loft and support.",
  "best-pillow-for-back-sleepers": "We use Snuggledown here because back sleepers usually do best with medium loft and softer support.",
  "best-pillow-for-stomach-sleepers": "We use Velistra here because stomach sleepers usually need a lower, softer setup.",
  "best-pillow-for-combination-sleepers": "We use Aeyla here because combination sleepers need a pillow that adapts as they move.",
  "best-pillow-for-neck-pain": "We use Glückstoff here because the page is about structured cervical support.",
  "best-pillow-for-snoring": "We use Glückstoff here because steadier neck support is the most relevant preset for this topic.",
  "best-pillow-for-allergies": "We use Silentnight Anti Allergy here because allergy-first shoppers need a hypoallergenic baseline.",
  "best-cooling-pillow": "We use CoolBreeze here because this page is specifically about cooling and airflow.",
  "best-memory-foam-pillow": "We use Silentnight Adjustable Memory Foam here because memory foam buyers usually want contouring plus adjustability.",
  "best-down-pillow": "We use Snuggledown here because this page is about premium down feel and breathable natural fill.",
  "firm-vs-soft-pillow-which-is-right-for-you": "We use Aeyla here because dual-sided adjustability is the cleanest way to compare firmness feel.",
  "best-budget-pillow-under-30": "We use Slumberdown here because it is a strong value-first preset for the budget page.",
  "best-pillow-for-hot-sleepers": "We use Talatex latex here because breathable latex is the best preset for hot sleepers.",
  "best-pillow-for-shoulder-pain": "We use Winthome here because shoulder pain pages need more structured support.",
  "best-latex-pillow": "We use Talatex here because this page is about latex support and airflow.",
};

const quickBuyGuides = [
  "best-pillow-for-side-sleepers",
  "best-pillow-for-back-sleepers",
  "best-pillow-for-stomach-sleepers",
  "best-pillow-for-combination-sleepers",
  "best-pillow-for-neck-pain",
  "best-cooling-pillow",
];

function HubQuickBuySection() {
  return (
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
      <h2 style={{ margin: "0 0 8px", fontSize: 22, color: NAVY }}>Quick Buy starting points</h2>
      <p style={{ margin: "0 0 16px", color: TEXT2, lineHeight: 1.7 }}>
        These are the most common starting points we see. Each card links to a full guide and the preset product we have assigned to that topic.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {quickBuyGuides.map((slug) => {
          const guide = pillowSeoPageMap[slug];
          const recommendation = quickBuyBySlug[slug];
          const product = recommendation ? products.find((item) => item.id === recommendation.productId) : undefined;
          const buyLink = recommendation ? pillowBuyLinks[recommendation.productId]?.UK[0]?.url ?? pillowBuyLinks[recommendation.productId]?.US[0]?.url : undefined;

          if (!guide || !recommendation || !product) return null;

          return (
            <article
              key={slug}
              style={{
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: 14,
                background: SURFACE,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: NAVY,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Quick Buy
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  width={72}
                  height={72}
                  style={{ objectFit: "contain", borderRadius: 8, background: "#ffffff", flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: NAVY, lineHeight: 1.3 }}>
                    {guide.h1}
                  </h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: TEXT2, lineHeight: 1.45 }}>
                    {recommendation.bestFor}
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: TEXT2, lineHeight: 1.5 }}>
                {quickBuyReasonBySlug[slug]}
              </p>
              <Link
                href={`/pillow/${slug}`}
                style={{ color: NAVY, textDecoration: "none", fontSize: 13, fontWeight: 700 }}
              >
                Open the full guide →
              </Link>
              <a
                href={buyLink ?? `/pillow/${slug}`}
                target={buyLink ? "_blank" : undefined}
                rel={buyLink ? "sponsored nofollow noopener noreferrer" : undefined}
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: LAVENDER,
                  color: NAVY,
                  borderRadius: 999,
                  padding: "11px 14px",
                  fontWeight: 800,
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                {recommendation.buttonLabel}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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
          <p style={{ margin: "16px 0 8px", color: TEXT2, lineHeight: 1.7 }}>
            This guide is designed to help you compare the best pillows for different sleep types,
            then decide whether you want a quick preset recommendation or a more tailored fitting result.
          </p>
          <p style={{ margin: 0, color: TEXT2, lineHeight: 1.7 }}>
            Factors such as sleep position, body frame, firmness preference, support needs, and temperature
            can all influence which pillow performs best for you. Start with the overview below, then use Quick Buy or the
            fitting quiz depending on how much guidance you want.
          </p>
        </section>

        <section
          style={{
            marginTop: 24,
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

        <HubQuickBuySection />

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

        <section
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
          </Link>
        </section>
      </main>
    </div>
  );
}