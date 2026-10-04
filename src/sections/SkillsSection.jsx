import React from 'react';
import { motion } from 'framer-motion';
import {
  Layout, Server, Smartphone, Database, Cloud,
  FileCode2, Palette, Code2, FileCode, Atom, Layers, Globe, Sparkles, Boxes, Component,
  Terminal, Cpu, Zap, ShieldCheck, Network, Share2, Workflow,
  Bot, GitBranch, Repeat, Blocks, Flame, GitCommit, Github, Code, Send, Triangle, CloudRain
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { usePortfolio } from '../context/PortfolioContext';

// Comprehensive Icon Mapper
const getSkillIcon = (name) => {
  switch (name) {
    // Frontend
    case 'HTML5': return <FileCode2 className="w-4 h-4 text-orange-500" />;
    case 'CSS3': return <Palette className="w-4 h-4 text-blue-500" />;
    case 'JavaScript (ES6+)': return <Code2 className="w-4 h-4 text-amber-400" />;
    case 'TypeScript': return <FileCode className="w-4 h-4 text-blue-400" />;
    case 'React.js': return <Atom className="w-4 h-4 text-cyan-400 animate-spin-slow" />;
    case 'Vue.js': return <Layers className="w-4 h-4 text-emerald-400" />;
    case 'Next.js': return <Globe className="w-4 h-4 text-slate-800 dark:text-white" />;
    case 'Tailwind CSS': return <Sparkles className="w-4 h-4 text-cyan-400" />;
    case 'Bootstrap': return <Boxes className="w-4 h-4 text-purple-500" />;
    case 'Material-UI (MUI)': return <Component className="w-4 h-4 text-blue-500" />;

    // Backend
    case 'Python': return <Terminal className="w-4 h-4 text-yellow-400" />;
    case 'JavaScript (Node.js)': return <Cpu className="w-4 h-4 text-emerald-500" />;
    case 'FastAPI': return <Zap className="w-4 h-4 text-teal-400" />;
    case 'Express.js': return <Server className="w-4 h-4 text-slate-400" />;
    case 'NestJS': return <ShieldCheck className="w-4 h-4 text-red-500" />;
    case 'RESTful APIs': return <Network className="w-4 h-4 text-indigo-400" />;
    case 'GraphQL': return <Share2 className="w-4 h-4 text-pink-500" />;
    case 'Microservices': return <Workflow className="w-4 h-4 text-amber-400" />;

    // Mobile
    case 'Flutter (Dart)': return <Smartphone className="w-4 h-4 text-cyan-400" />;
    case 'Android Development (Kotlin/Java Basics)': return <Bot className="w-4 h-4 text-green-400" />;
    case 'Provider': return <GitBranch className="w-4 h-4 text-violet-400" />;
    case 'Riverpod': return <Repeat className="w-4 h-4 text-blue-400" />;
    case 'Bloc': return <Blocks className="w-4 h-4 text-indigo-400" />;

    // Databases & Tools
    case 'MongoDB': return <Database className="w-4 h-4 text-green-500" />;
    case 'PostgreSQL': return <Database className="w-4 h-4 text-blue-400" />;
    case 'MySQL': return <Database className="w-4 h-4 text-amber-500" />;
    case 'Firebase Firestore': return <Flame className="w-4 h-4 text-amber-500" />;
    case 'Git': return <GitCommit className="w-4 h-4 text-orange-500" />;
    case 'GitHub': return <Github className="w-4 h-4 text-slate-800 dark:text-white" />;
    case 'VS Code': return <Code className="w-4 h-4 text-blue-500" />;
    case 'Android Studio': return <Bot className="w-4 h-4 text-emerald-500" />;
    case 'Postman': return <Send className="w-4 h-4 text-orange-400" />;

    // Deployment & Hosting
    case 'Vercel': return <Triangle className="w-4 h-4 text-slate-800 dark:text-white" />;
    case 'Netlify': return <CloudRain className="w-4 h-4 text-teal-400" />;
    case 'Firebase': return <Flame className="w-4 h-4 text-amber-500" />;
    case 'Heroku': return <Cloud className="w-4 h-4 text-purple-400" />;

    default: return <Code className="w-4 h-4 text-brand-purple" />;
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Frontend Development': return <Layout className="w-6 h-6 text-blue-400" />;
    case 'Backend Development': return <Server className="w-6 h-6 text-purple-400" />;
    case 'Mobile Application Development': return <Smartphone className="w-6 h-6 text-cyan-400" />;
    case 'Databases & Tools': return <Database className="w-6 h-6 text-emerald-400" />;
    case 'Deployment & Hosting': return <Cloud className="w-6 h-6 text-violet-400" />;
    default: return <Code2 className="w-6 h-6 text-brand-purple" />;
  }
};

export const SkillsSection = () => {
  const { skills: skillsData } = usePortfolio();
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="ambient-glow-cyan top-1/2 -left-32 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="✦ SKILLS & TECH STACK"
          title="Battle-Tested Technical Arsenal"
          subtitle="Curated toolchain developed over 6+ years of shipping enterprise web architectures and high-performance mobile apps."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className={`glass-card rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-glow-violet transition-all duration-300 ${
                catIdx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shrink-0">
                    {getCategoryIcon(category.category)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                      {category.category}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Badges Set */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:border-brand-purple/60 hover:bg-white dark:hover:bg-slate-700/80 transition-all duration-200 shadow-sm"
                    >
                      <div className="shrink-0 group-hover:scale-110 transition-transform">
                        {getSkillIcon(skill.name)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium tracking-tight">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-900/60 px-1.5 py-0.5 rounded ml-1">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Status */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>{category.skills.length} core competencies</span>
                <span className="text-brand-purple">Production Ready</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
