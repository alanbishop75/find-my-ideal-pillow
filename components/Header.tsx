"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const guideLinks = [
  { href: "/pillow/best-pillow", label: "Best Pillow (Overview)" },
  { href: "/pillow/best-pillow-for-side-sleepers", label: "Side sleepers" },
  { href: "/pillow/best-pillow-for-back-sleepers", label: "Back sleepers" },
  { href: "/pillow/best-pillow-for-stomach-sleepers", label: "Stomach sleepers" },
  { href: "/pillow/best-pillow-for-combination-sleepers", label: "Combination sleepers" },
  { href: "/pillow/best-pillow-for-neck-pain", label: "Neck pain" },
  { href: "/pillow/best-pillow-for-snoring", label: "Snoring" },
  { href: "/pillow/best-pillow-for-allergies", label: "Allergies" },
  { href: "/pillow/best-cooling-pillow", label: "Cooling" },
  { href: "/pillow/best-pillow-for-shoulder-pain", label: "Shoulder pain" },
  { href: "/pillow/best-pillow-for-hot-sleepers", label: "Hot sleepers" },
  { href: "/pillow/best-memory-foam-pillow", label: "Memory foam" },
  { href: "/pillow/best-down-pillow", label: "Down" },
  { href: "/pillow/best-latex-pillow", label: "Latex" },
  { href: "/pillow/firm-vs-soft-pillow-which-is-right-for-you", label: "Firm vs soft" },
  { href: "/pillow/best-budget-pillow-under-30", label: "Budget under £30" },
];

export function Header() {
  const pathname = usePathname();
  const isQuizPage = Boolean(pathname && pathname.split("/").filter(Boolean).includes("questionnaire"));

  if (pathname === "/") return null;
  // Hide on SEO landing pages: /pillow/<slug> where slug is not questionnaire/results.
  if (pathname) {
    const seg = pathname.split("/").filter(Boolean);
    if (seg[0] === "pillow" && seg.length === 2 && seg[1] !== "questionnaire" && seg[1] !== "results") {
      return null;
    }
  }
  return (
    <header
      style={{
        background: "#1a1a3e",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 0",
        boxShadow: "0 4px 16px -8px rgba(26,26,62,0.25)",
        position: "relative",
      }}
    >
      {isQuizPage && (
        <nav
          aria-label="Pillow guides"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <details style={{ position: "relative" }}>
            <summary
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                listStyle: "none",
                background: "#9b87bc",
                color: "#1a1a3e",
                borderRadius: 999,
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: 14,
                whiteSpace: "nowrap",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Pillow Guides
            </summary>
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                minWidth: 240,
                background: "#ffffff",
                borderRadius: 12,
                boxShadow: "0 10px 24px -8px rgba(26,26,62,0.25)",
                border: "1px solid #e6e1ec",
                padding: "8px 0",
              }}
            >
              {guideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    color: "#1a1a3e",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                  onClick={(event) => {
                    const details = event.currentTarget.closest("details");
                    if (details) details.removeAttribute("open");
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      )}
      <Link
        href="/"
        aria-label="Find Your Ideal Pillow — home"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          textDecoration: "none",
        }}
      >
        <Image
          src="/images/logo.PNG"
          alt="Find Your Ideal Pillow"
          width={80}
          height={80}
          priority
          style={{ borderRadius: "50%", display: "block" }}
        />
        <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 18, letterSpacing: -0.2 }}>
          FindYourIdealPillow
        </span>
      </Link>
    </header>
  );
}
