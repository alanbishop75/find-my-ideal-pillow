import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — FindMyIdealPillow',
  description: 'Get in touch with FindMyIdealPillow. Questions, suggestions, or spotted an error — we\'d love to hear from you.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
