import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Github, ExternalLink, ArrowUpRight, Brain, Trophy, Code, BookOpen } from 'lucide-react';
import { projectsConfig } from '../config';
import { GlowWrapper } from '../components/GlowWrapper';

const ProjectCard = ({ project }: { project: any }) => {
  // Select appropriate icon based on category
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'featured':
        return <Brain className="w-4 h-4 text-accent-soft" />;
      case 'hackathon':
        return <Trophy className="w-4 h-4 text-accent-soft" />;
      case 'college':
        return <BookOpen className="w-4 h-4 text-accent-soft" />;
      default:
        return <Code className="w-4 h-4 text-accent-soft" />;
    }
  };

  const getCategoryLabel = () => {
    switch (project.category) {
      case 'featured':
        return 'Featured Project';
      case 'hackathon':
        return 'Hackathon Project';
      case 'college':
        return 'College Project';
      case 'small':
        return 'Small Project';
      default:
        return 'Project';
    }
  };

  return (
    <div className="project-card-wrapper h-full opacity-0">
      <GlowWrapper borderRadius="1rem" className="h-full">
        <div
          data-cursor="hover"
          className="project-card group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden h-full flex flex-col"
        >
          {/* Accent border on hover */}
          <div className="project-border absolute inset-0 rounded-2xl border-2 border-accent-soft/50 opacity-0 transition-opacity duration-300 pointer-events-none" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-soft/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full flex-grow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-soft/20 to-accent-soft/5 border border-accent-soft/30 flex items-center justify-center">
                  <span className="font-display text-sm text-accent-soft">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <span className="px-3 py-1 text-[10px] font-mono-custom uppercase tracking-wider text-accent-soft bg-accent-soft/10 rounded-full border border-accent-soft/20 flex items-center gap-1.5">
                  {getCategoryIcon()}
                  {getCategoryLabel()}
                </span>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/60 hover:text-accent-soft transition-colors rounded-lg hover:bg-white/5"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/60 hover:text-accent-soft transition-colors rounded-lg hover:bg-white/5"
                    aria-label="View Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl text-white mb-3 group-hover:text-accent-soft transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6 flex-grow line-clamp-4 group-hover:text-white/80 transition-colors">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-[10px] font-mono-custom text-white/70 bg-white/5 rounded-full border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View project link */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-accent-soft transition-colors group/link"
              >
                <span>View Project Source</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </GlowWrapper>
    </div>
  );
};

const Projects = () => {
  if (!projectsConfig.projects.length) {
    return null;
  }

  const [activeCategory, setActiveCategory] = useState<'all' | 'featured' | 'hackathon' | 'college' | 'small'>('all');
  const [visibleProjects, setVisibleProjects] = useState(projectsConfig.projects);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Compute counts for tabs
  const getCategoryCount = (category: 'all' | 'featured' | 'hackathon' | 'college' | 'small') => {
    if (category === 'all') return projectsConfig.projects.length;
    return projectsConfig.projects.filter(p => p.category === category).length;
  };

  // Initial load animation for header and section
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle staggering load for grid items whenever the visible project list changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card-wrapper');
      if (cards && cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            onComplete: () => {
              setIsTransitioning(false);
            }
          }
        );
      } else {
        setIsTransitioning(false);
      }
    }, gridRef);

    return () => ctx.revert();
  }, [visibleProjects]);

  // Dynamic filter handler with smooth GSAP fade-out exit transitions
  const handleCategoryChange = (category: 'all' | 'featured' | 'hackathon' | 'college' | 'small') => {
    if (category === activeCategory || isTransitioning) return;

    setIsTransitioning(true);
    setActiveCategory(category);

    const cards = gridRef.current?.querySelectorAll('.project-card-wrapper');
    
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
        onComplete: () => {
          const filtered = category === 'all'
            ? projectsConfig.projects
            : projectsConfig.projects.filter(p => p.category === category);
          setVisibleProjects(filtered);
        }
      });
    } else {
      const filtered = category === 'all'
        ? projectsConfig.projects
        : projectsConfig.projects.filter(p => p.category === category);
      setVisibleProjects(filtered);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-bg-primary"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-surface to-bg-primary pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <span className="section-label block mb-4">{projectsConfig.sectionLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {projectsConfig.sectionTitle}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-[#a0a0a0] max-w-md text-sm md:text-base leading-relaxed">
            Discover a curated archive of my technical buildouts, classified by scope, hackathon outcomes, and academic requirements.
          </p>
        </div>

        {/* Dynamic Category Switcher Tabs */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 p-1.5 glass-panel rounded-2xl md:rounded-full max-w-full overflow-hidden">
            {(['all', 'featured', 'hackathon', 'college', 'small'] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  disabled={isTransitioning}
                  className={`relative px-5 py-2.5 text-xs md:text-sm font-mono-custom uppercase tracking-wider rounded-xl md:rounded-full transition-all duration-300 flex items-center gap-2 outline-none ${
                    isActive
                      ? 'bg-accent-soft text-bg-primary font-semibold shadow-[0_0_20px_rgba(176,137,104,0.25)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  data-cursor="hover"
                >
                  <span>
                    {cat === 'all' && 'All Projects'}
                    {cat === 'featured' && 'Featured'}
                    {cat === 'hackathon' && 'Hackathons'}
                    {cat === 'college' && 'College Projects'}
                    {cat === 'small' && 'Small Projects'}
                  </span>
                  <span className={`text-[10px] font-mono-custom ${
                    isActive ? 'text-bg-primary/60' : 'text-white/30'
                  }`}>
                    [{String(getCategoryCount(cat)).padStart(2, '0')}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects grid */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]"
        >
          {visibleProjects.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center glass-panel rounded-2xl p-8 border border-white/5">
              <span className="text-accent-soft/80 font-mono-custom text-xs uppercase tracking-widest mb-3">
                [ Null Archive ]
              </span>
              <h4 className="font-display text-xl text-white/95 mb-2">No projects categorized here yet</h4>
              <p className="text-[#a0a0a0] text-sm max-w-sm leading-relaxed">
                Stay tuned as I continue to build, document, and publish new projects in this space!
              </p>
            </div>
          ) : (
            visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        {/* View all projects link */}
        <div className="mt-16 md:mt-24 text-center">
          <a
            href="https://github.com/GhananilShirpurkar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-accent-soft hover:text-accent-soft transition-all duration-300 group"
          >
            <Github className="w-5 h-5" />
            <span>Explore Entire Archive on GitHub</span>
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
