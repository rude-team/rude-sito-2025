import './globals.css'
import { Playfair_Display } from 'next/font/google'
import ClientLayoutWrapper from './components/ClientLayoutWrapper'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: {
    default: 'rude | bottega creativa',
    template: '%s | rude',
  },
  description: 'forse quelli della mala, forse la pubblicità. scrivici: info@rude.team',
  keywords: ['pubblicità', 'creatività', 'advertising', 'marketing', 'brand', 'comunicazione'],
  authors: [{ name: 'rude' }],
  creator: 'rude',
  publisher: 'rude',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: 'https://rude.team',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://rude.team',
    siteName: 'rude | bottega creativa',
    title: 'rude | bottega creativa',
    description: 'forse quelli della mala, forse la pubblicità ¯\\_(ツ)_/¯',
    images: [
      {
        url: '/rude_logo.png',
        width: 1200,
        height: 630,
        alt: 'rude | bottega creativa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rude | bottega creativa',
    description: 'forse quelli della mala, forse la pubblicità ¯\\_(ツ)_/¯',
    images: ['/rude_logo.png'],
  },
  icons: {
    icon: [
      // Usiamo l'URL assoluto per l'icona principale così Google non ha scuse
      { url: 'https://rude.team/favicon.ico', sizes: 'any' }, 
      { url: 'https://rude.team/favicon_01.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: 'https://rude.team/favicon_01.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: 'https://rude.team/favicon.ico',
  },
  manifest: '/manifest.json',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${playfair.className} bg-white text-black`}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
