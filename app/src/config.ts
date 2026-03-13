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
  subtitle: "I build intelligent systems using AI, machine learning, and scalable backend architecture.",
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
  sectionTitle: "Building the Future with AI",
  bio: "I'm a passionate second-year IT student with a deep interest in artificial intelligence and software development.",
  bioParagraphs: [
    "I'm a passionate second-year IT student with a deep interest in artificial intelligence and software development. My journey in tech started with curiosity about how machines can learn and evolve, which led me to explore the fascinating world of AI and machine learning.",
    "I specialize in building AI-powered systems that solve real-world problems. From developing intelligent chatbots to creating machine learning models for data analysis, I love turning complex concepts into practical applications.",
    "My goal is to become an applied AI engineer, bridging the gap between cutting-edge research and real-world implementations. I'm constantly learning and experimenting with new technologies to stay at the forefront of this rapidly evolving field."
  ],
  stats: [
    { id: 1, value: "8", label: "AI Projects Built", suffix: "+" },
    { id: 2, value: "12", label: "Systems Developed", suffix: "+" },
    { id: 3, value: "3", label: "Years Programming", suffix: "" },
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
      title: "MediSync",
      description: "An AI-powered agentic pharmaceutical system that streamlines medication management, drug interaction checking, and prescription validation using intelligent automation.",
      techStack: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "React"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: true,
    },
    {
      id: 2,
      title: "Fake News Detection System",
      description: "NLP-based machine learning model that analyzes news articles to detect misinformation using transformer architectures and sentiment analysis.",
      techStack: ["Python", "TensorFlow", "BERT", "Scikit-learn", "Flask"],
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 3,
      title: "Notes Sharing Platform",
      description: "A collaborative student platform for sharing study materials, notes, and resources with real-time synchronization and social features.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: true,
    },
    {
      id: 4,
      title: "AI Code Assistant",
      description: "Intelligent coding companion that provides code suggestions, bug detection, and automated refactoring recommendations.",
      techStack: ["Python", "OpenAI API", "VS Code API", "TypeScript"],
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      id: 5,
      title: "Data Visualization Dashboard",
      description: "Interactive analytics dashboard for visualizing complex datasets with real-time updates and customizable widgets.",
      techStack: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      id: 6,
      title: "Smart Task Manager",
      description: "AI-enhanced productivity tool that prioritizes tasks based on deadlines, importance, and user behavior patterns.",
      techStack: ["React Native", "Python", "TensorFlow", "Firebase"],
      githubUrl: "https://github.com",
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
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "BERT", "OpenAI API", "NumPy", "Pandas"],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: "server",
      skills: ["Django", "FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL"],
    },
    {
      id: 3,
      title: "Frontend Development",
      icon: "layout",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3", "JavaScript", "Framer Motion"],
    },
    {
      id: 4,
      title: "Tools & Technologies",
      icon: "tool",
      skills: ["Git", "GitHub", "Docker", "Linux", "AWS", "VS Code", "Jupyter", "Postman", "Figma"],
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
  email: string;
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
  email: "ghananil.shirpurkar@email.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  socialLinks: [
    { icon: "github", label: "GitHub", href: "https://github.com" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    { icon: "twitter", label: "Twitter", href: "https://twitter.com" },
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
  tagline: "Building intelligent systems for a smarter tomorrow.",
  copyright: "© 2026 Ghananil Shirpurkar. All rights reserved.",
  quickLinks: ["Home", "About", "Projects", "Skills", "Contact"],
};
