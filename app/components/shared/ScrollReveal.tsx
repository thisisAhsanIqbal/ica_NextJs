'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  className?: string;
  amount?: number; // How much of the element should be visible (0-1)
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  amount = 0.3, // Trigger when 30% visible
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // Only animate once
    amount, // Trigger when this much is visible
    margin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // Smooth easing curve (cubic bezier)
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

