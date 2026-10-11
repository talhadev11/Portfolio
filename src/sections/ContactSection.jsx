import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Globe, ArrowUpRight, Linkedin, Github } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { profileData } from '../data/profile';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const endpoint = apiUrl ? `${apiUrl}/api/contact` : '/api/contact';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Submission failed (status: ${response.status})`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message ||
        `Failed to send message. Please ensure the backend server and MongoDB are running, or email directly at ${profileData.contact.email}`
      );
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="✦ GET IN TOUCH"
          title="Let's Build Something Exceptional"
          subtitle="Have an ambitious web platform or mobile application in mind? Reach out to discuss architecture, availability, and partnerships."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Info (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Status: Available</span>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Open for Senior Engineering Contracts & Consultations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you need full-lifecycle mobile app development, frontend refactoring to Next.js/React, or microservice architecture design, I am ready to accelerate your timeline.
              </p>
            </div>

            {/* Direct Details Cards */}
            <div className="space-y-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=talhavirk616@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-brand-purple/50 transition-all"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-violet/10 text-brand-purple flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Email Directly</div>
                  <div className="text-xs sm:text-base font-semibold text-slate-900 dark:text-white break-all sm:truncate group-hover:text-brand-purple transition-colors">
                    talhavirk616@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-talha-031885323/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-brand-cyan/50 transition-all"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">LinkedIn</div>
                  <div className="text-xs sm:text-base font-semibold text-slate-900 dark:text-white break-all sm:truncate group-hover:text-brand-cyan transition-colors">
                    linkedin.com/in/muhammad-talha-031885323
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/talhadev11/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-brand-purple/50 transition-all"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-violet/10 text-brand-purple flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">GitHub</div>
                  <div className="text-xs sm:text-base font-semibold text-slate-900 dark:text-white break-all sm:truncate group-hover:text-brand-purple transition-colors">
                    github.com/talhadev11
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Location</div>
                  <div className="text-xs sm:text-base font-semibold text-slate-900 dark:text-white">
                    Pakistan (GMT+5)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Contact Form (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                Fill out the details below and I'll get back to you with project estimates or scheduling details.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. I have received your message and will review your project requirements promptly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sarah Connor"
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500/40'
                            : 'border-slate-200 dark:border-slate-700 focus:border-brand-purple focus:ring-brand-purple/30'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@example.com"
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-500 focus:ring-rose-500/40'
                            : 'border-slate-200 dark:border-slate-700 focus:border-brand-purple focus:ring-brand-purple/30'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject / Project Scope *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Flutter Mobile App MVP or Next.js Web Platform"
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.subject
                          ? 'border-rose-500 focus:ring-rose-500/40'
                          : 'border-slate-200 dark:border-slate-700 focus:border-brand-purple focus:ring-brand-purple/30'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project goals, technical requirements, and ideal launch timeline..."
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:ring-rose-500/40'
                          : 'border-slate-200 dark:border-slate-700 focus:border-brand-purple focus:ring-brand-purple/30'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-brand-violet to-brand-accent hover:from-purple-600 hover:to-indigo-600 shadow-glow-violet transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
