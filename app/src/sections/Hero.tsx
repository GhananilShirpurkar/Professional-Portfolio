import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Home, User, Folder, Code, Mail, Download, ArrowRight } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  home: Home,
  user: User,
  folder: Folder,
  code: Code,
  mail: Mail,
};

const Hero = () => {
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Role fade in
      gsap.fromTo(
        roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      // Buttons slide up
      gsap.fromTo(
        buttonsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.8 }
      );

      // Floating shapes
      if (shapesRef.current) {
        const shapes = shapesRef.current.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
          gsap.to(shape, {
            y: 'random(-30, 30)',
            x: 'random(-20, 20)',
            rotation: 'random(-10, 10)',
            duration: 'random(4, 6)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0f0f0f]"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animated-gradient opacity-50" />
        
        {/* Floating shapes */}
        <div ref={shapesRef} className="absolute inset-0 overflow-hidden">
          {/* Large circle */}
          <div className="floating-shape absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#ffd24a]/10 to-transparent blur-3xl" />
          
          {/* Small circle */}
          <div className="floating-shape-delayed absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-[#ffd24a]/5 to-transparent blur-3xl" />
          
          {/* Bottom glow */}
          <div className="floating-shape absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#ffd24a]/5 to-transparent blur-3xl" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 210, 74, 0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 210, 74, 0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/50 to-[#0f0f0f]" />
      </div>

      {/* Navigation pill */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 hidden md:block"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/70 hover:text-[#ffd24a] transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-4 py-3 md:hidden">
        <div className="flex items-center gap-4">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-white/70 hover:text-[#ffd24a] transition-colors"
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
              <span className="font-display text-lg text-[#ffd24a]">{heroConfig.brandName}</span>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Role badge */}
          <p
            ref={roleRef}
            className="font-mono-custom text-xs md:text-sm text-[#ffd24a] uppercase tracking-[0.3em] mb-6 opacity-0"
          >
            {heroConfig.role}
          </p>

          {/* Main title with decode effect */}
          <h1
            ref={titleRef}
            className="decode-text text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold text-white leading-none tracking-tighter mb-8"
          >
            <span className={`${isDecoding ? 'text-glow-gold' : ''} transition-all duration-300`}>
              {displayText}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-[#a0a0a0] max-w-2xl leading-relaxed mb-10 opacity-0 px-4 whitespace-pre-line"
          >
            {heroConfig.subtitle}
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#ffd24a] text-[#0f0f0f] font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#ffe17a] transition-all duration-300 btn-glow"
            >
              {heroConfig.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="group flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-[#ffd24a] hover:text-[#ffd24a] transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              {heroConfig.ctaSecondary}
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaTertiaryTarget)}
              className="group flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-[#ffd24a] hover:text-[#ffd24a] transition-all duration-300"
            >
              {heroConfig.ctaTertiary}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono-custom text-xs text-[#a0a0a0] uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#ffd24a]/50 to-transparent" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffd24a]/30 to-transparent" />
    </section>
  );
};

export default Hero;
