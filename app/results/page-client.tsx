"use client";
import { useAppState } from '../client-providers';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ResultsCard } from '../../components/ResultsCard';
import { Button } from '../../components/Button';
import { Product } from '../../core/types';
import { ScoringEngine } from '../../lib/scoring';
import { categoryRegistry } from '../../config/registry';
import { RegionProvider, useRegion } from '../../core/geo/RegionContext';
import { getRegionLinks } from '../../config/pillow/buy-links';
import {
  buildPillowSummary,
  getPillowBullets,
  pickBestValue,
  pickStrongAlternative,
  type ScoredPillow,
} from '../../lib/pillow-results';
import type { Region } from '../../core/geo/types';

type GtagFn = (command: string, event: string, params?: Record<string, string | number>) => void;

/** Fire a GA4 event safely (noop if gtag not loaded). */
function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof (window as typeof window & { gtag?: GtagFn }).gtag === 'function') {
    (window as typeof window & { gtag: GtagFn }).gtag('event', name, params ?? {});
  }
}

// ── Region selector ───────────────────────────────────────────────────────────

function RegionSelector() {
  const { region, setRegion, isLoading } = useRegion();

  // Suppress until region is resolved to avoid a flash of wrong state.
  if (isLoading) return null;

  const other: Region = region === 'UK' ? 'US' : 'UK';
  const label = region === 'UK' ? 'Showing UK retailers' : 'Showing US retailers';
  const switchLabel = region === 'UK' ? 'Switch to US' : 'Switch to UK';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '8px 12px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.2)',
      fontSize: 12,
    }}>
      <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{label}</span>
      <button
        onClick={() => setRegion(other)}
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 6,
          padding: '4px 12px',
          fontSize: 12,
          fontWeight: 700,
          color: '#ffffff',
          cursor: 'pointer',
        }}
      >
        {switchLabel}
      </button>
    </div>
  );
}

// ── Inner page ────────────────────────────────────────────────────────────────

interface ResultsPageProps {
  products?: Product[];
  scoringEngine?: ScoringEngine;
  resultsHeading?: string;
  homeHref?: string;
  questionnaireHref?: string;
}

function ResultsPageInner({
  products,
  scoringEngine,
  resultsHeading,
  homeHref = '/',
  questionnaireHref = '/pillow/questionnaire',
}: ResultsPageProps) {
  const { answers, reset } = useAppState();
  const { region } = useRegion();
  const router = useRouter();
  const [legacyV2Mode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const v = new URLSearchParams(window.location.search).get('v');
    return v === '2';
  });
  const affiliateDisclosure = region === 'UK'
    ? 'Affiliate disclosure: Some links on this page are affiliate links. As an Amazon Associate, we earn from qualifying purchases. We may also earn a commission from other retailer partners at no extra cost to you. This helps keep the tool free.'
    : 'Affiliate disclosure: Some links on this page are affiliate links. If you purchase through them, we may earn a small commission at no extra cost to you. This helps keep the tool free.';

  // Exclude products marked REMOVE_FROM_CATALOGUE — these have no UK purchase path.
  // Also filter by availability so only region-appropriate products are scored;
  // otherwise UK products fill the top 3 for US visitors (and vice versa).
  const resolvedProducts = (products ?? categoryRegistry['pillow'].products)
    .filter((p) => p.ukAmazonVerification?.status !== 'REMOVE_FROM_CATALOGUE')
    .filter((p) => {
      const avail = String(p.attributes.availability ?? 'both');
      if (avail === 'both') return true;
      if (region === 'UK') return avail === 'uk';
      if (region === 'US') return avail === 'us';
      return true;
    });
  const resolvedEngine = scoringEngine ?? categoryRegistry['pillow'].scoringEngine;
  const resolvedHeading = resultsHeading ?? categoryRegistry['pillow'].meta.resultsHeading;

  const hasAnswers = Object.keys(answers).length > 0 || legacyV2Mode;

  // Redirect to questionnaire if there are no answers (direct URL access)
  useEffect(() => {
    if (!hasAnswers) {
      router.replace(questionnaireHref);
    }
  }, [hasAnswers, questionnaireHref, router]);

  const scored = resolvedProducts.map((p) => {
    const { score, reasons } = hasAnswers ? resolvedEngine(p, answers) : { score: 0, reasons: [] };
    return { ...p, _score: score, _reasons: reasons };
  }).sort((a, b) => b._score - a._score) as ScoredPillow[];

  // Best Match: highest score
  const best = scored[0];
  // Strong Alternative: choose a true adjacent-fit option rather than the next raw scorer.
  const alt = pickStrongAlternative(scored, best);
  const budgetAnswer = String(answers['budget'] ?? 'any');
  const budget = pickBestValue(scored, best, alt, budgetAnswer);

  function getSummary(
    product: ScoredPillow,
    label: 'Best Match' | 'Strong Alternative' | 'Best Value',
    bestReasons?: string[]
  ) {
    const hasUserAnswers = Object.keys(answers).length > 0;
    if (!hasUserAnswers) {
      return product.description ?? 'A strong match based on your answers.';
    }
    return buildPillowSummary(product, label, {
      reasons: product._reasons ?? [],
      bestReasons,
      priorCopy: new Set<string>(),
    });
  }

  function getBullets(product: ScoredPillow, usedReasons?: string[]): string[] {
    return getPillowBullets(product, usedReasons);
  }

  function getPriceHint(product: typeof scored[0]): string | undefined {
    const rrpUk = Number(product.attributes.rrp);
    const rrpUs = Number(product.attributes.rrpUs);
    if (region === 'UK' && Number.isFinite(rrpUk) && rrpUk > 0) return `~£${rrpUk}`;
    if (region === 'US' && Number.isFinite(rrpUs) && rrpUs > 0) return `~$${rrpUs}`;
    return undefined;
  }

  const cards = [
    { label: 'Best Match', product: best },
    { label: 'Strong Alternative', product: alt },
    { label: 'Best Value', product: budget },
  ];

  // Fire results_viewed once on mount
  useEffect(() => {
    if (!hasAnswers) return;
    trackEvent('results_viewed', { best_match: best.id });
  }, [hasAnswers, best.id]);

  if (!hasAnswers) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f3f8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <main style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1a1a3e" }}>Let&apos;s start with the quiz</h2>
          <p style={{ margin: 0, color: "#5a5478", lineHeight: 1.6 }}>
            We need your answers before we can build personalised pillow matches. Redirecting you now.
          </p>
          <Button
            onClick={() => router.replace(questionnaireHref)}
            variant="primary"
            style={{ width: "100%", fontWeight: 700, fontSize: 16 }}
          >
            Go to questionnaire
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/images/pillow.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
      backgroundAttachment: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
      position: "relative",
    }}>
      {/* Navy overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(26, 26, 62, 0.50)", zIndex: 0 }} />

      <main style={{
        width: "100%",
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 20,
        padding: 28,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ width: "100%" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "left", margin: "0 0 4px 0", color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{resolvedHeading}</h2>
          <p style={{ textAlign: "left", margin: 0, color: "rgba(255,255,255,0.8)", fontSize: 15 }}>Based on your answers — here are your top picks.</p>
        </div>

        {/* Region selector — subtle, above the cards */}
        <RegionSelector />

        <p style={{ width: "100%", margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
          <em>{affiliateDisclosure}</em>
        </p>
        <p style={{ width: "100%", margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
          Prices and availability are set by retailers and may change at any time. Always confirm the current price before purchasing.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          {cards.map(({ label, product }, i) => (
            <ResultsCard
              key={label}
              label={label}
              isBest={i === 0}
              image={product.imageUrl}
              title={`${product.brand} ${product.name}`}
              explanation={getSummary(product, label as 'Best Match' | 'Strong Alternative' | 'Best Value', i > 0 ? (best._reasons as string[]) : undefined)}
              badges={getBullets(product, i > 0 ? (best._reasons as string[]) : undefined)}
              priceTier={String(product.attributes.priceTier ?? '')}
              priceHint={getPriceHint(product)}
              buyLinks={getRegionLinks(product.id, region)}
              onCtaClick={() => trackEvent('affiliate_click', { product_id: product.id, slot: label, position: i })}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            trackEvent('start_again_clicked', { from: 'results' });
            reset();
            router.push(homeHref);
          }}
          variant="primary"
          style={{ marginTop: 32, width: "100%", fontWeight: 700, fontSize: 16 }}
        >
          ← Start again
        </Button>
      </main>
    </div>
  );
}

// ── Page wrapper — injects RegionProvider around the inner page ───────────────

function ResultsPageWithRegion(props: ResultsPageProps) {
  return (
    <RegionProvider>
      <ResultsPageInner {...props} />
    </RegionProvider>
  );
}

export default function ResultsPage(props: ResultsPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#888" }}>Finding your best matches…</div>}>
      <ResultsPageWithRegion {...props} />
    </Suspense>
  );
}
