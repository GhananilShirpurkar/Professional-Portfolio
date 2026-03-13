import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projectsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  if (!projectsConfig.projects.length) {
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

      // Project cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0f0f0f]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-[#0f0f0f] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <span className="section-label block mb-4">{projectsConfig.sectionLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {projectsConfig.sectionTitle}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-[#a0a0a0] max-w-md">
            A selection of projects showcasing my expertise in AI, machine learning, and full-stack development.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsConfig.projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative bg-[#151515] rounded-2xl border border-white/5 overflow-hidden ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Accent border on hover */}
              <div className="project-border absolute inset-0 rounded-2xl border-2 border-[#ffd24a]/50 opacity-0 transition-opacity duration-300 pointer-events-none" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd24a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd24a]/20 to-[#ffd24a]/5 border border-[#ffd24a]/30 flex items-center justify-center">
                      <span className="font-display text-sm text-[#ffd24a]">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {project.featured && (
                      <span className="px-3 py-1 text-xs font-mono-custom uppercase tracking-wider text-[#ffd24a] bg-[#ffd24a]/10 rounded-full border border-[#ffd24a]/20">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/60 hover:text-[#ffd24a] transition-colors rounded-lg hover:bg-white/5"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white/60 hover:text-[#ffd24a] transition-colors rounded-lg hover:bg-white/5"
                        aria-label="View Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl text-white mb-3 group-hover:text-[#ffd24a] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono-custom text-white/70 bg-white/5 rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View project link */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#ffd24a] transition-colors group/link"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects link */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-[#ffd24a] hover:text-[#ffd24a] transition-all duration-300 group"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full divider-line" />
    </section>
  );
};

export default Projects;
