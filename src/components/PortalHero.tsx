import React, { useEffect, useRef, useState } from 'react';
import { LABEL_DATA } from '../data';
import { ArrowDown, Check, Sparkles } from 'lucide-react';

export function PortalHero() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Smooth scroll progress tracker with requestAnimationFrame damping
  useEffect(() => {
    let animId: number | null = null;

    // Smooth physics lerp loop that cleanly stops when settled
    const updateMotion = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.14;
        setProgress(currentProgressRef.current);
        animId = requestAnimationFrame(updateMotion);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(targetProgressRef.current);
        animId = null;
      }
    };

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const navOffset = 58;
      const windowHeight = window.innerHeight;
      
      // Total scrollable runway distance while sticky stage is pinned
      const runwayHeight = runwayRef.current.offsetHeight;
      const pinnedStageHeight = windowHeight - navOffset;
      const totalScrollable = runwayHeight - pinnedStageHeight;

      if (totalScrollable <= 0) return;

      // When runway top reaches the bottom of the navbar (rect.top <= navOffset),
      // uncover progress initiates. As user scrolls down, rect.top becomes more negative.
      const scrolled = navOffset - rect.top;
      const target = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      targetProgressRef.current = target;

      if (animId === null) {
        animId = requestAnimationFrame(updateMotion);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, []);

  // Smoothstep easing curve for organic tactile acceleration & deceleration
  const eased = progress * progress * (3 - 2 * progress);

  // 1. Panels parting outward past their own width - 100% cleared by the end of uncover
  const leftPanelTransform = `translateX(-${eased * 102}%)`;
  const rightPanelTransform = `translateX(${eased * 102}%)`;
  // Fade out panel borders in final 15% to guarantee zero sub-pixel edge lines
  const panelOpacity = eased > 0.85 ? Math.max(0, 1 - (eased - 0.85) * 6.5) : 1;

  // 2. Inner Hero Artwork gently settles from 1.09 down to 1.00
  const imageScale = 1.09 - eased * 0.09;

  // 3. Duotone overlay rises smoothly
  const duotoneOpacity = eased * 0.32;

  // 4. Accent dots travel outward to opposite corners
  const amberDotTransform = `translate(-${eased * 38}vw, -${eased * 30}vh)`;
  const tealDotTransform = `translate(${eased * 38}vw, ${eased * 30}vh)`;

  // 5. Title wordmark: subtle scale and controlled translation
  const titleScale = 1.0 + eased * 0.05;
  const letterSpacing = `${0.02 - eased * 0.03}em`;
  const spanTranslateDistance = eased * 20;

  // Interactive scroll-to-uncover or proceed-to-statement click handler
  const handleIndicatorClick = () => {
    if (!runwayRef.current) return;
    const navOffset = 58;
    const windowHeight = window.innerHeight;
    const runwayHeight = runwayRef.current.offsetHeight;
    const pinnedStageHeight = windowHeight - navOffset;
    const totalScrollable = runwayHeight - pinnedStageHeight;
    const runwayTop = runwayRef.current.getBoundingClientRect().top + window.pageYOffset;

    if (progress < 0.95) {
      // Smoothly scroll down the runway to complete the uncover
      window.scrollTo({
        top: runwayTop + totalScrollable - navOffset,
        behavior: 'smooth'
      });
    } else {
      // Already uncovered: smoothly proceed to PROFILE STATEMENT (#statement)
      const statementEl = document.getElementById('statement');
      if (statementEl) {
        const statementTop = statementEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: statementTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const isUncovered = progress >= 0.92;

  return (
    <section 
      id="portal" 
      ref={runwayRef}
      className="relative w-full h-[220vh] bg-[#383636] border-b border-hairline"
      aria-label="Portal Cover and Scroll Uncover Sequence"
    >
      {/* 
        Sticky Pinned Stage:
        Pins at top-[58px] (directly beneath the fixed navbar) and stays locked on-screen
        while user scrolls through the 220vh runway.
        Only when uncover completes (progress === 1.0) does scrolling release and advance to PROFILE STATEMENT.
      */}
      <div className="sticky top-[58px] h-[calc(100vh-58px)] w-full overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#383636] select-none">
        
        {/* Stage Enclosure Frame */}
        <div className="relative w-full h-full max-h-[820px] max-w-[1232.2px] mx-auto rounded-xl sm:rounded-2xl overflow-hidden isolate flex items-center justify-center border border-hairline/60 bg-[#0E1013] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
          
          {/* Layer 1: Full-bleed Inner Hero Visuals (Acoustic Vinyl Geometry & Architecture) */}
          <div 
            className="absolute inset-0 w-full h-full transform will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: `scale(${imageScale})` }}
          >
            <div className="relative w-full h-full bg-[#0E1013] overflow-hidden">
              {/* Concentric microgroove rings */}
              <div className="absolute inset-0 flex items-center justify-center opacity-35">
                <svg 
                  className="w-[720px] h-[720px] sm:w-[840px] sm:h-[840px] max-w-none will-change-transform" 
                  viewBox="0 0 1000 1000" 
                  fill="none"
                >
                  {Array.from({ length: 32 }).map((_, i) => (
                    <circle
                      key={i}
                      cx="500"
                      cy="500"
                      r={130 + i * 11}
                      stroke={i % 4 === 0 ? "rgba(232, 145, 60, 0.22)" : i % 5 === 0 ? "rgba(46, 107, 114, 0.28)" : "rgba(237, 231, 220, 0.07)"}
                      strokeWidth={i % 3 === 0 ? "1.2" : "0.7"}
                      strokeDasharray={i % 2 === 0 ? "6 2" : "none"}
                    />
                  ))}
                  {/* Centre spindle & dead wax lead-in run-out */}
                  <circle cx="500" cy="500" r="100" fill="#14171A" stroke="rgba(237, 231, 220, 0.2)" strokeWidth="1.5" />
                  <circle cx="500" cy="500" r="26" fill="#0A0C0E" stroke="#E8913C" strokeWidth="1.5" />
                  <text x="500" y="475" textAnchor="middle" fill="#EDE7DC" fontSize="10.5" fontFamily="Sora" letterSpacing="0.18em" opacity="0.65">MUBASHAR HUSSAIN // FULL STACK</text>
                  <text x="500" y="535" textAnchor="middle" fill="#2E6B72" fontSize="9" fontFamily="Sora" letterSpacing="0.14em">AI INTEGRATION • MERN STACK</text>
                </svg>
              </div>

              {/* Ambient lighting derived from photography: Amber warmth and deep Teal shadow */}
              <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vh] rounded-full bg-[#E8913C]/14 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vh] rounded-full bg-[#2E6B72]/18 blur-[140px] pointer-events-none" />
            </div>
          </div>

          {/* Layer 2: Duotone Wash blending Amber & Teal with mix-blend-mode: overlay */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-75"
            style={{ 
              opacity: duotoneOpacity,
              mixBlendMode: 'overlay',
              background: 'linear-gradient(135deg, rgba(232, 145, 60, 0.75) 0%, rgba(46, 107, 114, 0.75) 100%)' 
            }}
          />

          {/* Layer 3: Radial veil darkening the edges */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 35%, rgba(56, 54, 54, 0.65) 75%, #383636 100%)'
            }}
          />

          {/* Layer 4: TWO Solid Panels parting outward - completely clear by end */}
          {/* Left Panel */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-[51.5%] bg-[#383636] border-r border-hairline z-20 will-change-transform flex items-center justify-end pr-4 pointer-events-none"
            style={{ 
              transform: leftPanelTransform,
              opacity: panelOpacity,
              transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out'
            }}
          >
            <div className="hidden sm:block text-[8.5px] uppercase tracking-[0.2em] text-muted -rotate-90 origin-right translate-x-2 font-mono">
              PORTAL_A // COVER_SHUTTER
            </div>
          </div>

          {/* Right Panel */}
          <div 
            className="absolute top-0 bottom-0 right-0 w-[51.5%] bg-[#383636] border-l border-hairline z-20 will-change-transform flex items-center justify-start pl-4 pointer-events-none"
            style={{ 
              transform: rightPanelTransform,
              opacity: panelOpacity,
              transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out'
            }}
          >
            <div className="hidden sm:block text-[8.5px] uppercase tracking-[0.2em] text-muted rotate-90 origin-left -translate-x-2 font-mono">
              PORTAL_B // COVER_SHUTTER
            </div>
          </div>

          {/* Layer 5: Two Glowing Accent Dots at the centre travelling outward to opposite corners */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div 
              className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_12px_#E8913C] will-change-transform"
              style={{ 
                transform: amberDotTransform,
                transition: 'transform 0.08s ease-out'
              }}
            />
            <div 
              className="w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_12px_#2E6B72] will-change-transform"
              style={{ 
                transform: tealDotTransform,
                transition: 'transform 0.08s ease-out'
              }}
            />
          </div>

          {/* Layer 6: Wordmark on top - Mubashar & Hussain Bold, Small, and Equal text size */}
          <div className="relative z-40 text-center pointer-events-none px-4 max-w-4xl mx-auto">
            <div 
              className="inline-flex flex-col items-center justify-center will-change-transform"
              style={{ 
                transform: `scale(${titleScale})`,
                letterSpacing: letterSpacing,
                transition: 'transform 0.08s ease-out'
              }}
            >
              {/* Mubashar and Hussain: Equal size, Bold, Small */}
              <h1 className="font-display font-bold text-[clamp(20px,3vw,36px)] sm:text-[clamp(24px,3.5vw,42px)] text-ink flex items-center justify-center gap-2 sm:gap-3 leading-tight tracking-[-0.02em]">
                <span 
                  className="inline-block whitespace-nowrap will-change-transform"
                  style={{ 
                    transform: `translateX(-${spanTranslateDistance}%)`,
                    transition: 'transform 0.08s ease-out'
                  }}
                >
                  {LABEL_DATA.leftHalf}
                </span>
                <span 
                  className="inline-block whitespace-nowrap will-change-transform"
                  style={{ 
                    transform: `translateX(${spanTranslateDistance}%)`,
                    transition: 'transform 0.08s ease-out'
                  }}
                >
                  {LABEL_DATA.rightHalf}
                </span>
              </h1>

              {/* Tag: Full Stack Development with AI Integration */}
              <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-[#48403F]/90 backdrop-blur-md shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span className="text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.14em] text-ink font-semibold">
                  {LABEL_DATA.tag}
                </span>
              </div>
            </div>
          </div>

          {/* Corner Metadata pinned to top and bottom edges */}
          <div className="absolute top-[18px] left-5 sm:left-8 z-30 text-[9.5px] uppercase tracking-[0.14em] font-mono text-secondary">
            <span className="text-amber mr-1.5">●</span>
            <span>{LABEL_DATA.imprintCode}</span>
          </div>

          <div className="absolute top-[18px] right-5 sm:right-8 z-30 text-[9.5px] uppercase tracking-[0.14em] font-mono text-secondary text-right">
            <span>{LABEL_DATA.pressSpec}</span>
          </div>

          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-8 z-30 text-[9.5px] uppercase tracking-[0.14em] font-mono text-muted flex items-center gap-2">
            <span>{LABEL_DATA.location}</span>
          </div>

          {/* Interactive Scroll to Uncover / Uncovered Proceed Pill */}
          <button
            onClick={handleIndicatorClick}
            className={`absolute bottom-4 sm:bottom-5 right-4 sm:right-7 z-40 px-3.5 py-1.5 rounded-full border text-[9.5px] uppercase tracking-[0.14em] font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xl ${
              isUncovered 
                ? 'bg-amber text-[#383636] border-amber font-bold animate-pulse'
                : 'bg-[#48403F]/90 text-ink border-hairline hover:border-amber hover:text-amber'
            }`}
            aria-label={isUncovered ? "Cover Uncovered, Proceed to Statement" : "Scroll or click to uncover portal"}
          >
            {isUncovered ? (
              <>
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>UNCOVERED // PROCEED TO STATEMENT</span>
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </>
            ) : (
              <>
                <span>SCROLL TO UNCOVER</span>
                <span className="text-amber font-semibold font-mono">
                  {Math.round(progress * 100)}%
                </span>
                <ArrowDown className="w-3 h-3 text-amber animate-bounce" />
              </>
            )}
          </button>

          {/* Hairline grid accents on stage corners */}
          <div className="absolute top-12 left-0 right-0 h-[1px] bg-hairline/60 pointer-events-none" />
          <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-hairline/60 pointer-events-none" />

          {/* Sleek bottom edge progress bar for tactile uncover feedback */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 z-40">
            <div 
              className="h-full bg-gradient-to-r from-amber via-teal to-amber will-change-[width] transition-all duration-75"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
