import type { Metadata, Viewport } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './globals.css';
import { SiteHeader, SiteFooter, ConsentAndTracking } from '@/components/SiteChrome';
import { site } from '@/lib/site';
import { ContactDock } from '@/components/ContactDock';
import { ContactDialogs } from '@/components/ContactDialogs';
import { JsonLd } from '@/components/Shared';
import { businessGraph } from '@/lib/structured-data';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Public ownership proof for the approved business Search Console account.
  verification: { google: 'KtbOd7gfkgMrDqyDC4qRKpUzOkOBOy-VMDJM3bI8Y2A' },
  title: {
    default: 'ERLEDIGT TEAM | Gebäudereinigung in Saterland & Umgebung',
    template: '%s | ERLEDIGT TEAM',
  },
  description:
    'Gebäudereinigung, Fensterreinigung und Spezialreinigung aus Saterland. Für Privatkunden und Gewerbe in Saterland und Umgebung. Jetzt unverbindlich anfragen.',
  robots:
    process.env.NEXT_PUBLIC_LAUNCH_READY === 'true'
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    siteName: site.name,
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/hero-cleaning.webp',
        width: 1536,
        height: 1024,
        alt: 'ERLEDIGT TEAM – illustrative Glasreinigung',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/logo.jpg' },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5faff' },
    { media: '(prefers-color-scheme: dark)', color: '#06172E' },
  ],
};
const theme = `try{var t=localStorage.getItem('erledigt-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: theme }} />
      </head>
      <body>
        <JsonLd value={businessGraph()} />
        <a className="skip-link" href="#main">
          Zum Inhalt
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ContactDock />
        <ContactDialogs />
        <ConsentAndTracking />
      </body>
    </html>
  );
}
