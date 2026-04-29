import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pillowSeoPages, pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import PillowSeoLandingPage from "./PillowSeoLandingPage";

type Props = { params: Promise<{ slug: string }> };

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
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = pillowSeoPageMap[slug];
  if (!page) notFound();
  const faqJsonLd = page.faq && page.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <>
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
