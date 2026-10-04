import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Smartphone, Globe, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectModal } from '../components/ProjectModal';
import { usePortfolio } from '../context/PortfolioContext';

const filterTabs = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Development' },
];

export const ProjectsSection = () => {
  const { projects: projectsData } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="✦ FEATURED PORTFOLIO"
          title="Engineered for Performance & Scale"
          subtitle="Explore selected web platforms and mobile applications built with clean architecture, high uptime, and delightful interactions."
        />

        {/* Filter Tabs Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80 backdrop-blur-md shadow-inner">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-brand-violet to-brand-accent rounded-xl shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.id === 'web' && <Globe className="w-3.5 h-3.5" />}
                    {tab.id === 'mobile' && <Smartphone className="w-3.5 h-3.5" />}
                    {tab.id === 'all' && <Sparkles className="w-3.5 h-3.5" />}
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with Framer Motion layout animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:border-brand-purple/50 shadow-md hover:shadow-glow-violet transition-all duration-300"
              >
                {/* Top Image / Graphic Mockup with Hover Overlay */}
                <div className={`relative h-48 sm:h-52 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between overflow-hidden`}>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-black/30 z-0 pointer-events-none" />

                  {/* Subtle inner card mock UI */}
                  <div className="flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20">
                      {project.category === 'web' ? (
                        <Globe className="w-3.5 h-3.5 text-cyan-300" />
                      ) : (
                        <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
                      )}
                      {project.badge}
                    </span>

                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-900 shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Visual Center Graphic representation */}
                  <div className="my-auto text-center z-10">
                    <div className="text-white/90 font-mono text-xs uppercase tracking-widest bg-black/30 backdrop-blur-sm py-1 px-3 rounded-lg inline-block border border-white/10">
                      {project.category === 'web' ? 'Browser Platform' : 'iOS & Android Native'}
                    </div>
                  </div>

                  {/* Hover Overlay with Live Demo and GitHub icon links */}
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-110"
                      title="Quick Deep Dive"
                      aria-label={`View details for ${project.title}`}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-brand-violet hover:bg-violet-500 text-white flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-110"
                      title="Live Demo"
                      aria-label={`Live Demo for ${project.title}`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-110"
                      title="GitHub Repository"
                      aria-label={`GitHub repo for ${project.title}`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Ambient Light */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-brand-purple hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-brand-purple transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Window */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
