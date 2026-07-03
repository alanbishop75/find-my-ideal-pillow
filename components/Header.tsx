"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useQuizAbandon } from "./QuizAbandonContext";

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
  const router = useRouter();
  const pathname = usePathname();
  const { abandonQuiz } = useQuizAbandon();

  // Hide the header on hero-led pages, where the page hero acts as the header:
  // homepage, the hub, SEO detail pages, and compare pages.
  if (pathname === "/") return null;
  if (pathname) {
    const seg = pathname.split("/").filter(Boolean);
    if (seg[0] === "pillow") {
      if (seg[1] === "compare") return null; // /pillow/compare/[slug]
      // hub (/pillow/best-pillow) + SEO detail (/pillow/[slug]);
      // questionnaire and results keep the header.
      if (seg.length === 2 && seg[1] !== "questionnaire" && seg[1] !== "results") return null;
    }
  }

  const handleHomeClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (abandonQuiz) {
      e.preventDefault();
      await Promise.resolve(abandonQuiz());
      router.push("/");
    }
    // else: let Link handle navigation
  };

  return (
    <header
      style={{
        background: "#1a1a3e",
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        padding: "48px 0 22px 0",
        boxShadow: "0 4px 16px -8px rgba(26,26,62,0.25)",
        position: "relative",
        zIndex: 10,
        minHeight: 180,
      }}
    >
      {/* Centered logo and site name */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Link
          href="/"
          aria-label="Find Your Ideal Pillow — home"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            textDecoration: "none",
            pointerEvents: "auto",
          }}
          onClick={handleHomeClick}
        >
          <Image
            src="/images/logo.PNG"
            alt="Find Your Ideal Pillow"
            width={90}
            height={90}
            priority
            style={{ borderRadius: "50%", display: "block" }}
          />
          <span
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: -0.2,
            }}
          >
            FindYourIdealPillow
          </span>
        </Link>
      </div>

      {/* Pillow Guides Dropdown, right-aligned */}
      <nav style={{ position: "absolute", right: 32, top: 0, height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              background: "#4a3f6b",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "10px 22px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 2px 8px -2px rgba(26,26,62,0.15)",
            }}
            aria-haspopup="true"
            aria-expanded="false"
            tabIndex={0}
            onClick={e => {
              const menu = e.currentTarget.nextElementSibling;
              if (menu) menu.classList.toggle("show");
            }}
          >
            Pillow Guides
          </button>
          <div
            className="guides-dropdown"
            style={{
              display: "none",
              position: "absolute",
              top: "110%",
              left: 0,
              background: "#fff",
              minWidth: 220,
              boxShadow: "0 8px 24px -8px rgba(26,26,62,0.18)",
              borderRadius: 12,
              padding: "10px 0",
              zIndex: 100,
            }}
            onMouseLeave={e => {
              e.currentTarget.classList.remove("show");
            }}
          >
            {guideLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "10px 24px",
                  color: "#1a1a3e",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                  borderRadius: 0,
                  transition: "background 0.15s",
                }}
                onClick={e => {
                  // Hide dropdown after click
                  const dropdown = (e.target as HTMLElement).closest('.guides-dropdown');
                  if (dropdown) dropdown.classList.remove('show');
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .guides-dropdown.show {
            display: block !important;
          }
          .guides-dropdown a:hover {
            background: #efeaf6;
          }
        `}</style>
      </nav>
    </header>
  );
}
