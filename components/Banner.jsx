'use client';

import { motion } from 'framer-motion';

export default function Banner({ title }) {
  return (
    <section className="bg-secondary py-20">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h2 text-white text-center"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}