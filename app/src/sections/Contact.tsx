import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone, Send } from 'lucide-react';
import { contactConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          company: '',
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmitError(result.message || 'Failed to send message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setIsSubmitting(false);
      setSubmitError('Network error. Please try again in a moment.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0f0f0f]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-[#0f0f0f] pointer-events-none" />
      
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#ffd24a]/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label block mb-4">{contactConfig.sectionLabel}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {contactConfig.sectionTitle}
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            {contactConfig.subtitle}
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Contact info */}
          <div ref={contentRef} className="space-y-8">
            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#ffd24a]" />
                </div>
                <div>
                  <p className="text-sm text-[#a0a0a0] mb-1">Private Contact</p>
                  <p className="text-white">Use the secure form on this page</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#ffd24a]" />
                </div>
                <div>
                  <p className="text-sm text-[#a0a0a0] mb-1">Phone</p>
                  <a 
                    href={`tel:${contactConfig.phone}`}
                    className="text-white hover:text-[#ffd24a] transition-colors"
                  >
                    {contactConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-[#ffd24a]" />
                </div>
                <div>
                  <p className="text-sm text-[#a0a0a0] mb-1">Location</p>
                  <p className="text-white">{contactConfig.location}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-[#a0a0a0] mb-4">Connect with me</p>
              <div className="flex gap-4">
                {contactConfig.socialLinks.map((link) => {
                  const IconComponent = ICON_MAP[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-[#ffd24a] hover:border-[#ffd24a]/30 hover:bg-[#ffd24a]/5 transition-all duration-300"
                      aria-label={link.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick response note */}
            <div className="p-6 bg-[#151515] rounded-2xl border border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ffd24a]/10 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-[#ffd24a]" />
                </div>
                <div>
                  <h4 className="font-display text-white mb-2">Quick Response</h4>
                  <p className="text-sm text-[#a0a0a0]">
                    I typically respond to messages within 24 hours. Looking forward to hearing from you!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-[#151515] rounded-2xl border border-white/5 p-6 md:p-8">
            <h3 className="font-display text-xl text-white mb-2">{contactConfig.formTitle}</h3>
            <p className="text-sm text-[#a0a0a0] mb-8">{contactConfig.formDescription}</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="company"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm text-white/80 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#ffd24a]/50 input-focus transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#ffd24a]/50 input-focus transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm text-white/80 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#ffd24a]/50 input-focus transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#ffd24a] text-[#0f0f0f] font-display text-sm uppercase tracking-wider rounded-xl transition-all duration-300 btn-glow ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#ffe17a]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0f0f0f]/30 border-t-[#0f0f0f] rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitted ? (
                  <>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{contactConfig.submitButtonText}</span>
                  </>
                )}
              </button>

              {submitError ? (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {submitError}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
