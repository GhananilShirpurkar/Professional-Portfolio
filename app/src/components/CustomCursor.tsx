import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xDotTo(clientX);
      yDotTo(clientY);
      xRingTo(clientX);
      yRingTo(clientY);

      const hoverable = (e.target as HTMLElement).closest('a, button, [data-cursor]');
      const nowHovered = !!hoverable;
      
      if (nowHovered !== isHovered) {
        setIsHovered(nowHovered);
        gsap.to(ring, {
          scale: nowHovered ? 1.5 : 1,
          opacity: nowHovered ? 0 : 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: 'auto'
        });
        gsap.to(dot, {
          scale: nowHovered ? 1.5 : 1,
          opacity: nowHovered ? 0.5 : 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10001] hidden md:block">
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ffd24a]/30 z-[10001]"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ffd24a] z-[10002] shadow-[0_0_10px_rgba(255,210,74,0.5)]"
      />
    </div>
  );
};

export default CustomCursor;
