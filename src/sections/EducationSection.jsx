import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationSection = () => {
  const { education: educationData } = usePortfolio();
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="✦ ACADEMICS & CREDENTIALS"
          title="Education & Certifications"
          subtitle="Formal foundation in computer science paired with continuous industry-recognized cloud and mobile certifications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Degree Card (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-brand-purple" />
              <span>Academic Degree</span>
            </h3>

            {educationData.degrees.map((degree) => (
              <motion.div
                key={degree.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800/80 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-brand-violet/10 text-brand-purple border border-brand-violet/20 font-mono">
                    {degree.duration}
                  </span>
                  {degree.grade && (
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {degree.grade}
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                  {degree.degree}
                </h4>
                <div className="text-xs sm:text-sm font-semibold text-brand-cyan mb-4">
                  {degree.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-200 dark:border-slate-800">
                  {degree.description || degree.highlights}
                </p>

                {degree.coursework && degree.coursework.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-mono">
                      Core Coursework
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {degree.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Industry Certifications (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-cyan" />
              <span>Professional Certifications</span>
            </h3>

            <div className="space-y-4">
              {educationData.certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800/80 hover:border-brand-purple/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {cert.issuer}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Issued {cert.year}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {cert.description}
                    </p>
                    <div className="text-[11px] font-mono text-slate-500 break-all">
                      Credential ID: {cert.credentialId}
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                      <ShieldCheck className="w-4 h-4" />
                      {cert.badge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
