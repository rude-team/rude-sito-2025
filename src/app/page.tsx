'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center text-center px-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="mb-8"
      >
        <Image src="/rude_logo.png" alt="RUDE logo" width={200} height={100} />
      </motion.div>

             {/* Frasi + Lapide */}
       <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mb-8 relative">
         {/* Frase sinistra - sopra su mobile, a sinistra su desktop */}
         <motion.p
           initial={{ x: '-100vw', opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 1, duration: 2 }}
           className="text-xl md:text-xl mb-4 md:mb-0 md:mr-4 whitespace-nowrap"
         >
           forse quelli della mala
         </motion.p>

         {/* Lapide - già visibile senza animazioni */}
         <div>
           <Image src="/lapide.png" alt="Lapide" width={300} height={300} />
         </div>

         {/* Frase destra - sotto su mobile, a destra su desktop */}
         <motion.p
           initial={{ x: '100vw', opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 1, duration: 2 }}
           className="text-xl md:text-xl mt-4 md:mt-0 md:ml-4 whitespace-nowrap"
         >
           forse la pubblicità
         </motion.p>
       </div>

      {/* Icone Social */}
      <motion.div
        className="flex gap-10 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <Link href="https://www.instagram.com/rude___team/" target="_blank" rel="noopener noreferrer">
          <Image src="/instagram.svg" alt="Instagram" width={32} height={32} />
        </Link>
        <Link href="https://www.linkedin.com/company/rudeteam/" target="_blank" rel="noopener noreferrer">
          <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
        </Link>
        <a href="mailto:info@rude.team">
          <Image src="/mail.svg" alt="Email" width={32} height={32} />
        </a>
      </motion.div>
             <motion.p
           className="text-lg md:text-xl mt-4"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 2 }}
         >
           via arquà 13, milano
         </motion.p>
    </main>
  )
}
