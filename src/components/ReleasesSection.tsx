import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RELEASES } from '../data';
import { ReleaseItem } from '../types';
import { ArrowLeft, ArrowRight, Disc3, ArrowUpRight } from 'lucide-react';

export function ReleasesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [throwDirection, setThrowDirection] = useState<'left' | 'right'>('right');
  const deckRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const currentRelease = RELEASES[currentIndex];

  // Advance card deck forward
  const nextCard = useCallback((direction: 'left' | 'right' = 'right') => {
    if (isThrowing) return;
    setIsThrowing(true);
    setThrowDirection(direction);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % RELEASES.length);
      setDragOffset({ x: 0, y: 0 });
      setIsThrowing(false);
    }, 280);
  }, [isThrowing]);

  // Previous card
  const prevCard = useCallback(() => {
    if (isThrowing) return;
    setCurrentIndex((prev) => (prev - 1 + RELEASES.length) % RELEASES.length);
    setDragOffset({ x: 0, y: 0 });
  }, [isThrowing]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      e.preventDefault();
      nextCard('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextCard('left');
    }
  };

  // Pointer event handlers for physical throwing
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isThrowing) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !pointerStartRef.current || isThrowing) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !pointerStartRef.current || isThrowing) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const deckWidth = deckRef.current?.offsetWidth || 340;
    const threshold = deckWidth * 0.1; // tenth of the deck width

    if (Math.abs(dragOffset.x) > threshold) {
      nextCard(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      // Snap back if threshold wasn't passed
      setDragOffset({ x: 0, y: 0 });
    }
    pointerStartRef.current = null;
  };

  return (
    <section 
      id="releases" 
      className="relative min-h-screen w-full bg-[#383636] border-b border-hairline py-24 px-6 sm:px-12 lg:px-20"
      aria-label="Catalogue Releases Section"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Headline, Lede, and Two Buttons */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.15em] text-secondary font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span>03 / FEATURED PROJECTS & CODE</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-ink">
            Full-Stack & AI Applications.
          </h2>

          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            The catalogue below is an interactive physical deck of production builds. Explore full-stack MERN architectures, Airbnb and social media platforms, and next-gen AI integration features.
          </p>

          {/* Current selected release metadata readout */}
          <div className="border border-hairline p-5 rounded-none bg-ground-secondary/50 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-secondary border-b border-hairline pb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted">ACTIVE PROJECT</span>
              <span className="text-amber font-semibold">{currentRelease.code}</span>
            </div>
            <div className="flex justify-between items-center text-ink">
              <span className="text-secondary">DEVELOPER</span>
              <span className="font-sans font-semibold">{currentRelease.artist}</span>
            </div>
            <div className="flex justify-between items-center text-ink">
              <span className="text-secondary">STATUS</span>
              <span>{currentRelease.edition}</span>
            </div>
            <div className="flex justify-between items-center text-ink">
              <span className="text-secondary">TECH SPEC</span>
              <span className="text-teal">{currentRelease.weight} • {currentRelease.speed}</span>
            </div>
          </div>

          {/* Two buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => nextCard('right')}
              className="px-6 py-3 border border-hairline text-[11px] uppercase tracking-[0.15em] font-semibold text-ink hover:text-amber hover:border-amber transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Next Project Card</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber" />
            </button>
            <a
              href="#dates"
              className="px-6 py-3 border border-hairline text-[11px] uppercase tracking-[0.15em] font-semibold text-secondary hover:text-ink hover:border-hairline transition-colors flex items-center gap-2"
            >
              <span>Skill Matrix</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>
          </div>

        </div>

        {/* Right Column: Square Throwable Physical Deck */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          
          {/* Deck Container */}
          <div 
            ref={deckRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative w-[310px] h-[310px] sm:w-[390px] sm:h-[390px] outline-none select-none cursor-grab active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-amber"
            style={{ touchAction: 'pan-y' }}
            aria-label="Physical vinyl sleeve deck. Use left and right arrow keys or drag to discard."
          >
            {/* Render cards in reverse order so top card is on top */}
            {[2, 1, 0].map((stackPosition) => {
              const releaseIdx = (currentIndex + stackPosition) % RELEASES.length;
              const release = RELEASES[releaseIdx];
              const isTop = stackPosition === 0;

              // Physical offsets for natural stacked appearance
              const offsets = [
                { rotate: 0, x: 0, y: 0, scale: 1.0 },
                { rotate: 2.8, x: 10, y: 8, scale: 0.95 },
                { rotate: -3.2, x: -8, y: 16, scale: 0.90 }
              ][stackPosition];

              let transform = `translate3d(${offsets.x}px, ${offsets.y}px, 0) rotate(${offsets.rotate}deg) scale(${offsets.scale})`;
              let transition = isDragging && isTop ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease';
              let opacity = 1 - stackPosition * 0.18;

              if (isTop) {
                if (isDragging) {
                  const rot = dragOffset.x * 0.07;
                  transform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rot}deg) scale(1.03)`;
                } else if (isThrowing) {
                  const throwX = throwDirection === 'right' ? 520 : -520;
                  const throwRot = throwDirection === 'right' ? 24 : -24;
                  transform = `translate3d(${throwX}px, -40px, 0) rotate(${throwRot}deg) scale(0.9)`;
                  opacity = 0;
                }
              }

              return (
                <div
                  key={release.code}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerUp : undefined}
                  className="absolute inset-0 w-full h-full bg-[#48403F] border border-hairline p-6 flex flex-col justify-between deck-shadow will-change-transform"
                  style={{
                    transform,
                    transition,
                    opacity,
                    zIndex: 30 - stackPosition
                  }}
                >
                  {/* Sleeve Spine Simulation */}
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-ground border-r border-hairline" />

                  {/* Top Bar of Sleeve */}
                  <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.16em]">
                    <div className="space-y-0.5">
                      <span className="text-amber font-semibold">{release.code}</span>
                      <span className="block text-muted">{release.format}</span>
                    </div>
                    <div className="text-right text-secondary">
                      <span>{release.speed}</span>
                      <span className="block text-muted font-sans">{release.year}</span>
                    </div>
                  </div>

                  {/* Middle: Architectural Typographical Sleeve Art */}
                  <div className="my-auto py-4 space-y-3">
                    <div className="w-8 h-[1.5px] bg-amber" />
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                      {release.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.15em] text-secondary font-mono">
                      {release.artist}
                    </p>
                    <p className="text-[11px] text-muted italic font-serif pt-1">
                      {release.genre}
                    </p>
                  </div>

                  {/* Sleeve Bottom Metadata & Tracks */}
                  <div className="border-t border-hairline pt-3 flex justify-between items-end font-mono text-[9.5px]">
                    <div className="space-y-0.5 text-muted">
                      <span className="block">{release.tracklist[0]}</span>
                      <span className="block text-secondary">{release.weight}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-teal font-semibold block">{release.edition}</span>
                      <span className="text-muted text-[8.5px]">LATHE-NUMBERED</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Hint line and progress dots beneath deck */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-mono">
              DRAG SLEEVE OR USE ← / → KEYS TO DISCARD
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {RELEASES.map((r, idx) => (
                <button
                  key={r.code}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 transition-all duration-200 cursor-pointer ${
                    idx === currentIndex 
                      ? 'w-6 bg-amber' 
                      : 'w-2 bg-hairline hover:bg-secondary'
                  }`}
                  aria-label={`Jump to sleeve ${r.code}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
