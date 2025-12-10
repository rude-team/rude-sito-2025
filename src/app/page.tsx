'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import VideoModal from './components/VideoModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoUrl = 'https://vimeo.com/1138108627?fl=ip&fe=ec'

  return (
    <>
      <main className="min-h-screen w-full flex flex-col items-center justify-start md:justify-center text-center px-4 pt-20 md:pt-0 md:-mt-32">

        {/* Frasi + Lapide */}
        {/* Frasi + Lapide */}
        <div className="w-full max-w-5xl mb-6 flex flex-col md:grid md:grid-cols-3 items-center justify-center text-center">
          {/* Frase sinistra */}
          <motion.p
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-base md:text-xl mb-2 md:mb-0 md:justify-self-end whitespace-nowrap"
          >
            forse quelli della mala
          </motion.p>

          {/* Lapide - cliccabile */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Apri video"
            >
              <Image src="/lapide.png" alt="Lapide" width={200} height={200} className="md:w-[300px] md:h-[300px]" />
            </button>
          </div>

        {/* Frase destra */}
        <motion.p
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-base md:text-xl mt-2 md:mt-0 md:justify-self-start whitespace-nowrap"
        >
          forse la pubblicità
        </motion.p>
      </div>

      {/* Icone Social */}
      <motion.div
        className="flex gap-6 md:gap-10 mt-2 mb-2 md:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Link href="https://www.instagram.com/rude___team/" target="_blank" rel="noopener noreferrer">
          <Image src="/instagram.svg" alt="Instagram" width={16} height={16} className="w-6 h-6 md:w-5 md:h-5" />
        </Link>
        <Link href="https://www.linkedin.com/company/rudeteam/" target="_blank" rel="noopener noreferrer">
          <Image src="/linkedin.svg" alt="LinkedIn" width={16} height={16} className="w-6 h-6 md:w-5 md:h-5" />
        </Link>
        <a href="mailto:info@rude.team">
          <Image src="/mail_quadrata.svg" alt="Email" width={16} height={16} className="w-6 h-6 md:w-5 md:h-5" />
        </a>
      </motion.div>

      {/* Indirizzo */}
      <motion.p
        className="text-sm md:text-sm mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        via arquà 13, milano
      </motion.p>

      </main>

      {/* Modale video */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  )
}
