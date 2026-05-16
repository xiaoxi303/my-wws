"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-shell"
        initial={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 28, clipPath: "inset(4% 0% 0% 0%)" }
        }
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
        exit={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: -18, clipPath: "inset(0% 0% 5% 0%)" }
        }
        transition={{ duration: 0.72, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
