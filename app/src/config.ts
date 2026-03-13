// =============================================================================
// Portfolio Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Ghananil Shirpurkar | AI Engineer & Full-Stack Developer",
  description: "Portfolio of Ghananil Shirpurkar - AI Engineer and Full-Stack Developer specializing in intelligent systems, machine learning, and scalable backend architecture.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "home" | "user" | "folder" | "code" | "mail";
}

export interface HeroConfig {
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  role: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  ctaTertiary: string;
  ctaTertiaryTarget: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  brandName: "GS",
  decodeText: "GHANANIL SHIRPURKAR",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  subtitle: "I build intelligent systems using AI, machine learning,\nand scalable backend architectures.\n\nSecond-Year B.Tech Information Technology Student\nSGGSIE&T | Diploma in Computer Engineering",
  role: "AI Engineer & Full-Stack Developer",
  ctaPrimary: "View Projects",
  ctaPrimaryTarget: "projects",
  ctaSecondary: "Download Resume",
  ctaSecondaryTarget: "resume",
  ctaTertiary: "Contact Me",
  ctaTertiaryTarget: "contact",
  navItems: [
    { label: "Home", sectionId: "hero", icon: "home" },
    { label: "About", sectionId: "about", icon: "user" },
    { label: "Projects", sectionId: "projects", icon: "folder" },
    { label: "Skills", sectionId: "skills", icon: "code" },
    { label: "Contact", sectionId: "contact", icon: "mail" },
  ],
};

// -- About Section ------------------------------------------------------------
export interface Stat {
  id: number;
  value: string;
  label: string;
  suffix?: string;
}

export interface AboutConfig {
  sectionLabel: string;
  sectionTitle: string;
  bio: string;
  bioParagraphs: string[];
  stats: Stat[];
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "About Me",
  sectionTitle: "Building Intelligent Systems with AI",
  bio: "I'm a second-year B.Tech IT student at SGGSIE&T, specializing in agent-based AI systems and scalable architectures.",
  bioParagraphs: [
    "I'm a second-year B.Tech student in Information Technology at Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIE&T), with a background in Computer Engineering through my diploma.",
    "I focus on building intelligent systems that combine artificial intelligence, backend architecture, and automation to solve real-world problems. My work currently revolves around agent-based AI systems, machine learning models, and scalable backend services.",
    "My goal is to become an applied AI engineer working on real-world intelligent products and automation systems. I'm constantly learning and experimenting with new technologies to stay at the forefront of this rapidly evolving field."
  ],
  stats: [
    { id: 1, value: "2", label: "AI Projects Built", suffix: "+" },
    { id: 2, value: "7", label: "Systems & Apps Developed", suffix: "+" },
    { id: 3, value: "2025", label: "Started Programming", suffix: "" },
    { id: 4, value: "20", label: "Technologies Used", suffix: "+" },
  ],
};

// -- Projects Section ---------------------------------------------------------
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

export interface ProjectsConfig {
  sectionLabel: string;
  sectionTitle: string;
  projects: Project[];
}

export const projectsConfig: ProjectsConfig = {
  sectionLabel: "Projects",
  sectionTitle: "Featured Work",
  projects: [
    {
      id: 1,
      title: "MediSync — AI Agentic Pharmaceutical System",
      description: "AI-powered pharmaceutical automation system using specialized agents to analyze prescriptions, detect risks, and automate workflows. Built during a hackathon to demonstrate agent-based AI.",
      techStack: ["Python", "FastAPI", "LangGraph", "LangChain", "React", "SQLite", "Docker", "AI APIs"],
      githubUrl: "https://github.com/GhananilShirpurkar/Medisync",
      featured: true,
    },
    {
      id: 2,
      title: "Fake News Detection System — NLP ML Model",
      description: "Machine learning system that detects misinformation using NLP. Converts text into numerical features via TF-IDF and applies classification models like Logistic Regression and Naive Bayes.",
      techStack: ["Python", "Scikit-learn", "TF-IDF", "Pandas", "NumPy", "CustomTkinter", "Matplotlib"],
      githubUrl: "https://github.com/GhananilShirpurkar/Fake-News-Detector",
      featured: true,
    },
    {
      id: 3,
      title: "Job & Course Recommendation",
      description: "In Progress: ML recommendation system that analyzes user profiles, interests, and skills to suggest relevant career paths and learning opportunities.",
      techStack: ["Python", "Scikit-learn", "Pandas"],
      githubUrl: "https://github.com/GhananilShirpurkar",
      featured: false,
    },
    {
      id: 4,
      title: "AI Tutor",
      description: "Planned: AI-powered learning assistant that allows students to upload study materials and interact with an intelligent tutor to get explanations and summaries.",
      techStack: ["Python", "LangChain", "OpenAI"],
      githubUrl: "https://github.com/GhananilShirpurkar",
      featured: false,
    },
  ],
};

// -- Skills Section -----------------------------------------------------------
export interface SkillCategory {
  id: number;
  title: string;
  skills: string[];
  icon: string;
}

export interface SkillsConfig {
  sectionLabel: string;
  sectionTitle: string;
  categories: SkillCategory[];
}

export const skillsConfig: SkillsConfig = {
  sectionLabel: "Skills",
  sectionTitle: "Technologies & Tools",
  categories: [
    {
      id: 1,
      title: "AI / Machine Learning",
      icon: "brain",
      skills: ["Scikit-learn", "LangChain", "LangGraph", "LangFuse", "TF-IDF", "Python"],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: "server",
      skills: ["FastAPI", "Django", "Django REST Framework", "REST APIs", "Node.js"],
    },
    {
      id: 3,
      title: "Frontend Development",
      icon: "layout",
      skills: ["React", "Tailwind CSS", "JavaScript", "TypeScript"],
    },
    {
      id: 4,
      title: "Data & Tools",
      icon: "tool",
      skills: ["Pandas", "NumPy", "Matplotlib", "Git", "GitHub", "Docker", "SQLite", "MySQL", "PostgreSQL", "Linux"],
    },
    {
      id: 5,
      title: "Programming Languages",
      icon: "code",
      skills: ["Python", "Java", "JavaScript", "C", "C++"],
    },
  ],
};

// -- Contact Section ----------------------------------------------------------
export interface SocialLink {
  icon: "github" | "linkedin" | "twitter" | "mail";
  label: string;
  href: string;
}

export interface ContactConfig {
  sectionLabel: string;
  sectionTitle: string;
  subtitle: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  formTitle: string;
  formDescription: string;
  submitButtonText: string;
}

export const contactConfig: ContactConfig = {
  sectionLabel: "Contact",
  sectionTitle: "Let's Work Together",
  subtitle: "Have a project in mind? Let's discuss how we can bring your ideas to life.",
  phone: "",
  location: "Maharashtra, India",
  socialLinks: [
    { icon: "github", label: "GitHub", href: "https://github.com/GhananilShirpurkar" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ghananil-shirpurkar23" },
  ],
  formTitle: "Send a Message",
  formDescription: "Fill out the form below and I'll get back to you as soon as possible.",
  submitButtonText: "Send Message",
};

// -- Footer Section -----------------------------------------------------------
export interface FooterConfig {
  brandName: string;
  tagline: string;
  copyright: string;
  quickLinks: string[];
}

export const footerConfig: FooterConfig = {
  brandName: "GS",
  tagline: "Building intelligent systems using AI, machine learning, and scalable backend architecture.",
  copyright: "© 2026 Ghananil Shirpurkar. All rights reserved.",
  quickLinks: ["Home", "About", "Projects", "Skills", "Contact"],
};
