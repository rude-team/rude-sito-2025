import './globals.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'rude',
  description: 'Forse quelli della mala, forse la pubblicità.',
  icons: {
    icon: '/favicon_01.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${playfair.className} bg-white text-black`}>
        {children}
      </body>
    </html>
  )
}
