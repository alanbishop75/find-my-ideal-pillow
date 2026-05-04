"use client";
import Image from "next/image";
import type { PillowSeoPage } from "../../../config/pillow/seo-pages";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";

const NAVY     = "#1a1a3e";
const LAVENDER = "#9b87bc";
const WHITE    = "#ffffff";
const SURFACE  = "#f5f3f8";
const BORDER   = "#e6e1ec";
const TEXT2    = "#5a5478";

function formatReviewDate(iso: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

export default function PillowSeoLandingPage({ page }: { page: PillowSeoPage }) {
  const quizHref = `/pillow/questionnaire?ref=${page.slug}`;
  const related = page.relatedSlugs
    .map((slug) => pillowSeoPageMap[slug])
    .filter((relatedPage): relatedPage is PillowSeoPage => Boolean(relatedPage));

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
    <a
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
    </a>
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
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 6px" }}>›</span>
          <a href="/pillow/questionnaire" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Pillow finder</a>
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
              src="/images/pillowLogo.PNG"
              alt="Find My Ideal Pillow"
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
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }} className="seo-hero-cta">
              {ctaButton("Find My Perfect Pillow")}
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
              { label: "Personalised", sub: "to how you sleep" },
              { label: "2 minutes", sub: "start to finish" },
              { label: "Independent", sub: "no brand bias" },
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

          <section style={cardStyle}>
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
        </article>

        {related.length > 0 && (
          <aside style={{ ...cardStyle, borderLeft: `4px solid ${BORDER}` }} aria-label="Related guides">
            <h2 style={h2Style}>Related guides</h2>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <a
                    href={`/pillow/${relatedPage.slug}`}
                    style={{ color: LAVENDER, textDecoration: "none", fontSize: 15, fontWeight: 600 }}
                  >
                    {relatedPage.h1} →
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
