'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('fonts-loaded')
    }
  }, [])

  return (
    <div className="page-transition-wrapper">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

