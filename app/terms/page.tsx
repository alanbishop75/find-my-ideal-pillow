import type { Metadata } from 'next';
import TermsPageClient from './TermsPageClient';

export const metadata: Metadata = {
  title: 'Terms of Use — FindMyIdealPillow',
  description: 'Terms of use for FindMyIdealPillow, including retailer-link and regional legal details.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
