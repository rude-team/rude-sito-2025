import './globals.css'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import ClientLayoutWrapper from './components/ClientLayoutWrapper'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'rude | bottega creativa',
  description: 'forse quelli della mala, forse la pubblicità ¯\\_(ツ)_/¯',
  icons: {
    icon: '/favicon_01.png',
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
