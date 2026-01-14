'use client'

import Link from 'next/link'
import Image from 'next/image'
import FooterWrapper from './FooterWrapper'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Gestiamo il caso in cui pathname potrebbe essere undefined durante SSR
  const safePathname = pathname || '/'
  const isHome = safePathname === '/'
  const isWork = safePathname.startsWith('/work')
  const isAbout = safePathname === '/about'

  return (
    <>
      {/* Navbar */}
      <nav className="w-full py-4 flex justify-center">
        <div className="flex items-center space-x-8 md:space-x-8 text-2xl md:text-xl font-bold">
          <Link
            href="/work"
            className={`font-bold hover:line-through transition-all duration-150 ${
              isWork ? 'line-through' : ''
            }`}
          >
            work
          </Link>

          <Link href="/">
            <Image
              src="/logo_navbar.svg"
              alt="Logo RUDE"
              width={48}
              height={48}
              className="object-contain w-16 h-16 md:w-16 md:h-16"
            />
          </Link>

          <Link
            href="/about"
            className={`font-bold hover:line-through transition-all duration-150 ${
              isAbout ? 'line-through' : ''
            }`}
          >
            about
          </Link>
        </div>
      </nav>

      {/* Fade-in semplice ad ogni cambio pagina */}
      {/* Usiamo sempre motion.div per evitare hydration mismatch */}
      <motion.div
        key={safePathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {!isHome && <FooterWrapper />}
    </>
  )
}
