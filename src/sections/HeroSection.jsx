import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Sparkles, Terminal, Smartphone, Database, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const HeroSection = () => {
  const { profile: profileData } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = profileData?.roles || ["Full Stack Web Developer"];

  useEffect(() => {
    if (!roles.length) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-purple -top-20 -left-20" />
      <div className="ambient-glow-cyan top-1/3 -right-20" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Available for Senior Contracts & High-Impact Projects</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.1] mb-6">
              Hi, I'm <span className="gradient-text">{profileData.name}</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 block mt-2 h-[1.3em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="inline-block text-brand-purple"
                  >
                    {profileData.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              {profileData.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-brand-violet to-brand-accent hover:from-purple-600 hover:to-indigo-600 shadow-glow-violet transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>View Selected Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-brand-purple/50 shadow-sm transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Contact Me</span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-purple transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                Connect:
              </span>
              {profileData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-brand-purple hover:border-brand-purple/50 transition-all duration-200"
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Hero Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Glowing Outer Ring */}
            <div className="relative w-72 sm:w-84 md:w-96 aspect-square rounded-3xl p-1 bg-gradient-to-tr from-brand-violet via-brand-cyan to-brand-accent shadow-glow-violet animate-pulse-slow">
              <div className="w-full h-full bg-slate-900 rounded-[22px] p-6 flex flex-col justify-between overflow-hidden relative border border-white/10">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">~/talha/dev</span>
                </div>

                {/* Developer Persona Card Visual */}
                <div className="my-auto z-10 py-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-0.5 shadow-md">
                      <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                        <Terminal className="w-8 h-8 text-brand-purple" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">Talha</h3>
                      <p className="text-xs text-brand-cyan font-mono">Senior Architect (Web & Mobile)</p>
                      <p className="text-xs text-slate-400 mt-0.5">San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="text-emerald-400">$ stack --primary</div>
                    <div className="text-slate-300 text-[11px] leading-relaxed">
                      ['React', 'Next.js', 'Flutter', 'FastAPI', 'Node.js', 'PostgreSQL']
                    </div>
                    <div className="text-purple-400 pt-1">$ status</div>
                    <div className="text-slate-300 text-[11px]">
                      🚀 6+ Years Experience • 45+ Production Deployments
                    </div>
                  </div>
                </div>

                {/* Visual Footer */}
                <div className="flex items-center justify-between z-10 text-[11px] text-slate-400 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    System: Healthy
                  </span>
                  <span>100% Test Coverage</span>
                </div>

                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-violet/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Tech Badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:left-2 p-3 rounded-2xl bg-slate-900/90 dark:bg-slate-800/95 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Mobile</div>
                <div className="text-xs font-bold text-white">Flutter & Android</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 sm:right-2 p-3 rounded-2xl bg-slate-900/90 dark:bg-slate-800/95 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Web Stack</div>
                <div className="text-xs font-bold text-white">React & Next.js</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
