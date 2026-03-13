import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const cursorTailRef = useRef<HTMLDivElement>(null);
  
  // Refs for physics
  const mousePos = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);
  const isRevealRef = useRef(false);
  const isHoveredRef = useRef(false);

  // State for border/shadow styling only (not transform)
  const [isHovered, setIsHovered] = useState(false);
  const [isReveal, setIsReveal] = useState(false);

  useEffect(() => {
    // Hidden on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const dot = cursorDotRef.current;
    const trail = cursorTrailRef.current;
    const tail = cursorTailRef.current;

    if (!dot || !trail || !tail) return;

    // Set initial positions off-screen
    gsap.set([dot, trail, tail], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Fluid QuickTo setters
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    
    // Trail is elastic
    const xTrailTo = gsap.quickTo(trail, "x", { duration: 0.3, ease: "elastic.out(1, 0.6)" });
    const yTrailTo = gsap.quickTo(trail, "y", { duration: 0.3, ease: "elastic.out(1, 0.6)" });

    // Tail follows with more lag
    const xTailTo = gsap.quickTo(tail, "x", { duration: 0.4, ease: "power2.out" });
    const yTailTo = gsap.quickTo(tail, "y", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate velocity
      const dx = clientX - prevPos.current.x;
      const dy = clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Smooth the velocity
      velocity.current = velocity.current * 0.7 + speed * 0.3;
      
      prevPos.current = { x: clientX, y: clientY };
      mousePos.current = { x: clientX, y: clientY };

      xDotTo(clientX);
      yDotTo(clientY);
      xTrailTo(clientX);
      yTrailTo(clientY);
      xTailTo(clientX);
      yTailTo(clientY);

      // Velocity-based dot stretching
      const stretch = Math.min(velocity.current * 0.03, 0.8);
      gsap.to(dot, {
        rotation: currentAngle,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.4,
        duration: 0.15,
        overwrite: 'auto'
      });

      // Tail elongation
      const tailStretch = Math.min(velocity.current * 0.08, 3.0);
      gsap.to(tail, {
        rotation: currentAngle,
        scaleX: 1 + tailStretch,
        scaleY: 1 - tailStretch * 0.3,
        opacity: Math.min(velocity.current * 0.04, 0.6),
        duration: 0.1,
        overwrite: 'auto'
      });

      // Hover/reveal detection
      const target = e.target as HTMLElement;
      const hoverable = target.closest('[data-cursor], a, button');
      const revealEl = target.closest('[data-cursor="reveal"]');
      
      const wasReveal = isRevealRef.current;
      const nowReveal = !!revealEl;
      const nowHovered = !!hoverable;
      
      isRevealRef.current = nowReveal;
      isHoveredRef.current = nowHovered;

      // Scale trail via GSAP (not CSS transform which gets overwritten)
      if (nowReveal && !wasReveal) {
        gsap.to(trail, {
          scale: 13,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      } else if (!nowReveal && wasReveal) {
        gsap.to(trail, {
          scale: nowHovered ? 2 : 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: 'auto'
        });
      } else if (!nowReveal) {
        if (nowHovered !== isHoveredRef.current) {
          gsap.to(trail, {
            scale: nowHovered ? 2 : 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: 'auto'
          });
        }
      }

      setIsHovered(nowHovered);
      setIsReveal(nowReveal);
    };

    // Decay loop
    const decayTicker = gsap.ticker.add(() => {
      velocity.current *= 0.92;
      
      if (velocity.current < 0.5) {
        gsap.to(dot, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          overwrite: 'auto'
        });
        gsap.to(tail, {
          scaleX: 1,
          scaleY: 1,
          opacity: 0,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });

    const handleMouseDown = () => {
      if (!isRevealRef.current) {
        gsap.to(dot, { scale: 1.8, duration: 0.3, ease: "power2.out" });
        gsap.to(trail, { scale: 0.7, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseUp = () => {
      if (!isRevealRef.current) {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(trail, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      gsap.ticker.remove(decayTicker);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10001] hidden md:block">
      {/* Velocity Tail */}
      <div
        ref={cursorTailRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full z-[10000]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 210, 74, 0.5) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)',
          opacity: 0,
          transformOrigin: 'center center',
        }}
      />

      {/* Plasma Trail Ring */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border z-[10001]"
        style={{
          borderColor: isReveal ? 'rgba(255, 210, 74, 0.5)' : isHovered ? '#FFD24A' : 'rgba(124, 58, 237, 0.4)',
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.4s',
          boxShadow: isReveal
            ? '0 0 80px rgba(255, 210, 74, 0.2), inset 0 0 60px rgba(255, 210, 74, 0.06)'
            : isHovered ? '0 0 20px rgba(255, 210, 74, 0.2)' : 'none',
          background: isReveal
            ? 'radial-gradient(circle, rgba(255, 210, 74, 0.08) 0%, rgba(255, 210, 74, 0.02) 50%, transparent 70%)'
            : 'transparent',
        }}
      />

      {/* Plasma Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[10002]"
        style={{
          background: '#FFF3B0',
          boxShadow: '0 0 15px 5px #FFD24A, 0 0 30px 10px #7C3AED',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default CustomCursor;
