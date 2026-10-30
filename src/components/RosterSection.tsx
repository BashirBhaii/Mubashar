import React, { useRef, useState } from 'react';
import { ROSTER } from '../data';
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Terminal } from 'lucide-react';

export function RosterSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  return (
    <section 
      id="roster" 
      className="relative w-full bg-[#383636] border-b border-hairline py-20 px-6 sm:px-12 lg:px-20"
      aria-label="Technical Skills Section"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.15em] text-secondary font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              <span>04 / CORE STACK & ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink">
              Technical Skills
            </h2>
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.15em] font-mono text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span>FULL STACK & AI COMPETENCY</span>
          </div>
        </div>

        {/* Section Grid: Left side Media (Video + Picture), Right side Skills List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (lg:col-span-5): 3D App Video Reel & Archival Picture */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Media: 3D Web App Video Reel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-secondary">
                <span className="flex items-center gap-1.5 text-amber">
                  <Sparkles className="w-3.5 h-3.5 text-amber" />
                  <span>3D WEB INTERFACE DEMO</span>
                </span>
                <span className="text-muted">KICKX SHOWCASE</span>
              </div>

              {/* Video Container with custom controls */}
              <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 aspect-[9/16] max-h-[520px] rounded-2xl overflow-hidden border border-hairline bg-[#48403F] shadow-2xl group">
                <video
                  ref={videoRef}
                  src="/assets/aistudio/47728_7506c39f.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
                  <span className="px-2.5 py-1 rounded bg-[#48403F]/90 backdrop-blur-md border border-hairline text-[9px] uppercase tracking-[0.15em] font-mono text-ink">
                    INTERACTIVE 3D
                  </span>
                  <span className="text-[9.5px] font-mono text-teal bg-[#48403F]/90 px-2 py-0.5 rounded border border-hairline">
                    {isMuted ? 'MUTED' : 'AUDIO ON'}
                  </span>
                </div>

                {/* Play icon overlay if paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20"
                  >
                    <div className="w-12 h-12 rounded-full bg-ground/90 border border-hairline flex items-center justify-center text-amber shadow-2xl">
                      <Play className="w-5 h-5 ml-0.5 fill-amber" />
                    </div>
                  </div>
                )}

                {/* Bottom Custom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 space-y-2">
                  <div 
                    onClick={handleSeek}
                    className="w-full h-1 bg-white/20 hover:h-1.5 rounded-full cursor-pointer transition-all relative overflow-hidden"
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-amber to-teal rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-ink pt-0.5 font-mono text-[10px]">
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={togglePlay}
                        className="hover:text-amber transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>

                      <button 
                        onClick={toggleMute}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 hover:text-amber transition-all cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3 h-3 text-muted" />
                            <span className="text-[9px] uppercase">Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-teal" />
                            <span className="text-[9px] uppercase text-teal">Active</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button 
                      onClick={toggleFullscreen}
                      className="hover:text-amber transition-colors cursor-pointer"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Media: Developer Portrait Photo Card */}
            <div className="pt-2">
              <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-hairline bg-[#48403F] shadow-xl group">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/assets/aistudio/48004_8f9c21ae.jpg"
                    alt="Mubashar Hussain - Technical Specialist"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-1 bg-[#48403F] border-t border-hairline">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-teal">
                      SPECIALIST ARCHIVE // 04
                    </span>
                    <span className="text-[9px] font-mono text-muted">
                      LAHORE, PK
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-ink">
                    Mubashar Hussain
                  </h4>
                  <p className="text-[10.5px] font-mono text-secondary">
                    Full Stack Developer & AI Integration Specialist
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (lg:col-span-7): Full Technical Skills Rows */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="divide-y divide-hairline border-t border-hairline">
              {ROSTER.map((artist) => (
                <div 
                  key={artist.id}
                  className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-ground-secondary/40 transition-colors px-2 sm:px-3 rounded-lg"
                >
                  {/* Left & Middle: Small uppercase accent label + Display name */}
                  <div className="space-y-1.5 md:space-y-0 md:flex md:items-baseline md:gap-6">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] font-mono text-teal block md:w-48 shrink-0">
                      {artist.discipline}
                    </span>
                    
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight group-hover:text-amber transition-colors flex items-center gap-2">
                      <span>{artist.name}</span>
                      <span className="text-muted text-[11px] font-mono font-normal">[{artist.location}]</span>
                    </h3>
                  </div>

                  {/* Right: Count & Experience */}
                  <div className="flex items-center justify-between md:justify-end gap-5 font-mono text-xs shrink-0">
                    <span className="text-secondary tracking-[0.12em] uppercase text-[11px]">
                      {artist.editionsCount}
                    </span>
                    <span className="text-muted text-[10px]">
                      {artist.activeYears}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                </div>
              ))}
            </div>

            {/* Additional Skills Tags Card */}
            <div className="p-5 rounded-2xl border border-hairline bg-[#101317]/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-amber">
                <Terminal className="w-4 h-4 text-amber" />
                <span>ENVIRONMENT & ECOSYSTEM</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                {[
                  "React", "TypeScript", "Node.js", "Express.js", "PHP", 
                  "Laravel", "MongoDB", "Mongoose", "MySQL", "SQL Server", 
                  "EJS", "Tailwind CSS", "RESTful APIs", "Gemini AI API", 
                  "Git & GitHub", "Vercel Deployment"
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-md border border-hairline bg-ground text-secondary hover:text-ink hover:border-amber transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <div className="pt-2 flex flex-col sm:flex-row justify-between text-[10px] uppercase tracking-[0.14em] font-mono text-muted">
              <span>REACT • NODE.JS • EXPRESS • PHP • LARAVEL • MONGODB • MYSQL</span>
              <span>MUBASHAR HUSSAIN // REPOSITORIES</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
