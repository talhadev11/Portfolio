import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileData as fallbackProfile } from '../data/profile';
import { skillsData as fallbackSkills } from '../data/skills';
import { projectsData as fallbackProjects } from '../data/projects';
import { experienceData as fallbackExperience } from '../data/experience';
import { educationData as fallbackEducation } from '../data/education';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(fallbackProfile);
  const [skills, setSkills] = useState(fallbackSkills);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experience, setExperience] = useState(fallbackExperience);
  const [education, setEducation] = useState(fallbackEducation);
  const [loading, setLoading] = useState(true);
  const [isLiveFromDb, setIsLiveFromDb] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profRes, skillRes, projRes, expRes, eduRes] = await Promise.all([
        fetch('/api/profile').then((r) => r.json()).catch(() => null),
        fetch('/api/skills').then((r) => r.json()).catch(() => null),
        fetch('/api/projects').then((r) => r.json()).catch(() => null),
        fetch('/api/experience').then((r) => r.json()).catch(() => null),
        fetch('/api/education').then((r) => r.json()).catch(() => null),
      ]);

      let isDb = false;

      if (profRes && profRes.success && profRes.data) {
        setProfile(profRes.data);
        if (!profRes.fallback) isDb = true;
      }
      if (skillRes && skillRes.success && skillRes.data) {
        setSkills(skillRes.data);
        if (!skillRes.fallback) isDb = true;
      }
      if (projRes && projRes.success && projRes.data) {
        setProjects(projRes.data);
        if (!projRes.fallback) isDb = true;
      }
      if (expRes && expRes.success && expRes.data) {
        setExperience(expRes.data);
        if (!expRes.fallback) isDb = true;
      }
      if (eduRes && eduRes.success && eduRes.data) {
        setEducation(eduRes.data);
        if (!eduRes.fallback) isDb = true;
      }

      setIsLiveFromDb(isDb);
    } catch (err) {
      console.warn('Backend not responding, using initial static dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        skills,
        setSkills,
        projects,
        setProjects,
        experience,
        setExperience,
        education,
        setEducation,
        loading,
        isLiveFromDb,
        refreshData: fetchAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
