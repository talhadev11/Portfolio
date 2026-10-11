import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, Code, Smartphone, Cpu, Shield, Award, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection = () => {
  const { profile: profileData } = usePortfolio();
  const handleDownloadCV = () => {
    // Generates a mock download action or opens resume modal
    const blob = new Blob(
      [`TALHA - SENIOR FULL STACK & MOBILE APPLICATION DEVELOPER\nExperience: 6+ Years\nSpecializations: React, Next.js, Node.js, Python, Flutter, Android, PostgreSQL, AWS\nEmail: talha.dev@gmail.com\nPortfolio: https://talha.dev`],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Talha_Senior_Developer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="✦ ABOUT ME"
          title="Engineering Systems with Precision & Impact"
          subtitle="A senior engineer's approach to designing reliable web ecosystems and high-speed mobile applications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Visual Card with Stats Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative w-full"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none px-2 sm:px-0">
              {/* Card Container */}
              <div className="glass-card rounded-3xl p-4 sm:p-7 relative border border-slate-200 dark:border-slate-800 pb-12 sm:pb-8">
                <div className="w-full aspect-[4/4.5] rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden text-white shadow-inner">
                  {/* Decorative Elements */}
                  <div className="flex justify-between items-start z-10">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-white/10 backdrop-blur-md border border-white/15 text-white">
                      FULL STACK WEB & MOBILE LEAD
                    </span>
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan" />
                  </div>

                  {/* Visual Portrait Graphic */}
                  <div className="my-auto text-center z-10 py-2">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-1 shadow-glow-violet mb-3 sm:mb-4">
                      <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center">
                        <Code className="w-9 h-9 sm:w-12 sm:h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-display">{profileData.name}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-mono mt-0.5">Pakistan (GMT+5)</p>
                  </div>

                  {/* Bottom Metrics Pill */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 sm:pt-4 border-t border-white/10 z-10">
                    <div className="text-center p-1.5 sm:p-2 rounded-xl bg-white/5 backdrop-blur-sm">
                      <div className="text-[10px] sm:text-xs text-slate-300">Web Platforms</div>
                      <div className="text-xs sm:text-sm font-bold text-brand-purple truncate">React • Node • FastAPI</div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2 rounded-xl bg-white/5 backdrop-blur-sm">
                      <div className="text-[10px] sm:text-xs text-slate-300">Mobile Apps</div>
                      <div className="text-xs sm:text-sm font-bold text-brand-cyan truncate">Flutter • Android</div>
                    </div>
                  </div>

                  {/* Gradient background swirl */}
                  <div className="absolute inset-0 bg-radial-gradient from-violet-600/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-3 right-2 sm:-bottom-5 sm:-right-4 p-2.5 sm:p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 border border-slate-700 shadow-2xl flex items-center gap-2 sm:gap-3 z-20">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center text-white font-bold text-base sm:text-xl">
                    6+
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">Years Of</div>
                    <div className="text-[11px] sm:text-sm font-bold text-white">Engineering Scale</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <div className="space-y-3 sm:space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {profileData.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Responsive Stats Metric Grid */}
            {profileData.stats && profileData.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2">
                {profileData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              {profileData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-violet to-brand-accent hover:from-purple-600 hover:to-indigo-600 shadow-md hover:shadow-glow-violet transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Professional CV</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
