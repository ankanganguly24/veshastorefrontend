import "@/app/globals.css";
import AppProviders from "@/providers/app-providers";
import { Toaster } from "sonner";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  metadataBase: new URL('https://myvesha.com'),
  title: {
    default: 'Vesha | Premium Ethnic Wear for Women',
    template: '%s | Vesha'
  },
  description: 'Discover the finest collection of Indian ethnic wear. Handcrafted sarees, kurtas, and lehengas that blend tradition with modern elegance.',
  keywords: ['ethnic wear', 'indian fashion', 'sarees', 'kurtas', 'lehengas', 'handcrafted clothing', 'sustainable fashion'],
  authors: [{ name: 'Vesha' }],
  creator: 'Vesha',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://myvesha.com',
    title: 'Vesha | Premium Ethnic Wear for Women',
    description: 'Discover the finest collection of Indian ethnic wear. Handcrafted sarees, kurtas, and lehengas.',
    siteName: 'Vesha',
    images: [
      {
        url: '/veshalogo.png',
        width: 800,
        height: 600,
        alt: 'Vesha Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vesha | Premium Ethnic Wear',
    description: 'Discover the finest collection of Indian ethnic wear.',
    images: ['/veshalogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vesha',
    url: 'https://myvesha.com',
    logo: 'https://myvesha.com/veshalogo.png',
    sameAs: [
      'https://facebook.com/vesha',
      'https://instagram.com/vesha',
      'https://twitter.com/vesha'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'customer service'
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
