import React from 'react';
import { useGlow } from '../hooks/useGlow';

interface GlowWrapperProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export const GlowWrapper: React.FC<GlowWrapperProps> = ({ 
  children, 
  className = "", 
  borderRadius = "1rem" 
}) => {
  const glowRef = useGlow();
  
  return (
    <div 
      ref={glowRef} 
      className={`glow-card ${className}`}
      style={{ borderRadius } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
