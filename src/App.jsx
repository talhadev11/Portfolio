import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return (
      <AdminPanel
        onBack={() => {
          window.location.hash = '';
          setIsAdmin(false);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 selection:bg-brand-violet/30 selection:text-brand-purple transition-colors duration-300">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
