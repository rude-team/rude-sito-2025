'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isWorkPage = pathname === '/work' // Solo la pagina work, non i dettagli
  const isAboutPage = pathname === '/about'

  return <Footer withAnimation={isHome} isFixed={isWorkPage || isAboutPage} />
}
