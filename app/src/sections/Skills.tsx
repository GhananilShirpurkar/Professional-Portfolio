import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Server, Layout, Wrench } from 'lucide-react';
import { skillsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  server: Server,
  layout: Layout,
  tool: Wrench,
};

const Skills = () => {
  if (!skillsConfig.categories.length) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Skill cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.skill-category');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0f0f0f]"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ffd24a]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ffd24a]/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label block mb-4">{skillsConfig.sectionLabel}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {skillsConfig.sectionTitle}
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience in AI, backend, and frontend development.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillsConfig.categories.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Wrench;
            
            return (
              <div
                key={category.id}
                className="skill-category group relative p-6 md:p-8 bg-[#151515] rounded-2xl border border-white/5 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd24a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ffd24a]/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-[#ffd24a]" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-[#ffd24a] transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag px-4 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
              <span className="font-display text-2xl text-[#ffd24a]">AI</span>
            </div>
            <h4 className="font-display text-lg text-white mb-2">Machine Learning</h4>
            <p className="text-sm text-[#a0a0a0]">Building intelligent systems with modern ML frameworks</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
              <span className="font-display text-2xl text-[#ffd24a]">API</span>
            </div>
            <h4 className="font-display text-lg text-white mb-2">Backend Systems</h4>
            <p className="text-sm text-[#a0a0a0]">Scalable APIs and microservices architecture</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
              <span className="font-display text-2xl text-[#ffd24a]">UI</span>
            </div>
            <h4 className="font-display text-lg text-white mb-2">Modern Frontend</h4>
            <p className="text-sm text-[#a0a0a0]">Responsive, accessible, and performant interfaces</p>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full divider-line" />
    </section>
  );
};

export default Skills;
