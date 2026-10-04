import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-dark-surface/40 backdrop-blur-md pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shadow-glow-violet">
                <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-brand-purple" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                {profileData.name}<span className="text-brand-purple">.</span>
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Senior Full Stack Web & Mobile Application Developer specializing in resilient web services and cross-platform mobile apps built with React, Flutter, Node.js, and Python.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Available for senior contract & advisory roles</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-display mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#about" className="hover:text-brand-purple transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-brand-purple transition-colors">Skills & Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-brand-purple transition-colors">Featured Projects</a></li>
              <li><a href="#experience" className="hover:text-brand-purple transition-colors">Career Timeline</a></li>
              <li><a href="#education" className="hover:text-brand-purple transition-colors">Education & Certs</a></li>
              <li><a href="#contact" className="hover:text-brand-purple transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-display mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {profileData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-brand-purple hover:border-brand-purple/50 transition-all duration-200 shadow-sm"
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              San Francisco, CA • Open to Worldwide Remote
            </p>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} {profileData.name}. Designed & built with React, Tailwind CSS, & Framer Motion.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-brand-purple hover:border-brand-purple/50 transition-all duration-200"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
