"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
          <Link
            href="/pillow/best-pillow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#9b87bc",
              color: "#1a1a3e",
              borderRadius: 999,
              padding: "8px 14px",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Pillow Guides
          </Link>
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
