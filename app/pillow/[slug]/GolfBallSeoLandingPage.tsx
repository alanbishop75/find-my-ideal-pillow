"use client";
import { useTheme } from "../../../core/theme";
import type { PillowSeoPage } from "../../../config/pillow/seo-pages";

export default function PillowSeoLandingPage({ page }: { page: PillowSeoPage }) {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100svh",
        background: tokens.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <main style={{ width: "100%", maxWidth: 560 }}>
        {/* Hero card */}
        <div
          style={{
            background: tokens.surface,
            border: `1px solid ${tokens.border}`,
            borderRadius: 16,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: tokens.textPrimary,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {page.h1}
          </h1>

          <p
            style={{
              fontSize: 15,
              color: tokens.textSecondary,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {page.intro}
          </p>

          <a
            href={`/pillow/questionnaire?ref=${page.slug}`}
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              background: tokens.accent,
              color: "#fff",
              borderRadius: 10,
              height: 52,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: "none",
              letterSpacing: 0.2,
            }}
          >
            Find My Perfect Pillow
          </a>

          <p
            style={{
              fontSize: 13,
              color: tokens.textSecondary,
              textAlign: "center",
              margin: 0,
            }}
          >
            Takes under 2 minutes · No sign-up required
          </p>
        </div>

        {/* Trust / context strip */}
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            textAlign: "center",
          }}
        >
          {[
            { icon: "🎯", label: "Personalised", sub: "to how you sleep" },
            { icon: "⚡", label: "2 minutes", sub: "start to finish" },
            { icon: "🆓", label: "Free", sub: "no sign-up needed" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: tokens.surface,
                border: `1px solid ${tokens.border}`,
                borderRadius: 12,
                padding: "14px 8px",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: tokens.textPrimary }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12, color: tokens.textSecondary }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div
          style={{
            marginTop: 28,
            background: tokens.surface,
            border: `1px solid ${tokens.border}`,
            borderRadius: 16,
            padding: "24px 28px",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: tokens.textPrimary,
              margin: "0 0 16px 0",
            }}
          >
            How the fitting quiz works
          </h2>
          <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Answer a few quick questions about how you sleep",
              "We analyse your sleep position, body heat, and priorities",
              "Get your personalised pillow recommendations",
            ].map((step, i) => (
              <li
                key={i}
                style={{ fontSize: 14, color: tokens.textSecondary, lineHeight: 1.5 }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Why it matters */}
        {page.whyItMatters && (
          <div
            style={{
              marginTop: 28,
              background: tokens.surface,
              border: `1px solid ${tokens.border}`,
              borderRadius: 16,
              padding: "24px 28px",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: tokens.textPrimary,
                margin: "0 0 12px 0",
              }}
            >
              Why pillow choice matters for {page.h1}
            </h2>
            <p style={{ fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              {page.whyItMatters}
            </p>
          </div>
        )}

        {/* Key factors */}
        {page.keyFactors && page.keyFactors.length > 0 && (
          <div
            style={{
              marginTop: 20,
              background: tokens.surface,
              border: `1px solid ${tokens.border}`,
              borderRadius: 16,
              padding: "24px 28px",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: tokens.textPrimary,
                margin: "0 0 14px 0",
              }}
            >
              What to look for
            </h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {page.keyFactors.map((factor, i) => (
                <li key={i} style={{ fontSize: 14, color: tokens.textSecondary, lineHeight: 1.6 }}>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {page.faq && page.faq.length > 0 && (
          <div
            style={{
              marginTop: 20,
              background: tokens.surface,
              border: `1px solid ${tokens.border}`,
              borderRadius: 16,
              padding: "24px 28px",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: tokens.textPrimary,
                margin: "0 0 18px 0",
              }}
            >
              Frequently asked questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {page.faq.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: i > 0 ? `1px solid ${tokens.border}` : "none",
                    paddingTop: i > 0 ? 16 : 0,
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600, color: tokens.textPrimary, margin: "0 0 6px 0" }}>
                    {item.q}
                  </p>
                  <p style={{ fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
