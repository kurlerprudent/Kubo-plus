"use client";
import { motion } from 'framer-motion';

export const AnimatedCounter = ({ value }: { value: number }) => {
  return (
    <motion.span 
      className="text-3xl font-bold text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={value}
    >
      {value}
    </motion.span>
  );
};