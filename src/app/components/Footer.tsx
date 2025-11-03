'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type FooterProps = {
  withAnimation?: boolean
  isFixed?: boolean
}

export default function Footer({ withAnimation = false, isFixed = false }: FooterProps) {
  const Wrapper = withAnimation ? motion.div : 'div'
  const Text = withAnimation ? motion.p : 'p'

  return (
    <footer className={`flex flex-col items-center justify-center mt-4 mb-6 ${isFixed ? 'md:fixed md:bottom-0 md:left-0 md:right-0 md:mt-0 md:mb-6 md:bg-white' : ''}`}>
      <Wrapper
        className="flex gap-4 md:gap-6"
        {...(withAnimation && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5, duration: 1 },
        })}
      >
        <Link href="https://www.instagram.com/rude___team/" target="_blank" rel="noopener noreferrer">
          <Image src="/instagram.svg" alt="Instagram" width={16} height={16} className="md:w-5 md:h-5" />
        </Link>
        <Link href="https://www.linkedin.com/company/rudeteam/" target="_blank" rel="noopener noreferrer">
          <Image src="/linkedin.svg" alt="LinkedIn" width={16} height={16} className="md:w-5 md:h-5" />
        </Link>
        <a href="mailto:info@rude.team">
          <Image src="/mail_quadrata.svg" alt="Email" width={16} height={16} className="md:w-5 md:h-5" />
        </a>
      </Wrapper>

      <Text
        className="text-xs md:text-sm mt-2"
        {...(withAnimation && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5, duration: 1 },
        })}
      >
        via arquà 13, milano
      </Text>
    </footer>
  )
}
