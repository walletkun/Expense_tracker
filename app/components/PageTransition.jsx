"use client";

import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={children.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ delay: .5, duration: .4}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
