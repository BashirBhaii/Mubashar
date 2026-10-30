import React, { useState, useRef } from 'react';
import { TubesBackground } from './TubesBackground';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowDown, 
  Sparkles, 
  X, 
  Disc,
  Expand,
  Terminal,
  Code2
} from 'lucide-react';

interface IntroShowcaseProps {
  onEnterPortal: () => void;
}

export function IntroShowcase({ onEnterPortal }: IntroShowcaseProps) {
  // Primary Reel Video
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Lightbox modal state (can display photo or video in full resolution)
  const [lightboxItem, setLightboxItem] = useState<{
    type: 'image' | 'video';
    src: string;
    title: string;
    tag: string;
    meta?: string;
  } | null>(null);

  // Video playback toggles
  const toggleVideoPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  // 3 Archival Photo Plates
  const PHOTO_ITEMS = [
    {
      id: 'img-horizon',
      src: '/public/assets/aistudio/48005_6eefbbf7.jpg',
      title: 'Horizon Reflection',
      code: 'PLATE 02',
      location: 'Mirror Terrace • Pine Ridge',
    },
    {
      id: 'img-terrace',
      src: '/public/assets/aistudio/48004_8f9c21ae.jpg',
      title: 'Terrace Reflection',
      code: 'PLATE 03',
      location: 'Sunset Specular • Mountain Glade',
    },
    {
      id: 'img-arch',
      src: '/public/assets/aistudio/48009_11535b54.jpg',
      title: 'Architectural Scale',
      code: 'PLATE 04',
      location: 'Grand Chandelier • Structural Focus',
    }
  ];

  return (
    <section 
      id="intro"
      className="relative w-full min-h-screen bg-[#0A0C0E] border-b border-hairline flex flex-col justify-between"
      aria-label="Profile Video and Visual Showcase"
    >
      <TubesBackground className="w-full min-h-screen flex flex-col justify-between">
        
        {/* Top Header Strip inside Intro */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-18 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-secondary">
              PROFILE // MUBASHAR HUSSAIN VISUAL ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="hidden md:inline-flex items-center gap-1.5 text-secondary">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              <span>Click background to randomize 3D neon tubes</span>
            </span>
            <button
              onClick={onEnterPortal}
              className="px-4 py-1.5 rounded-full border border-hairline bg-[#101317]/80 text-[10.5px] uppercase tracking-[0.14em] text-ink hover:text-amber hover:border-amber transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Jump To Portal</span>
              <ArrowDown className="w-3 h-3 text-amber" />
            </button>
          </div>
        </div>

        {/* Center Main Stage: Left Editorial Intro + Right 2x2 Square Collage */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 my-auto pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (lg:col-span-5): Editorial Intro, Identity & Quick Action */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Category chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-[#101317]/90 text-[10px] uppercase tracking-[0.15em] font-mono text-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                <span>FULL STACK ENGINEER & AI INTEGRATOR</span>
              </div>

              {/* Display Headline */}
              <div className="space-y-2">
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink leading-[1.05]">
                  Mubashar Hussain
                  <span className="text-amber">.</span>
                </h1>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-amber font-semibold">
                  REACT • NODE.JS • TYPESCRIPT • AI PIPELINES
                </p>
              </div>

              {/* Bio summary */}
              <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-lg border-l-2 border-amber/60 pl-4 py-1">
                Developing responsive full-stack applications and integrating Gemini AI APIs. Specialized in clean React/TypeScript architectures, custom Express & Laravel backends, and scalable database schemas.
              </p>

              {/* Technical Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 max-w-md font-mono text-[11px]">
                <div className="p-3 rounded-xl border border-hairline bg-[#101317]/70 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted block flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-teal" />
                    <span>CORE STACK</span>
                  </span>
                  <span className="text-ink font-semibold">React + TypeScript</span>
                  <span className="text-secondary text-[10px] block">Node.js • Express • PHP</span>
                </div>

                <div className="p-3 rounded-xl border border-hairline bg-[#101317]/70 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted block flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-amber" />
                    <span>AI & CLOUD</span>
                  </span>
                  <span className="text-ink font-semibold">AI Integration</span>
                  <span className="text-secondary text-[10px] block">Gemini API • Vercel</span>
                </div>
              </div>

              {/* Jump to portal button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onEnterPortal}
                  className="px-6 py-3 rounded-xl border border-amber/70 bg-amber/10 hover:bg-amber text-amber hover:text-black text-xs uppercase tracking-[0.14em] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg group"
                >
                  <span>Enter Portfolio Portal</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <a
                  href="#releases"
                  className="px-5 py-3 rounded-xl border border-hairline bg-[#101317]/70 hover:border-amber text-ink hover:text-amber text-xs uppercase tracking-[0.14em] font-mono transition-colors"
                >
                  View Projects
                </a>
              </div>

            </div>

            {/* Right Column (lg:col-span-7): Shifted 2x2 Square Collage */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
              
              <div className="w-full max-w-[460px] sm:max-w-[490px] space-y-3">
                
                {/* Collage Header Strip */}
                <div className="border-b border-hairline pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <h3 className="font-display font-bold text-sm sm:text-base text-ink tracking-tight">
                      Visual Archive & Media Collage
                    </h3>
                  </div>
                </div>

                {/* 2x2 Square Collage Grid (All items in perfect 1:1 Square aspect-ratio) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  
                  {/* Square 1: Primary Cinematic Reel Video */}
                  <div 
                    className="relative w-full aspect-square rounded-2xl overflow-hidden border border-hairline bg-[#101317] hover:border-amber transition-all duration-300 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.9)] group flex flex-col justify-end"
                  >
                    <video
                      ref={videoRef}
                      src="/public/assets/aistudio/48003_946de653.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                      onClick={() => toggleVideoPlay()}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Controls Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-20">
                      <span className="px-2 py-0.5 rounded bg-[#0A0C0E]/80 backdrop-blur-md border border-hairline text-[8px] uppercase tracking-[0.14em] font-mono text-amber flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber" />
                        <span>01 // REEL</span>
                      </span>

                      <button
                        onClick={toggleVideoMute}
                        className="p-1 rounded bg-[#0A0C0E]/80 border border-hairline text-ink hover:text-amber transition-colors pointer-events-auto cursor-pointer"
                        aria-label="Toggle reel audio"
                      >
                        {isVideoMuted ? <VolumeX className="w-3 h-3 text-muted" /> : <Volume2 className="w-3 h-3 text-teal" />}
                      </button>
                    </div>

                    {/* Play/Pause overlay if paused */}
                    {!isVideoPlaying && (
                      <div 
                        onClick={() => toggleVideoPlay()}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#0A0C0E]/90 border border-hairline flex items-center justify-center text-amber shadow-2xl">
                          <Play className="w-4 h-4 ml-0.5 fill-amber" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Details */}
                    <div className="relative z-20 p-2.5 flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[7.5px] font-mono uppercase tracking-[0.16em] text-teal block">
                          CINEMATIC REEL // SQUARE
                        </span>
                        <h4 className="font-display font-bold text-xs text-ink truncate">
                          Primary Reel
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setLightboxItem({
                            type: 'video',
                            src: '/public/assets/aistudio/48003_946de653.mp4',
                            title: 'Mubashar Hussain - Primary Cinematic Reel',
                            tag: '01 // PRIMARY CINEMATIC REEL'
                          })}
                          className="p-1 rounded-full bg-[#0A0C0E]/80 border border-hairline text-amber hover:scale-110 transition-transform cursor-pointer"
                          aria-label="Expand cinematic reel"
                        >
                          <Expand className="w-2.5 h-2.5" />
                        </button>

                        <button
                          onClick={toggleFullscreen}
                          className="p-1 rounded-full bg-[#0A0C0E]/80 border border-hairline text-ink hover:text-amber transition-colors cursor-pointer"
                          aria-label="Fullscreen"
                        >
                          <Maximize2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Squares 2, 3, 4: 3 Photos in perfect 1:1 Square aspect-ratio */}
                  {PHOTO_ITEMS.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setLightboxItem({
                        type: 'image',
                        src: photo.src,
                        title: photo.title,
                        tag: `${photo.code} // ${photo.title.toUpperCase()}`,
                        meta: photo.location
                      })}
                      className="group relative w-full aspect-square rounded-2xl overflow-hidden border border-hairline bg-[#101317] hover:border-amber transition-all duration-300 cursor-pointer shadow-[0_15px_35px_-8px_rgba(0,0,0,0.85)] flex flex-col justify-end"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                      {/* Top Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="px-2 py-0.5 rounded bg-[#0A0C0E]/80 backdrop-blur-md border border-hairline text-[8px] uppercase tracking-[0.14em] font-mono text-ink">
                          {photo.code}
                        </span>
                      </div>

                      {/* Bottom Details */}
                      <div className="relative z-10 p-2.5 flex items-end justify-between">
                        <div>
                          <span className="text-[7.5px] font-mono uppercase tracking-[0.16em] text-teal block truncate">
                            {photo.code} // SQUARE PLATE
                          </span>
                          <h4 className="font-display font-bold text-xs text-ink truncate">
                            {photo.title}
                          </h4>
                        </div>

                        <div className="p-1 rounded-full bg-[#0A0C0E]/70 border border-hairline text-amber opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Expand className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Subtitle tag below collage */}
                <div className="text-center sm:text-right">
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.15em] text-muted">
                    4-PIECE ARCHIVAL COMPOSITE // SQUARE RATIO
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Bottom Bar with Scroll Indicator */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-hairline/60 pointer-events-auto">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <Disc className="w-3.5 h-3.5 text-amber" />
            <span>MUBASHAR HUSSAIN // FULL STACK & AI INTEGRATION</span>
          </div>

          <button
            onClick={onEnterPortal}
            className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink hover:text-amber transition-colors cursor-pointer"
          >
            <span>SCROLL TO UNCOVER PORTAL</span>
            <span className="text-amber animate-bounce">[ ↓ ]</span>
          </button>
        </div>

      </TubesBackground>

      {/* Lightbox Modal for Full Resolution Photo or Video Viewing */}
      {lightboxItem && (
        <div 
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl border border-hairline bg-[#0E1013] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-3.5 border-b border-hairline flex items-center justify-between bg-[#101317]">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.16em] text-teal block">
                  {lightboxItem.tag}
                </span>
                <h3 className="font-display font-bold text-sm text-ink">
                  {lightboxItem.title}
                </h3>
                {lightboxItem.meta && (
                  <p className="text-[10px] font-mono text-muted">
                    {lightboxItem.meta}
                  </p>
                )}
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-1.5 rounded-full bg-[#101317] border border-hairline text-ink hover:text-amber transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Media Content */}
            <div className="p-3 flex items-center justify-center bg-black">
              {lightboxItem.type === 'image' ? (
                <img 
                  src={lightboxItem.src} 
                  alt={lightboxItem.title} 
                  className="max-h-[78vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <video 
                  src={lightboxItem.src} 
                  controls 
                  autoPlay 
                  playsInline 
                  className="max-h-[78vh] w-auto object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
