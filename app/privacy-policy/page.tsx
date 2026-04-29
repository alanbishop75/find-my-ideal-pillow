import type { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy — FindMyIdealPillow',
  description: 'Privacy policy for FindMyIdealPillow, including cookies, analytics, and regional privacy details.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
