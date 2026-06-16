"use client";

import Image from "next/image";
import Link from "next/link";
import { useRegion } from "../../../core/geo/RegionContext";
import { getRegionLinks } from "../../../config/pillow/buy-links";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import { products } from "../../../config/pillow/products";

const NAVY = "#1a1a3e";
const LAVENDER = "#9b87bc";
const SURFACE = "#f5f3f8";
const BORDER = "#e6e1ec";
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
    buttonLabel: "Buy Gluckstoff now",
  },
  "best-pillow-for-snoring": {
    productId: "gluckstoff-orthopedic-neck",
    bestFor: "Built for steadier neck support that keeps the airway area more aligned.",
    buttonLabel: "Buy Gluckstoff now",
  },
  "best-cooling-pillow": {
    productId: "martian-made-coolbreeze-hybrid",
    bestFor: "Built for cooling gel comfort and better airflow overnight.",
    buttonLabel: "Buy CoolBreeze now",
  },
};

const quickBuyReasonBySlug: Record<string, string> = {
  "best-pillow-for-side-sleepers": "We use Talatex here because side sleepers usually need the most control over loft and support.",
  "best-pillow-for-back-sleepers": "We use Snuggledown here because back sleepers usually do best with medium loft and softer support.",
  "best-pillow-for-stomach-sleepers": "We use Velistra here because stomach sleepers usually need a lower, softer setup.",
  "best-pillow-for-combination-sleepers": "We use Aeyla here because combination sleepers need a pillow that adapts as they move.",
  "best-pillow-for-neck-pain": "We use Gluckstoff here because the page is about structured cervical support.",
  "best-pillow-for-snoring": "We use Gluckstoff here because steadier neck support is the most relevant preset for this topic.",
  "best-cooling-pillow": "We use CoolBreeze here because this page is specifically about cooling and airflow.",
};

const quickBuyGuides = [
  "best-pillow-for-side-sleepers",
  "best-pillow-for-back-sleepers",
  "best-pillow-for-stomach-sleepers",
  "best-pillow-for-combination-sleepers",
  "best-pillow-for-neck-pain",
  "best-cooling-pillow",
];

export default function HubQuickBuySection() {
  const { region, isLoading } = useRegion();
  const displayRegion = isLoading ? "UK" : region;

  return (
    <section
      id="quick-buy-starting-points"
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
          const links = recommendation ? getRegionLinks(recommendation.productId, displayRegion) : [];
          const buyLink = links.find((link) => link.retailerKey === "amazon-uk" || link.retailerKey === "amazon-us")?.url
            ?? getRegionLinks(recommendation?.productId ?? "", "UK").find((link) => link.retailerKey === "amazon-uk")?.url;

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
