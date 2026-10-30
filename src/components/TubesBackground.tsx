import React, { useEffect, useRef, useState } from 'react';

// Helper for random hex colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className = "",
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Dynamic import from CDN as per reference implementation
        // @ts-ignore
        const module = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current) return;

        // Initialize neon tubes cursor with vivid amber, teal, and magenta accents
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#E8913C", "#2E6B72", "#f967fb"],
            lights: {
              intensity: 220,
              colors: ["#E8913C", "#2E6B72", "#ffffff", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // Handled internally by Three.js components
        };

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          try {
            app.destroy?.(); 
          } catch {
            // ignore
          }
        };

        const handleScroll = () => {
          if (!canvasRef.current) return;
          const isVisible = window.scrollY < window.innerHeight * 1.3;
          canvasRef.current.style.display = isVisible ? 'block' : 'none';
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        const origCleanup = cleanup;
        cleanup = () => {
          window.removeEventListener('scroll', handleScroll);
          origCleanup();
        };

      } catch (error) {
        console.error("TubesCursor fallback:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent randomizing if clicking on interactive controls (video, buttons, links, inputs)
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('video') || 
      target.closest('a') || 
      target.closest('input') || 
      target.closest('.interactive-control')
    ) {
      return;
    }

    if (!enableClickInteraction || !tubesRef.current) return;
    
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    
    try {
      tubesRef.current.tubes.setColors(colors);
      tubesRef.current.tubes.setLightsColors(lightsColors);
    } catch {
      // ignore
    }
  };

  return (
    <div 
      className={`relative w-full h-full min-h-screen overflow-hidden bg-[#0A0C0E] ${className}`}
      onClick={handleClick}
    >
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block pointer-events-auto"
        style={{ touchAction: 'none' }}
      />
      
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0E]/40 via-transparent to-[#0A0C0E]/90 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
