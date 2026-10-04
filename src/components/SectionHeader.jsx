import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ badge, title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-violet/10 text-brand-purple border border-brand-violet/25 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-4 text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
