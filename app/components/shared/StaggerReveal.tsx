'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface StaggerRevealProps {
  children: ReactNode[];
  delay?: number; // Delay between each item
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
  itemClassName?: string;
}

export default function StaggerReveal({
  children,
  delay = 0.1,
  direction = 'up',
  duration = 0.5,
  className = '',
  itemClassName = '',
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.2,
    margin: '0px 0px -50px 0px'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

