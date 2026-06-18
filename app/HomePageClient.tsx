"use client";

import Link from "next/link";
import Image from "next/image";
import { useRegion } from "../core/geo/RegionContext";
import { getHomepageIntro } from "../core/geo/content";

const NAVY = "#1a1a3e";
const LAVENDER = "#9b87bc";
const WHITE = "#ffffff";
const SURFACE = "#f5f3f8";
const BORDER = "#e6e1ec";
const TEXT_PRIMARY = "#1a1a3e";
const TEXT_SECONDARY = "#5a5478";

export default function HomePageClient() {
  const { region, isLoading } = useRegion();
  const intro = getHomepageIntro(isLoading ? "UK" : region);
  const popularGuides = [
    { href: "/pillow/best-pillow-for-side-sleepers", label: "Side sleepers" },
    { href: "/pillow/best-pillow-for-neck-pain", label: "Neck pain" },
    { href: "/pillow/best-pillow-for-back-sleepers", label: "Back sleepers" },
    { href: "/pillow/best-pillow-for-hot-sleepers", label: "Hot sleepers" },
    { href: "/pillow/best-pillow-for-shoulder-pain", label: "Shoulder pain" },
    { href: "/pillow/best-memory-foam-pillow", label: "Memory foam" },
  ];

  const features = [
    { icon: "📋", title: "Quick & easy", text: "A few quick questions, under 2 minutes" },
    { icon: "🎯", title: "Personalised picks", text: "Scored against how you sleep" },
    { icon: "🌙", title: "Better support", text: "Right pillow. Better sleep." },
    { icon: "💷", title: "Every budget", text: "From value to premium" },
  ];

  return (
    <div style={{ width: "100%", background: SURFACE }}>
      {/* HERO — centred stack: logo, headline, supporting text, CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #2e2b5e 0%, #3d3875 55%, #4a4490 100%)",
          color: "#ffffff",
          padding: "48px 20px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative accent rings */}
        <div aria-hidden style={{ position: "absolute", top: -100, right: -100, width: 340, height: 340, borderRadius: "50%", border: `2px solid ${LAVENDER}`, opacity: 0.15 }} />
        <div aria-hidden style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: LAVENDER, opacity: 0.07 }} />

        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          {/* Logo — visual anchor at top */}
          <Image
            src="/images/logo.PNG"
            alt="Find Your Ideal Pillow"
            width={120}
            height={120}
            priority
            style={{
              borderRadius: "50%",
              display: "block",
              boxShadow: "0 12px 40px -8px rgba(0,0,0,0.5)",
            }}
          />

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              margin: 0,
              letterSpacing: -0.8,
              lineHeight: 1.1,
            }}
          >
            Find Your <span style={{ color: LAVENDER }}>Ideal Pillow</span>
          </h1>

          {/* Intro paragraph — capped for readable line length */}
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 17px)",
              color: "rgba(255,255,255,0.78)",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            {intro}
          </p>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Link
                href="/pillow/questionnaire"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: LAVENDER,
                  color: NAVY,
                  borderRadius: 999,
                  padding: "16px 40px",
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                  letterSpacing: 0.2,
                  boxShadow: "0 8px 24px -8px rgba(155,135,188,0.6)",
                }}
              >
                Start fitting
              </Link>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Fitting in less than a minute</span>
            </div>
            <span style={{ fontWeight: 700, color: "#ffffff", fontSize: 16, display: "flex", alignItems: "center", paddingTop: 14 }}>Or</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Link
                href="/pillow/best-pillow#quick-buy-starting-points"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: LAVENDER,
                  color: NAVY,
                  borderRadius: 999,
                  padding: "16px 40px",
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                  letterSpacing: 0.2,
                  boxShadow: "0 8px 24px -8px rgba(155,135,188,0.6)",
                }}
              >
                Quick Buy
              </Link>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Top-rated picks, ready to buy</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section style={{ background: SURFACE, padding: "28px 20px", borderBottom: `1px solid ${BORDER}` }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {features.map(({ icon, title, text }) => (
            <div
              key={title}
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 14,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "32px 20px 16px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: TEXT_PRIMARY,
              textAlign: "center",
              margin: "0 0 32px 0",
              letterSpacing: -0.5,
            }}
          >
            How it works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { step: "1", text: "Answer a few quick questions about how you sleep" },
              { step: "2", text: "Our engine scores every pillow against your answers" },
              { step: "3", text: "Get your personalised top picks — free, instantly" },
            ].map(({ step, text }) => (
              <div
                key={step}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: "22px 22px 24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    background: LAVENDER,
                    color: NAVY,
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {step}
                </span>
                <p style={{ margin: 0, fontSize: 15, color: TEXT_PRIMARY, lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR GUIDES */}
      {popularGuides.length > 0 && (
        <section style={{ padding: "24px 20px 48px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }} aria-label="Popular pillow guides">
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: TEXT_PRIMARY,
                margin: "0 0 16px 0",
                textAlign: "center",
              }}
            >
              Popular pillow guides
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {popularGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: TEXT_PRIMARY,
                    background: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 999,
                    padding: "10px 16px",
                    textDecoration: "none",
                  }}
                >
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

