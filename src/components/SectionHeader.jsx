import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ badge, title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-10 sm:mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-brand-violet/10 text-brand-purple border border-brand-violet/25 mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-3 sm:mb-4 text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed px-1 sm:px-0">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
