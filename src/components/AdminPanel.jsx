import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, RefreshCw, Mail, User, Clock, Trash2, CheckCircle, 
  Search, ArrowLeft, Filter, AlertTriangle, Eye, ShieldCheck, Plus, Save, Edit3, X,
  Briefcase, GraduationCap, FolderGit2, Code2, Layers, Sparkles, Check, Flame, RotateCcw,
  Send, History, MessageSquare, CornerDownLeft, Reply, CheckCheck, Loader2, Image, Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminPanel = ({ onBack }) => {
  const { 
    profile, setProfile, 
    skills, setSkills, 
    projects, setProjects, 
    experience, setExperience, 
    education, setEducation, 
    refreshData 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'skills' | 'projects' | 'experience' | 'education' | 'messages'
  const [dbStatus, setDbStatus] = useState('checking');
  const [saveStatus, setSaveStatus] = useState(''); // success message toast
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgSearch, setMsgSearch] = useState('');
  const [msgFilter, setMsgFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState(null);

  // In-Panel Direct Email Reply State
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [lastSentPreviewUrl, setLastSentPreviewUrl] = useState('');

  // Local Form States
  const [profileForm, setProfileForm] = useState(profile);
  const [skillsForm, setSkillsForm] = useState(skills);
  const [projectsForm, setProjectsForm] = useState(projects);
  const [experienceForm, setExperienceForm] = useState(experience);
  const [educationForm, setEducationForm] = useState(education);

  // Editing modals / state handlers
  const [editingProject, setEditingProject] = useState(null);
  const [editingExp, setEditingExp] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    setProfileForm(profile);
    setSkillsForm(skills);
    setProjectsForm(projects);
    setExperienceForm(experience);
    setEducationForm(education);
  }, [profile, skills, projects, experience, education]);

  // Sync reply subject and reset reply fields when selecting a different message
  useEffect(() => {
    if (selectedMsg) {
      const defaultSubject = selectedMsg.subject?.startsWith('Re:')
        ? selectedMsg.subject
        : `Re: ${selectedMsg.subject || 'Your message'}`;
      setReplySubject(defaultSubject);
      setReplyMessage('');
      setLastSentPreviewUrl('');
    }
  }, [selectedMsg?._id]);

  const fetchHealthAndMessages = async () => {
    try {
      const healthRes = await fetch('/api/health').catch(() => null);
      if (healthRes && healthRes.ok) {
        const healthData = await healthRes.json();
        setDbStatus(healthData.database === 'connected' ? 'connected' : 'disconnected');
      } else {
        setDbStatus('offline');
      }

      setMsgLoading(true);
      const msgRes = await fetch('/api/contact').catch(() => null);
      if (msgRes && msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) setMessages(msgData.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthAndMessages();
  }, []);

  const showToast = (msg, isErr = false) => {
    if (isErr) {
      setSaveError(msg);
      setTimeout(() => setSaveError(''), 4000);
    } else {
      setSaveStatus(msg);
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  // --- SAVE HANDLERS FOR EACH SECTION ---

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.data);
        showToast('Profile & Bio updated successfully in MongoDB!');
      } else {
        throw new Error(data.message || 'Failed to save profile');
      }
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjects = async () => {
    setIsSaving(true);
    try {
      // Save all projects or single update
      for (const proj of projectsForm) {
        if (proj._id) {
          await fetch(`/api/projects/${proj._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proj),
          });
        } else {
          await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proj),
          });
        }
      }
      await refreshData();
      showToast('Projects saved and synced with MongoDB!');
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProject = async () => {
    const newProj = {
      title: 'New Web/Mobile Project',
      category: 'web',
      shortDescription: 'High performance web application build.',
      fullDescription: 'Detailed architecture description.',
      tags: ['React.js', 'Node.js', 'Tailwind CSS'],
      featured: true,
      stats: { metric: '100% Test Coverage' },
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-600 via-indigo-600 to-violet-700',
      badge: 'Web App',
    };
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProj),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjectsForm((prev) => [...prev, data.data]);
        await refreshData();
        showToast('New project created in MongoDB!');
      }
    } catch (err) {
      showToast('Failed to create project: ' + err.message, true);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from MongoDB?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjectsForm((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        await refreshData();
        showToast('Project deleted successfully.');
      }
    } catch (err) {
      showToast('Failed to delete project', true);
    }
  };

  const handleSaveExperience = async () => {
    setIsSaving(true);
    try {
      for (const exp of experienceForm) {
        if (exp._id) {
          await fetch(`/api/experience/${exp._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exp),
          });
        } else {
          await fetch('/api/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exp),
          });
        }
      }
      await refreshData();
      showToast('Career experience updated in MongoDB!');
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddExperience = async () => {
    const newExp = {
      role: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      location: 'Remote',
      period: '2026 — Present',
      type: 'Full-time',
      description: 'Building next-generation distributed systems.',
      achievements: ['Delivered key microservices.', 'Reduced latency by 40%.'],
      skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
    };
    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExperienceForm((prev) => [...prev, data.data]);
        await refreshData();
        showToast('New career role added!');
      }
    } catch (err) {
      showToast('Failed to add experience role', true);
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this career role?')) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setExperienceForm((prev) => prev.filter((e) => e._id !== id && e.id !== id));
        await refreshData();
        showToast('Experience role deleted.');
      }
    } catch (err) {
      showToast('Failed to delete experience role', true);
    }
  };

  const handleSaveEducation = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/education', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(educationForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEducation(data.data);
        showToast('Education & Certifications saved to MongoDB!');
      } else {
        throw new Error(data.message || 'Failed to save education');
      }
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSkills = async () => {
    setIsSaving(true);
    try {
      for (const cat of skillsForm) {
        if (cat._id) {
          await fetch(`/api/skills/${cat._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cat),
          });
        } else {
          await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cat),
          });
        }
      }
      await refreshData();
      showToast('Skills & Tech Stack updated in MongoDB!');
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleForceSeed = async () => {
    if (!window.confirm('Re-seed MongoDB with initial portfolio default data? (This will overwrite changes)')) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        await refreshData();
        showToast('MongoDB database re-seeded successfully!');
      }
    } catch (err) {
      showToast('Failed to seed database: ' + err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  // Message actions
  const handleMessageStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
        if (selectedMsg && selectedMsg._id === id) setSelectedMsg((prev) => ({ ...prev, status }));
      }
    } catch (err) {
      showToast('Failed to update message status', true);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMsg?._id === id) setSelectedMsg(null);
        showToast('Message deleted.');
      }
    } catch (err) {
      showToast('Failed to delete message', true);
    }
  };

  // Direct Email Reply Handler
  const handleSendReply = async (e) => {
    if (e) e.preventDefault();
    if (!selectedMsg) return;
    if (!replyMessage.trim()) {
      showToast('Please enter your reply message before sending.', true);
      return;
    }

    setIsSendingReply(true);
    setLastSentPreviewUrl('');

    try {
      const res = await fetch(`/api/contact/${selectedMsg._id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replySubject: replySubject.trim(),
          replyMessage: replyMessage.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Email sent successfully to ${selectedMsg.name} (${selectedMsg.email})!`);
        
        // Update local state with latest contact doc (including replies array)
        const updatedContact = data.data;
        setSelectedMsg(updatedContact);
        setMessages((prev) =>
          prev.map((m) => (m._id === updatedContact._id ? updatedContact : m))
        );

        if (data.previewUrl) {
          setLastSentPreviewUrl(data.previewUrl);
        }

        // Clear reply body
        setReplyMessage('');
      } else {
        throw new Error(data.message || 'Failed to send reply email');
      }
    } catch (err) {
      console.error('Reply error:', err);
      showToast(err.message || 'Error sending reply email', true);
    } finally {
      setIsSendingReply(false);
    }
  };

  const replyTemplates = [
    {
      label: '⚡ General Reply',
      text: `Hi ${selectedMsg?.name || 'there'},\n\nThank you for reaching out! I appreciate your message regarding "${selectedMsg?.subject || 'your project'}".\n\nI would be delighted to discuss this further with you. Could you share a few more details or your preferred timeline?\n\nLooking forward to hearing from you!\n\nBest regards,\nTalha`,
    },
    {
      label: '⚡ Schedule Discovery Call',
      text: `Hi ${selectedMsg?.name || 'there'},\n\nThank you for getting in touch! I'd love to schedule a quick 15-20 minute call to go over your requirements and answer any questions.\n\nPlease let me know which dates and times work best for you this week.\n\nBest regards,\nTalha`,
    },
    {
      label: '⚡ Project Quotation',
      text: `Hi ${selectedMsg?.name || 'there'},\n\nThank you for sharing your project vision. Based on the requirements, I have the full-stack and mobile expertise to deliver a high-performance solution.\n\nLet's connect so I can provide a comprehensive architecture roadmap, milestones, and estimate for you.\n\nBest regards,\nTalha`,
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'skills', label: 'Skills & Tech Stack', icon: Layers },
    { id: 'projects', label: 'Projects & Apps', icon: FolderGit2 },
    { id: 'experience', label: 'Career Timeline', icon: Briefcase },
    { id: 'education', label: 'Education & Certs', icon: GraduationCap },
    { id: 'messages', label: `Inbox (${messages.filter(m => m.status === 'unread').length})`, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-display">Portfolio Control Center</h1>
                <p className="text-xs text-slate-400">Manage all live frontend content directly from MongoDB</p>
              </div>
            </div>
          </div>

          {/* Database Status & Seed Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  dbStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                }`}
              ></span>
              <span>MongoDB: <strong className={dbStatus === 'connected' ? 'text-emerald-400' : 'text-rose-400'}>{dbStatus}</strong></span>
            </div>

            <button
              onClick={handleForceSeed}
              disabled={isSaving}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              title="Reset MongoDB with default portfolio data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Seed</span>
            </button>
          </div>
        </div>

        {/* Toast Alerts */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveStatus}</span>
            </motion.div>
          )}
          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{saveError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 custom-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">Manage Profile & Bio</h2>
                <p className="text-xs text-slate-400">Control your hero header, tagline, bio paragraphs, and contact channels</p>
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile to MongoDB</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={profileForm.title || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Years of Experience Badge</label>
                <input
                  type="text"
                  value={profileForm.experienceYears || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Rotating Hero Roles (comma-separated)</label>
                <input
                  type="text"
                  value={(profileForm.roles || []).join(', ')}
                  onChange={(e) => setProfileForm({ ...profileForm, roles: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Hero Tagline</label>
              <textarea
                rows={2}
                value={profileForm.tagline || ''}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">Bio Paragraphs (one per line)</label>
              <textarea
                rows={4}
                value={(profileForm.bio || []).join('\n')}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value.split('\n') })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Contact Details */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Contact Info & Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="text"
                    value={profileForm.contact?.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, email: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.contact?.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, location: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Availability</label>
                  <input
                    type="text"
                    value={profileForm.contact?.availability || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, availability: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">Manage Skills & Tech Stack</h2>
                <p className="text-xs text-slate-400">Edit categories, descriptions, and technology items displayed on the homepage</p>
              </div>
              <button
                onClick={handleSaveSkills}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Skills to MongoDB</span>
              </button>
            </div>

            <div className="space-y-6">
              {skillsForm.map((cat, catIdx) => (
                <div key={cat._id || catIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const copy = [...skillsForm];
                        copy[catIdx].category = e.target.value;
                        setSkillsForm(copy);
                      }}
                      className="text-base font-bold text-purple-400 bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Category description"
                      value={cat.description}
                      onChange={(e) => {
                        const copy = [...skillsForm];
                        copy[catIdx].description = e.target.value;
                        setSkillsForm(copy);
                      }}
                      className="w-full sm:w-2/3 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                    />
                  </div>

                  {/* Individual Skills Chips */}
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-2">Technologies (comma-separated names):</div>
                    <textarea
                      rows={2}
                      value={(cat.skills || []).map((s) => s.name).join(', ')}
                      onChange={(e) => {
                        const copy = [...skillsForm];
                        const names = e.target.value.split(',').map((n) => n.trim()).filter(Boolean);
                        copy[catIdx].skills = names.map((name) => ({ name, level: 'Expert', icon: 'Code2' }));
                        setSkillsForm(copy);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">Manage Web & Mobile Projects</h2>
                <p className="text-xs text-slate-400">Add, edit, or delete case studies, stats, live URLs, and tech tags</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Add New Project</span>
                </button>
                <button
                  onClick={handleSaveProjects}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Projects to MongoDB</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsForm.map((proj, pIdx) => (
                <div key={proj._id || proj.id || pIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {proj.category}
                    </span>
                    <button
                      onClick={() => handleDeleteProject(proj._id || proj.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const copy = [...projectsForm];
                        copy[pIdx].title = e.target.value;
                        setProjectsForm(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={proj.shortDescription}
                      onChange={(e) => {
                        const copy = [...projectsForm];
                        copy[pIdx].shortDescription = e.target.value;
                        setProjectsForm(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    />
                  </div>

                  {/* Project Image / Cover Pic */}
                  <div className="space-y-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <Image className="w-3.5 h-3.5 text-purple-400" />
                        <span>Project Pic / Cover Image</span>
                      </label>
                      <label className="cursor-pointer px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 flex items-center gap-1 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const copy = [...projectsForm];
                                copy[pIdx].image = reader.result;
                                setProjectsForm(copy);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="Paste Image URL (https://...) or upload file above"
                      value={proj.image || ''}
                      onChange={(e) => {
                        const copy = [...projectsForm];
                        copy[pIdx].image = e.target.value;
                        setProjectsForm(copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500"
                    />

                    {/* Image Preview Thumbnail */}
                    {proj.image ? (
                      <div className="relative h-24 rounded-lg overflow-hidden border border-slate-800 group/img">
                        <img
                          src={proj.image}
                          alt="Project Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...projectsForm];
                            copy[pIdx].image = '';
                            setProjectsForm(copy);
                          }}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white text-[10px] hover:bg-rose-600 transition-colors"
                          title="Remove picture"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 italic">No image picture selected (will default to gradient background).</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.liveUrl}
                        onChange={(e) => {
                          const copy = [...projectsForm];
                          copy[pIdx].liveUrl = e.target.value;
                          setProjectsForm(copy);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub Repository</label>
                      <input
                        type="text"
                        value={proj.githubUrl}
                        onChange={(e) => {
                          const copy = [...projectsForm];
                          copy[pIdx].githubUrl = e.target.value;
                          setProjectsForm(copy);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-purple-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAREER EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">Manage Career Timeline</h2>
                <p className="text-xs text-slate-400">Add work history, roles, companies, achievements, and key skills</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddExperience}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Add New Role</span>
                </button>
                <button
                  onClick={handleSaveExperience}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Experience to MongoDB</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {experienceForm.map((exp, eIdx) => (
                <div key={exp._id || exp.id || eIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const copy = [...experienceForm];
                          copy[eIdx].role = e.target.value;
                          setExperienceForm(copy);
                        }}
                        className="text-base font-bold text-white bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none"
                      />
                      <span className="text-xs text-slate-500 font-semibold">at</span>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const copy = [...experienceForm];
                          copy[eIdx].company = e.target.value;
                          setExperienceForm(copy);
                        }}
                        className="text-sm font-semibold text-purple-400 bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => handleDeleteExperience(exp._id || exp.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Period / Duration</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const copy = [...experienceForm];
                          copy[eIdx].period = e.target.value;
                          setExperienceForm(copy);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Location / Work Type</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const copy = [...experienceForm];
                          copy[eIdx].location = e.target.value;
                          setExperienceForm(copy);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Key Achievements (one per line)</label>
                    <textarea
                      rows={3}
                      value={(exp.achievements || []).join('\n')}
                      onChange={(e) => {
                        const copy = [...experienceForm];
                        copy[eIdx].achievements = e.target.value.split('\n');
                        setExperienceForm(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EDUCATION */}
        {activeTab === 'education' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">Manage Education & Certifications</h2>
                <p className="text-xs text-slate-400">Update academic degrees and industry certificates</p>
              </div>
              <button
                onClick={handleSaveEducation}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Education to MongoDB</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Degrees */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Degrees & Academics</h3>
                {(educationForm.degrees || []).map((deg, dIdx) => (
                  <div key={deg.id || dIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Degree Title</label>
                        <input
                          type="text"
                          value={deg.degree}
                          onChange={(e) => {
                            const copy = { ...educationForm };
                            copy.degrees[dIdx].degree = e.target.value;
                            setEducationForm(copy);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={deg.institution}
                          onChange={(e) => {
                            const copy = { ...educationForm };
                            copy.degrees[dIdx].institution = e.target.value;
                            setEducationForm(copy);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Certifications</h3>
                {(educationForm.certifications || []).map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Certification Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const copy = { ...educationForm };
                            copy.certifications[cIdx].title = e.target.value;
                            setEducationForm(copy);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Issuing Authority</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const copy = { ...educationForm };
                            copy.certifications[cIdx].issuer = e.target.value;
                            setEducationForm(copy);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MESSAGES & DIRECT EMAIL REPLY */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Message List & Filters */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Inbox ({messages.length})
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  {['all', 'unread', 'replied'].map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setMsgFilter(flt)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        msgFilter === flt
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 max-h-[620px] overflow-y-auto custom-scrollbar pr-1">
                {messages.length === 0 && (
                  <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 text-xs">
                    No contact inquiries found.
                  </div>
                )}

                {messages
                  .filter((m) => {
                    if (msgFilter === 'unread') return m.status === 'unread';
                    if (msgFilter === 'replied') return m.status === 'replied';
                    return true;
                  })
                  .map((m) => {
                    const isSelected = selectedMsg?._id === m._id;
                    const hasReplies = m.replies && m.replies.length > 0;
                    return (
                      <div
                        key={m._id}
                        onClick={() => setSelectedMsg(m)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                          isSelected
                            ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/30'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-bold text-xs text-white truncate">{m.name}</span>
                            {m.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shrink-0"></span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-purple-300 truncate mb-1">{m.subject}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{m.message}</p>

                        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold capitalize ${
                              m.status === 'replied'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : m.status === 'read'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : m.status === 'archived'
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold'
                            }`}
                          >
                            {m.status}
                          </span>
                          {hasReplies && (
                            <span className="text-slate-400 flex items-center gap-1">
                              <CheckCheck className="w-3 h-3 text-emerald-400" />
                              <span>{m.replies.length} {m.replies.length === 1 ? 'reply' : 'replies'}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right: Selected Message Details & Interactive Reply Box */}
            <div className="lg:col-span-8">
              {selectedMsg ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                  
                  {/* Message Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-lg font-bold text-white font-display">{selectedMsg.subject}</h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            selectedMsg.status === 'replied'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {selectedMsg.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span>
                          From: <strong className="text-white">{selectedMsg.name}</strong> &lt;
                          <span className="text-purple-400 font-mono">{selectedMsg.email}</span>&gt;
                        </span>
                        <span>•</span>
                        <span>{new Date(selectedMsg.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleDeleteMessage(selectedMsg._id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-1.5 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Status Toggle Bar */}
                  <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400">Status:</span>
                    <div className="flex items-center gap-1.5">
                      {['unread', 'read', 'replied', 'archived'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleMessageStatus(selectedMsg._id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                            selectedMsg.status === st
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Original Message Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-400">Original Inquiry</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans selection:bg-purple-500/30">
                      {selectedMsg.message}
                    </div>
                  </div>

                  {/* Reply History (if any) */}
                  {selectedMsg.replies && selectedMsg.replies.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <History className="w-3.5 h-3.5" />
                        <span>Sent Replies ({selectedMsg.replies.length})</span>
                      </div>

                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {selectedMsg.replies.map((rep, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-emerald-300">
                                {rep.replySubject || 'Direct Email Reply'}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(rep.sentAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                              {rep.replyMessage}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DIRECT EMAIL REPLY WORKSTATION */}
                  <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <div className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
                          <Reply className="w-3.5 h-3.5" />
                        </div>
                        <span>Reply Directly to {selectedMsg.name}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono">
                        <span className="text-slate-500">To:</span>
                        <strong className="text-purple-400">{selectedMsg.email}</strong>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Email Subject
                      </label>
                      <input
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        placeholder="Re: Subject..."
                        required
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                    </div>

                    {/* Quick Response Templates */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Insert Quick Template:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {replyTemplates.map((tpl, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setReplyMessage(tpl.text)}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1"
                          >
                            <span>{tpl.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reply Body Textarea */}
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Reply Message (Delivered directly to {selectedMsg.email})
                      </label>
                      <textarea
                        rows={6}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder={`Write your response directly to ${selectedMsg.name} (${selectedMsg.email})...`}
                        required
                        className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y leading-relaxed font-sans"
                      />
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setReplyMessage('')}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Clear Form
                      </button>

                      <button
                        type="submit"
                        disabled={isSendingReply || !replyMessage.trim()}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                      >
                        {isSendingReply ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Email to {selectedMsg.email}...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Reply to {selectedMsg.name}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                </div>
              ) : (
                <div className="p-16 text-center text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
                  <Mail className="w-8 h-8 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-400">No message selected</p>
                  <p className="text-xs text-slate-600">Select any message from the left to view and compose an email reply.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
