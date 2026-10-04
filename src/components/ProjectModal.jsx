import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Star, Smartphone, Globe } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl z-10 overflow-hidden"
        >
          {/* Header Banner */}
          <div className={`relative h-44 sm:h-52 bg-gradient-to-r ${project.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-black/30 z-0 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20">
                {project.category === 'web' ? <Globe className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                {project.badge}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display drop-shadow-md">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Project Overview & Architecture
              </h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Impact / Stats */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
                {Object.entries(project.stats).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                      {key}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-violet to-brand-accent hover:opacity-95 shadow-md transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
