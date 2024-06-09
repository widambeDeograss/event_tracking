// app/transition-wrapper.tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Transition from '@/components/Transition';
export default function TransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
      >
        <Transition/>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
