import { useEffect } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import CustomCursor from './components/CustomCursor';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && siteConfig.description) {
      metaDescription.setAttribute('content', siteConfig.description);
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#0f0f0f] overflow-x-hidden">
      <CustomCursor />
      {/* Hero Section - Full-screen landing */}
      <Hero />

      {/* About Section - Bio and stats */}
      <About />

      {/* Projects Section - Featured work */}
      <Projects />

      {/* Skills Section - Technologies and tools */}
      <Skills />

      {/* Contact Section - Form and info */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
