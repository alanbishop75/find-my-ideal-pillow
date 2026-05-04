import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About FindYourIdealPillow — Free, Personalised Pillow Recommendations',
  description: 'FindYourIdealPillow helps you find the right pillow for how you sleep through a quick, personalised quiz. No ads, no sign-up, no nonsense.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
