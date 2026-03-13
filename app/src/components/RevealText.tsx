import React, { useRef, useState, useCallback, useEffect } from 'react';

interface RevealTextProps {
  originalText: string;
  hiddenText: string;
  className?: string;
  revealRadius?: number;
}

/**
 * RevealText: A mask-based cursor reveal effect.
 *
 * "KoaNoir" is centered behind "GHANANIL SHIRPURKAR".
 * When the cursor enters the text area, it creates a circular
 * mask that reveals the hidden text underneath while the
 * original characters under the mask become transparent.
 */
const RevealText: React.FC<RevealTextProps> = ({
  originalText,
  hiddenText,
  className = '',
  revealRadius = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animFrameRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      animFrameRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePos(null);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Sharper mask — solid reveal up to 80%, fade only at edge
  const maskStyle = mousePos
    ? `radial-gradient(circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 80%, transparent 100%)`
    : 'radial-gradient(circle 0px at 0px 0px, transparent 100%)';

  // Inverse mask — clear hole in original text where cursor is
  const inverseMaskStyle = mousePos
    ? `radial-gradient(circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 70%, black 90%, black 100%)`
    : 'none';

  return (
    <div
      ref={containerRef}
      className={`reveal-text-wrapper relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="reveal"
      style={{ cursor: 'none' }}
    >
      {/* Layer 1: Original text (masked to hide under cursor) */}
      <span
        className="relative z-10 inline-block transition-opacity duration-200"
        style={{
          WebkitMaskImage: isHovering ? inverseMaskStyle : 'none',
          maskImage: isHovering ? inverseMaskStyle : 'none',
        }}
      >
        {originalText}
      </span>

      {/* Layer 2: Hidden alias text (masked to show only under cursor) */}
      <span
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          WebkitMaskImage: isHovering ? maskStyle : 'radial-gradient(circle 0px at 0px 0px, transparent 100%)',
          maskImage: isHovering ? maskStyle : 'radial-gradient(circle 0px at 0px 0px, transparent 100%)',
          color: '#ffd24a',
          textShadow: '0 0 20px rgba(255, 210, 74, 0.8), 0 0 40px rgba(255, 210, 74, 0.4), 0 0 60px rgba(255, 210, 74, 0.2)',
        }}
      >
        {hiddenText}
      </span>

      {/* Layer 3: Glow circle under cursor when hovering */}
      {isHovering && mousePos && (
        <div
          className="absolute z-0 pointer-events-none rounded-full"
          style={{
            width: revealRadius * 2,
            height: revealRadius * 2,
            left: mousePos.x - revealRadius,
            top: mousePos.y - revealRadius,
            background: 'radial-gradient(circle, rgba(255, 210, 74, 0.08) 0%, transparent 70%)',
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        />
      )}
    </div>
  );
};

export default RevealText;
