'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  
  // Assicuriamoci che il componente sia montato prima di renderizzare
  // Questo previene problemi con Googlebot durante la scansione
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Non renderizzare nulla fino a quando non siamo sicuri che il componente sia montato
  if (!isMounted) {
    return null
  }

  // Gestiamo il caso in cui pathname potrebbe essere undefined durante SSR
  const safePathname = pathname || '/'
  const isHome = safePathname === '/'
  const isWorkPage = safePathname === '/work' // Solo la pagina work, non i dettagli
  const isAboutPage = safePathname === '/about'

  return <Footer withAnimation={isHome} isFixed={isWorkPage || isAboutPage} />
}
