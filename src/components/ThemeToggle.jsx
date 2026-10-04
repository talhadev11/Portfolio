import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative p-2.5 rounded-full border border-slate-700/60 dark:border-slate-800 bg-slate-900/60 dark:bg-slate-800/80 text-slate-200 hover:text-brand-purple transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-violet-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400" />
        )}
      </motion.div>
    </button>
  );
};
