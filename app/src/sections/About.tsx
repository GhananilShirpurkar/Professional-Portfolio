import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Counter animation component
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value, 10);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [numericValue]);

  return (
    <span ref={counterRef} className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
      {count}{suffix}
    </span>
  );
};

import { GlowWrapper } from '../components/GlowWrapper';

const About = () => {
  if (!aboutConfig.bio && aboutConfig.stats.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats cards stagger in
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0f0f0f]"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ffd24a]/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span className="section-label block mb-4">{aboutConfig.sectionLabel}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
            {aboutConfig.sectionTitle}
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Bio */}
          <div ref={contentRef} className="space-y-6">
            {aboutConfig.bioParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-[#a0a0a0] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            
            {/* Decorative line */}
            <div className="pt-6">
              <div className="w-20 h-1 bg-gradient-to-r from-[#ffd24a] to-transparent rounded-full" />
            </div>
          </div>

          {/* Right side - Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-6">
            {aboutConfig.stats.map((stat) => (
              <GlowWrapper key={stat.id} borderRadius="1rem" className="h-full">
                <div
                  data-cursor="hover"
                  className="stat-card relative p-6 md:p-8 bg-[#151515] rounded-2xl border border-white/5 overflow-hidden group w-full h-full"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffd24a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#ffd24a]/10 to-transparent rounded-bl-full shadow-lg" />
                  
                  <div className="relative z-10">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="mt-3 text-sm md:text-base text-[#a0a0a0]">{stat.label}</p>
                  </div>
                </div>
              </GlowWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full divider-line" />
    </section>
  );
};

export default About;
