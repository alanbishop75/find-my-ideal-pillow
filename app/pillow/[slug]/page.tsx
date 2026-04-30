import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pillowSeoPages, pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import PillowSeoLandingPage from "./PillowSeoLandingPage";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.findmyidealpillow.com").replace(/\/$/, "");

export function generateStaticParams() {
  return pillowSeoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pillowSeoPageMap[slug];
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/pillow/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/pillow/${slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = pillowSeoPageMap[slug];
  if (!page) notFound();

  const pageUrl = `${SITE_URL}/pillow/${slug}`;

  const faqJsonLd =
    page.faq && page.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Pillow finder", item: `${SITE_URL}/pillow/questionnaire` },
      { "@type": "ListItem", position: 3, name: page.breadcrumbLabel, item: pageUrl },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: "en-GB",
    mainEntityOfPage: pageUrl,
    dateModified: `${page.lastReviewed}T00:00:00Z`,
    datePublished: `${page.lastReviewed}T00:00:00Z`,
    image: [
      {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    ],
    author: { "@type": "Organization", name: "FindMyIdealPillow", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "FindMyIdealPillow",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <PillowSeoLandingPage page={page} />
    </>
  );
}
