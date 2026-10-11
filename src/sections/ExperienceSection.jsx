import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection = () => {
  const { experience: experienceData } = usePortfolio();
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple top-1/3 -right-32 opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="✦ CAREER TRAJECTORY"
          title="Work Experience & Leadership"
          subtitle="6+ years of driving architectural decisions, mentoring engineers, and deploying mission-critical systems."
        />

        {/* Timeline Container */}
        <div className="relative mt-8 sm:mt-12">
          {/* Glowing Animated Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-violet via-brand-cyan to-transparent -translate-x-1/2 opacity-70" />

          <div className="space-y-6 sm:space-y-10 md:space-y-12">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-start">
                  
                  {/* Timeline Dot with Pulse Effect */}
                  <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 top-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 dark:bg-slate-800 border-2 border-brand-purple flex items-center justify-center z-20 shadow-glow-violet">
                    <Briefcase className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-purple" />
                  </div>

                  {/* Left / Right Side Content */}
                  <div className={`w-full md:w-1/2 pl-8 sm:pl-11 md:pl-0 ${isEven ? 'md:pr-8 lg:md:pr-12' : 'md:order-2 md:pl-8 lg:md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 hover:border-brand-purple/50 shadow-md transition-all text-left"
                    >
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-brand-violet/10 text-brand-purple border border-brand-violet/20 font-mono">
                          {item.period}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-base sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-brand-cyan mb-3">
                        {item.company}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Responsibilities & Achievements */}
                      <div className="space-y-2 mb-4 sm:mb-5">
                        {item.achievements.map((achievement, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Layout */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
