import type { Metadata } from 'next';
import { Archivo_Black, IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';

const display = Archivo_Black({ variable: '--font-display', weight: '400', subsets: ['latin'] });
const body = Manrope({ variable: '--font-body', subsets: ['latin'] });
const utility = IBM_Plex_Mono({ variable: '--font-utility', weight: ['400', '500'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toolcraft Archive — Kevin Rufino',
  description: 'A growing collection of interactive studies in motion, type, image, and interface.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>{children}</body>
    </html>
  );
}
