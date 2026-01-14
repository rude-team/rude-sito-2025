'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  // Gestiamo il caso in cui pathname potrebbe essere undefined durante SSR
  const safePathname = pathname || '/'
  const isHome = safePathname === '/'
  const isWorkPage = safePathname === '/work' // Solo la pagina work, non i dettagli
  const isAboutPage = safePathname === '/about'

  return <Footer withAnimation={isHome} isFixed={isWorkPage || isAboutPage} />
}
