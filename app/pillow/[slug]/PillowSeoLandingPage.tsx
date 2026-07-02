"use client";
import Image from "next/image";
import Link from "next/link";
import { useRegion } from "../../../core/geo/RegionContext";
import { getRegionLinks } from "../../../config/pillow/buy-links";
import type { PillowSeoPage } from "../../../config/pillow/seo-pages";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import { products } from "../../../config/pillow/products";

const NAVY     = "#1a1a3e";
const LAVENDER = "#9b87bc";
const WHITE    = "#ffffff";
const SURFACE  = "#f5f3f8";
const BORDER   = "#e6e1ec";
const TEXT2    = "#5a5478";

const quickBuyBySlug: Record<string, { productId: string; bestFor: string; buttonLabel: string }> = {
  "best-pillow-for-side-sleepers": {
    productId: "talatex-adjustable-cervical",
    bestFor: "Built for adjustable side-sleeper support and better loft control.",
    buttonLabel: "Buy Talatex now",
  },
  "best-pillow-for-back-sleepers": {
    productId: "snuggledown-hungarian-goose-down",
    bestFor: "Built for medium loft and softer support for back sleeping.",
    buttonLabel: "Buy Snuggledown now",
  },
  "best-pillow-for-stomach-sleepers": {
    productId: "martian-dreams-velistra-2pack",
    bestFor: "Built for a lower, softer feel that suits stomach sleepers better.",
    buttonLabel: "Buy Velistra now",
  },
  "best-pillow-for-combination-sleepers": {
    productId: "aeyla-dual-adjustable-pillow",
    bestFor: "Built for flexible loft and a shape that adapts as you move.",
    buttonLabel: "Buy Aeyla now",
  },
  "best-pillow-for-neck-pain": {
    productId: "gluckstoff-orthopedic-neck",
    bestFor: "Built for firmer cervical support and more structured neck alignment.",
    buttonLabel: "Buy Glückstoff now",
  },
  "best-pillow-for-snoring": {
    productId: "gluckstoff-orthopedic-neck",
    bestFor: "Built for a steadier neck position and anti-snore support.",
    buttonLabel: "Buy Glückstoff now",
  },
  "best-pillow-for-allergies": {
    productId: "silentnight-anti-allergy",
    bestFor: "Built for hypoallergenic hollowfibre and allergy-first buying.",
    buttonLabel: "Buy Silentnight now",
  },
  "best-cooling-pillow": {
    productId: "martian-made-coolbreeze-hybrid",
    bestFor: "Built for cooling gel comfort and better airflow through the night.",
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
    bestFor: "Built for comparing firmer and softer feels with adjustable support.",
    buttonLabel: "Buy Aeyla now",
  },
  "best-budget-pillow-under-30": {
    productId: "slumberdown-hotel-quality-firm",
    bestFor: "Built for value-first support without stretching the budget.",
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

function productMatchesTopic(product: (typeof products)[number], slug: string): number {
  let score = 0;

  const attrs = product.attributes;
  const sleepPosition = attrs?.sleepPosition;

  if (slug.includes("side-sleepers") && (sleepPosition === "side" || sleepPosition === "combination" || sleepPosition === "any")) score += 4;
  if (slug.includes("back-sleepers") && (sleepPosition === "back" || sleepPosition === "combination" || sleepPosition === "any")) score += 4;
  if (slug.includes("stomach-sleepers") && (sleepPosition === "stomach" || sleepPosition === "combination" || sleepPosition === "any")) score += 4;
  if (slug.includes("combination-sleepers") && (sleepPosition === "combination" || sleepPosition === "any")) score += 4;

  if (slug.includes("neck-pain") || slug.includes("snoring") || slug.includes("shoulder-pain")) {
    if (attrs?.support === "enhanced") score += 3;
    if (attrs?.firmness === "firm") score += 2;
  }

  if ((slug.includes("cooling") || slug.includes("hot-sleepers")) && attrs?.cooling) score += 4;
  if (slug.includes("allergies") && attrs?.hypoallergenic) score += 4;
  if (slug.includes("memory-foam") && attrs?.fill === "memory-foam") score += 4;
  if (slug.includes("down-pillow") && attrs?.fill === "natural-down") score += 4;
  if (slug.includes("latex-pillow") && attrs?.fill === "latex") score += 4;
  if (slug.includes("budget") && attrs?.priceTier === "budget") score += 4;

  if (slug.includes("firm-vs-soft")) {
    if (attrs?.firmness === "firm" || attrs?.firmness === "medium") score += 2;
    if (attrs?.adjustable) score += 2;
  }

  if (attrs?.priceTier === "mid") score += 1;
  if (attrs?.adjustable) score += 1;

  return score;
}

function formatFill(fill: string | undefined): string {
  if (!fill) return "General support";
  return fill
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getStringAttr(attrs: Record<string, string | number | boolean>, key: string): string | undefined {
  const value = attrs[key];
  return typeof value === "string" ? value : undefined;
}

function getBoolAttr(attrs: Record<string, string | number | boolean>, key: string): boolean {
  return attrs[key] === true;
}

function buildRankedOptions(slug: string): (typeof products)[number][] {
  const quickBuyProductId = quickBuyBySlug[slug]?.productId;
  const quickBuyProduct = quickBuyProductId ? products.find((item) => item.id === quickBuyProductId) : null;

  const rankedPool = [...products]
    .sort((a, b) => productMatchesTopic(b, slug) - productMatchesTopic(a, slug))
    .filter((item, index, all) => all.findIndex((p) => p.id === item.id) === index);

  const top = quickBuyProduct
    ? [quickBuyProduct, ...rankedPool.filter((item) => item.id !== quickBuyProduct.id)]
    : rankedPool;

  return top.slice(0, 3);
}

function attributeChips(product: (typeof products)[number]): string[] {
  const attrs = product.attributes;
  if (!attrs) return [];

  const fill = getStringAttr(attrs, "fill");
  const firmness = getStringAttr(attrs, "firmness");
  const cooling = getBoolAttr(attrs, "cooling");

  const chips: string[] = [];
  chips.push(`${formatFill(fill)} fill`);
  chips.push(`${(firmness ?? "balanced").replace("-", " ")} feel`);
  chips.push(cooling ? "Cooling profile" : "Neutral temperature");
  return chips;
}

function bestForLine(product: (typeof products)[number]): string {
  const attrs = product.attributes;
  if (!attrs) return "Strong all-round option for common sleep profiles.";

  const sleepPosition = getStringAttr(attrs, "sleepPosition");
  const support = getStringAttr(attrs, "support");
  const position = sleepPosition === "any" ? "multiple sleep positions" : `${sleepPosition ?? "mixed"} sleepers`;
  return `Best for ${position} who want ${support === "enhanced" ? "structured support" : "balanced comfort"}.`;
}

function reasonLine(product: (typeof products)[number]): string {
  const attrs = product.attributes;
  if (!attrs) return "Included for stable everyday performance and value.";
  if (getBoolAttr(attrs, "cooling")) return "Included for better heat control and overnight comfort consistency.";
  if (getBoolAttr(attrs, "hypoallergenic")) return "Included for allergy-aware materials and easier maintenance.";
  if (getBoolAttr(attrs, "adjustable")) return "Included for adjustable loft so you can tune support over time.";
  return "Included for reliable support, straightforward setup, and dependable value.";
}

function formatReviewDate(iso: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

function QuickBuySection({ pageSlug }: { pageSlug: string }) {
  const { region, isLoading } = useRegion();
  const recommendation = quickBuyBySlug[pageSlug];

  if (!recommendation) return null;

  const product = products.find((item) => item.id === recommendation.productId);
  if (!product) return null;

  const displayRegion = isLoading ? "UK" : region;
  const links = getRegionLinks(product.id, displayRegion);
  const amazonLink = links.find((link) => link.retailerKey === "amazon-uk" || link.retailerKey === "amazon-us")?.url ?? getRegionLinks(product.id, "UK").find((link) => link.retailerKey === "amazon-uk")?.url;

  return (
    <section
      id="quick-buy-starting-point"
      className="quick-buy-grid"
      style={{
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 14,
        alignItems: "stretch",
      }}
    >
      <aside
        style={{
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: "14px 14px",
          background: "#fbf9fc",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minHeight: 360,
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
            background: "#efe8f5",
            borderRadius: 999,
            padding: "6px 10px",
            alignSelf: "flex-start",
          }}
        >
          Quick Buy vs Quiz
        </p>
        <h3 style={{ margin: 0, fontSize: 18, color: NAVY, lineHeight: 1.25 }}>
          Choose the preset top pick, or use the quiz for a deeper fit
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: TEXT2, lineHeight: 1.7 }}>
          <strong>Quick Buy</strong> is the fastest path when you already know the page topic. It shows the preset pillow we have assigned to this guide, so you can jump straight to a recommended option.
        </p>
        <p style={{ margin: 0, fontSize: 13, color: TEXT2, lineHeight: 1.7 }}>
          <strong>Quiz</strong> is better if you want us to weigh up your sleep position, support needs, temperature preference and budget before recommending a pillow.
        </p>
        <Link
          href="/pillow/questionnaire?ref=quick-buy-vs-quiz"
          style={{
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: NAVY,
            color: "#ffffff",
            borderRadius: 999,
            padding: "12px 16px",
            fontWeight: 800,
            textDecoration: "none",
            width: "100%",
          }}
        >
          Take the fitting quiz
        </Link>
      </aside>

      <article
        style={{
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: "14px 14px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 360,
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
            background: "#efe8f5",
            borderRadius: 999,
            padding: "6px 10px",
            alignSelf: "flex-start",
          }}
        >
          Quick Buy
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            width={90}
            height={90}
            style={{ objectFit: "contain", borderRadius: 8, flexShrink: 0, background: SURFACE }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: NAVY }}>
              {product.brand} {product.name}
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: TEXT2, fontWeight: 700, lineHeight: 1.4 }}>
              {recommendation.bestFor}
            </p>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: 13, color: TEXT2, lineHeight: 1.5 }}>
          {quickBuyReasonBySlug[pageSlug] ?? "This is the preset Quick Buy choice for this topic."}
        </p>

        <p style={{ margin: 0, fontSize: 13, color: TEXT2 }}>
          {typeof product.attributes?.rrp === "number" ? `Approx. £${product.attributes.rrp}/item` : "Check latest price"}
        </p>

        <Link href={`/pillow/${pageSlug}`} style={{ margin: 0, fontSize: 13, color: NAVY, fontWeight: 700, textDecoration: "none" }}>
          Read full guide for this topic →
        </Link>

        <a
          href={amazonLink ?? "#"}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
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
          View on Amazon
        </a>
      </article>
    </section>
  );
}

export default function PillowSeoLandingPage({ page }: { page: PillowSeoPage }) {
  const quizHref = `/pillow/questionnaire?ref=${page.slug}`;
  const related = page.relatedSlugs
    .map((slug) => pillowSeoPageMap[slug])
    .filter((relatedPage): relatedPage is PillowSeoPage => Boolean(relatedPage));
  const rankedOptions = buildRankedOptions(page.slug);

  const cardStyle: React.CSSProperties = {
    background: WHITE,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: "24px 28px",
    marginTop: 20,
    borderLeft: `4px solid ${LAVENDER}`,
  };

  const h2Style: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    color: NAVY,
    margin: "0 0 14px 0",
    lineHeight: 1.3,
  };

  const h3Style: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: NAVY,
    margin: "18px 0 6px 0",
    lineHeight: 1.35,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: 15,
    color: TEXT2,
    lineHeight: 1.75,
    margin: 0,
  };

  const ctaButton = (label: string) => (
    <Link
      href={quizHref}
      style={{
        marginTop: 8,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: LAVENDER,
        color: NAVY,
        borderRadius: 999,
        padding: "14px 30px",
        fontWeight: 800,
        fontSize: 16,
        textDecoration: "none",
        letterSpacing: 0.2,
        boxShadow: "0 8px 24px -8px rgba(155,135,188,0.5)",
      }}
    >
      {label}
    </Link>
  );

  return (
    <div style={{ width: "100%", background: SURFACE }}>
      <style>{`
        @media (max-width: 640px) {
          .seo-hero-row { justify-content: center !important; }
          .seo-hero-logo { margin: 0 auto; }
          .seo-hero-text { text-align: center !important; }
          .seo-hero-text p { margin-left: auto !important; margin-right: auto !important; }
          .seo-hero-cta { justify-content: center !important; }
          .quick-buy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO — navy gradient, logo left */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a3e 0%, #221f4a 55%, #2c2855 100%)",
          color: "#ffffff",
          padding: "48px 20px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", border: `2px solid ${LAVENDER}`, opacity: 0.18 }} />

        {/* Breadcrumb */}
        <div style={{ maxWidth: 900, margin: "0 auto 24px", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 6px" }}>›</span>
          <Link href="/pillow/questionnaire" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Pillow finder</Link>
          <span style={{ margin: "0 6px" }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{page.breadcrumbLabel}</span>
        </div>

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
          className="seo-hero-row"
        >
          {/* Logo */}
          <div style={{ flexShrink: 0 }} className="seo-hero-logo">
            <Image
              src="/images/logo.PNG"
              alt="Find Your Ideal Pillow"
              width={120}
              height={120}
              style={{ borderRadius: "50%", display: "block", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}
            />
          </div>

          {/* Heading + CTA */}
          <div style={{ flex: "1 1 280px" }} className="seo-hero-text">
            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 42px)",
                fontWeight: 800,
                margin: "0 0 12px 0",
                letterSpacing: -0.8,
                lineHeight: 1.1,
              }}
            >
              {page.h1}
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", margin: "0 0 24px", lineHeight: 1.55, maxWidth: 520 }}>
              {page.intro}
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }} className="seo-hero-cta">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                {ctaButton("Start Quiz")}
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>OR</span>
                <Link
                  href="#quick-buy-starting-point"
                  style={{
                    marginTop: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: LAVENDER,
                    color: NAVY,
                    borderRadius: 999,
                    padding: "14px 30px",
                    fontWeight: 800,
                    fontSize: 16,
                    textDecoration: "none",
                    letterSpacing: 0.2,
                    boxShadow: "0 8px 24px -8px rgba(155,135,188,0.5)",
                  }}
                >
                  Quick Buy
                </Link>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Under 2 minutes · No sign-up</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 20px 64px",
        }}
      >
        <article>

          {/* Mini stats */}
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              textAlign: "center",
            }}
          >
            {[
              { icon: "🎯", label: "Personalised", sub: "to how you sleep" },
              { icon: "⏱️", label: "2 minutes", sub: "start to finish" },
              { icon: "📋", label: "Independent", sub: "no brand bias" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#ffffff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "16px 8px",
                }}
              >
                <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }} aria-hidden>
                  {item.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>{item.label}</div>
                <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {page.whoItsFor.length > 0 && (
            <section style={cardStyle}>
              <h2 style={h2Style}>Is this guide for you?</h2>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {page.whoItsFor.map((line, index) => (
                  <li key={index} style={bodyStyle}>{line}</li>
                ))}
              </ul>
            </section>
          )}

          <section style={cardStyle} id="jump-to-a-section">
            <h2 style={h2Style}>Jump to a section</h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={bodyStyle}><Link href="#quick-verdict" style={{ color: NAVY, textDecoration: "none", fontWeight: 700 }}>Quick verdict</Link></li>
              <li style={bodyStyle}><Link href="#best-options-at-a-glance" style={{ color: NAVY, textDecoration: "none", fontWeight: 700 }}>Best options at a glance</Link></li>
              <li style={bodyStyle}><Link href="#how-we-ranked" style={{ color: NAVY, textDecoration: "none", fontWeight: 700 }}>How we ranked these options</Link></li>
              <li style={bodyStyle}><Link href="#quick-buy-starting-point" style={{ color: NAVY, textDecoration: "none", fontWeight: 700 }}>Quick Buy starting point</Link></li>
              <li style={bodyStyle}><Link href="#matching-quiz-works" style={{ color: NAVY, textDecoration: "none", fontWeight: 700 }}>How the matching quiz works</Link></li>
            </ul>
          </section>

          <section style={cardStyle} id="quick-verdict">
            <h2 style={h2Style}>Quick verdict</h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={bodyStyle}>If you want the fastest route, use the Quick Buy card for a ready-to-go preset recommendation.</li>
              <li style={bodyStyle}>If your needs span position, temperature, and support trade-offs, use the quiz for a more tailored shortlist.</li>
              <li style={bodyStyle}>For most shoppers, the best result is the option that balances support, temperature, and budget together.</li>
            </ul>
          </section>

          <section style={cardStyle} id="best-options-at-a-glance">
            <h2 style={h2Style}>Best options at a glance</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {rankedOptions.map((product, index) => (
                <article
                  key={product.id}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    padding: 14,
                    background: "#ffffff",
                    display: "grid",
                    gap: 6,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: NAVY, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    #{index + 1} option
                  </p>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: NAVY }}>
                    {product.brand} {product.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT2 }}>
                    {bestForLine(product)}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT2 }}>
                    {reasonLine(product)}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT2 }}>
                    {typeof product.attributes?.rrp === "number" ? `Approx. £${product.attributes.rrp}/item` : "Check latest price"}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                    {attributeChips(product).map((chip) => (
                      <span
                        key={chip}
                        style={{
                          border: `1px solid ${BORDER}`,
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          color: NAVY,
                          background: "#f8f6fb",
                          padding: "4px 10px",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section style={cardStyle} id="how-we-ranked">
            <h2 style={h2Style}>How we ranked these options</h2>
            <p style={bodyStyle}>
              We rank pillows by how well each product profile matches this page topic, then adjust for support consistency, temperature behavior, and practical budget fit.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={bodyStyle}>Topic fit first: sleep position and problem-specific relevance are weighted highest.</li>
              <li style={bodyStyle}>Comfort durability next: support type, firmness profile, and adjustability influence rank stability.</li>
              <li style={bodyStyle}>Value check always: we include realistic UK price context so picks are actionable, not theoretical.</li>
            </ul>
          </section>

          <QuickBuySection pageSlug={page.slug} />

          <section style={cardStyle}>
            <h2 style={h2Style}>Want the full pillow overview?</h2>
            <p style={bodyStyle}>
              If you want to compare the whole landscape before reading a specific guide,
              start with our central best pillow page.
            </p>
            <Link
              href="/pillow/best-pillow"
              style={{
                marginTop: 12,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: WHITE,
                color: NAVY,
                border: `1px solid ${BORDER}`,
                borderRadius: 999,
                padding: "10px 18px",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Read: Best Pillow guide →
            </Link>
          </section>

          <section style={cardStyle} id="matching-quiz-works">
            <h2 style={h2Style}>How the matching quiz works</h2>
            <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Answer a few quick questions about how you sleep",
                "We match against pillows verified on UK Amazon, scoring on fit, temperature and budget",
                "Get a shortlist with reasons — not a single pushed product",
              ].map((step, index) => (
                <li key={index} style={bodyStyle}>{step}</li>
              ))}
            </ol>
          </section>

          {page.sections.map((section, index) => (
            <section key={index} style={cardStyle}>
              <h2 style={h2Style}>{section.h2}</h2>
              {section.body ? <p style={bodyStyle}>{section.body}</p> : null}
              {section.subsections?.map((subsection, subsectionIndex) => (
                <div key={subsectionIndex}>
                  <h3 style={h3Style}>{subsection.h3}</h3>
                  <p style={bodyStyle}>{subsection.body}</p>
                </div>
              ))}
            </section>
          ))}

          {/* Mid-page CTA */}
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #1a1a3e 0%, #2c2855 100%)",
              border: "none",
              borderLeft: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: "#ffffff", fontSize: 18 }}>
              Ready to skip the research?
            </p>
            <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>
              Answer a few quick questions and we&apos;ll match you to pillows that fit
              your build, position and budget.
            </p>
            {ctaButton("Start the 2-minute quiz")}
          </div>

          {page.keyFactors.length > 0 && (
            <section style={cardStyle}>
              <h2 style={h2Style}>What our quiz looks at</h2>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {page.keyFactors.map((factor, index) => (
                  <li key={index} style={bodyStyle}>{factor}</li>
                ))}
              </ul>
            </section>
          )}

          {page.faq.length > 0 && (
            <section style={cardStyle}>
              <h2 style={h2Style}>Frequently asked questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {page.faq.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderTop: index > 0 ? `1px solid ${BORDER}` : "none",
                      paddingTop: index > 0 ? 16 : 0,
                    }}
                  >
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 6px 0" }}>
                      {item.q}
                    </p>
                    <p style={bodyStyle}>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <p
            style={{
              fontSize: 12,
              color: TEXT2,
              textAlign: "center",
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            Last reviewed: {formatReviewDate(page.lastReviewed)}. We update this guide when
            our verified pillow catalogue changes.
          </p>
          <p
            style={{
              fontSize: 12,
              color: TEXT2,
              textAlign: "center",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            Generated with GitHub Copilot.
          </p>
        </article>

        {related.length > 0 && (
          <aside style={{ ...cardStyle, borderLeft: `4px solid ${BORDER}` }} aria-label="Related guides">
            <h2 style={h2Style}>Related guides</h2>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link
                    href={`/pillow/${relatedPage.slug}`}
                    style={{ color: LAVENDER, textDecoration: "none", fontSize: 15, fontWeight: 600 }}
                  >
                    {relatedPage.h1} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
