import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 md:py-20 bg-[#0a0a0a] border-t border-white/5"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#0f0f0f] pointer-events-none" />
      
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
                <span className="font-display text-xl text-[#ffd24a]">{footerConfig.brandName}</span>
              </div>
              <span className="font-display text-xl text-white">Ghananil Shirpurkar</span>
            </div>
            <p className="text-[#a0a0a0] max-w-md mb-6 leading-relaxed">
              {footerConfig.tagline}
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#ffd24a] hover:border-[#ffd24a]/30 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#ffd24a] hover:border-[#ffd24a]/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#ffd24a] hover:border-[#ffd24a]/30 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:ghananil.shirpurkar@email.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#ffd24a] hover:border-[#ffd24a]/30 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerConfig.quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-[#a0a0a0] hover:text-[#ffd24a] transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-white mb-6">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ghananil.shirpurkar@email.com"
                  className="text-[#a0a0a0] hover:text-[#ffd24a] transition-colors text-sm"
                >
                  ghananil.shirpurkar@email.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="text-[#a0a0a0] hover:text-[#ffd24a] transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="text-[#a0a0a0] text-sm">
                  Mumbai, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#a0a0a0] flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#ffd24a]" /> by Ghananil Shirpurkar
          </p>
          
          <p className="text-sm text-[#a0a0a0]">
            {footerConfig.copyright}
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#ffd24a] transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ffd24a]/10 group-hover:border-[#ffd24a]/30 transition-all">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
