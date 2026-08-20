import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
