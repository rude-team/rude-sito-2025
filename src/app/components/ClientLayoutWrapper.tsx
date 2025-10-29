'use client'

import Link from 'next/link'
import Image from 'next/image'
import FooterWrapper from './FooterWrapper'
import { usePathname } from 'next/navigation'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isWork = pathname.startsWith('/work');
  const isAbout = pathname === '/about';

  return (
    <>
      {/* Navbar */}
      <nav className="w-full py-4 flex justify-center">
        <div className="flex items-center space-x-8 md:space-x-6 text-2xl md:text-lg font-bold">
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
              className="object-contain w-16 h-16 md:w-12 md:h-12"
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

      {/* Pagina corrente */}
      {children}

      {/* Footer solo se NON siamo nella home */}
      {!isHome && <FooterWrapper />}
    </>
  );
}
