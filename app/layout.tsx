import type { Metadata } from 'next';
import { Archivo_Black, IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';

const display = Archivo_Black({ variable: '--font-display', weight: '400', subsets: ['latin'] });
const body = Manrope({ variable: '--font-body', subsets: ['latin'] });
const utility = IBM_Plex_Mono({ variable: '--font-utility', weight: ['400', '500'], subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolcraft-gallery.kevinrufino97.chatgpt.site'),
  title: 'Toolcraft Archive — Kevin Rufino',
  description: 'A growing collection of interactive studies in motion, type, image, and interface.',
  openGraph: {
    title: 'Toolcraft Archive — Kevin Rufino',
    description: 'A growing collection of interactive studies in motion, type, image, and interface.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Toolcraft Archive' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolcraft Archive — Kevin Rufino',
    description: 'A growing collection of interactive studies in motion, type, image, and interface.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>{children}</body>
    </html>
  );
}
