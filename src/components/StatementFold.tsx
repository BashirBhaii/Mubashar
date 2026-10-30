import React from 'react';
import { LABEL_DATA } from '../data';
import { Terminal, Sparkles } from 'lucide-react';

export function StatementFold() {
  return (
    <section 
      id="statement" 
      className="relative min-h-screen w-full bg-[#383636] border-b border-hairline flex items-center justify-between overflow-hidden px-6 sm:px-12 lg:px-20 py-20"
      aria-label="Statement and Profile Overview Section"
    >
      {/* Background Outlined Index Numeral */}
      <div className="absolute top-10 left-6 sm:left-12 pointer-events-none select-none z-0">
        <span className="text-stroke-numeral font-display font-extrabold text-[clamp(90px,16vw,220px)] leading-none block">
          02
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (lg:col-span-7): Bio, Headings, and Skills */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Small uppercase label */}
          <div className="inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.15em] text-secondary font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            <span>PROFILE STATEMENT // FULL STACK & AI INTEGRATION</span>
          </div>

          {/* Name and Tagline */}
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink">
              {LABEL_DATA.name}
              <span className="text-amber">.</span>
            </h2>
            <p className="text-sm sm:text-base font-mono uppercase tracking-[0.14em] text-teal font-semibold">
              {LABEL_DATA.tag}
            </p>
          </div>

          {/* Detailed 4-Paragraph Bio */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-secondary border-t border-hairline pt-5 max-w-2xl">
            {LABEL_DATA.descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx} className={idx === LABEL_DATA.descriptionParagraphs.length - 1 ? "text-ink font-medium pt-1" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Skills Box */}
          <div className="pt-5 border-t border-hairline max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-mono text-amber mb-3.5">
              <Terminal className="w-4 h-4" />
              <span>CORE PROFICIENCIES & METRICS</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {LABEL_DATA.coreSkills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary uppercase tracking-wider">{skill.name}</span>
                    <span className="text-amber font-semibold">{skill.percent}</span>
                  </div>
                  <div className="w-full h-1.5 bg-ground-secondary rounded-full overflow-hidden border border-hairline">
                    <div 
                      className="h-full bg-gradient-to-r from-amber to-teal rounded-full transition-all duration-700" 
                      style={{ width: skill.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (lg:col-span-5): Horizon Reflection Picture */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[3/4] rounded-2xl overflow-hidden border border-hairline bg-[#48403F] shadow-2xl group">
            {/* Horizon Reflection Photo */}
            <img
              src="/assets/aistudio/48005_6eefbbf7.jpg"
              alt="Mubashar Hussain - Horizon Reflection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-teal block">
                  HORIZON REFLECTION // SPECULAR PROFILE
                </span>
                <h3 className="font-display font-bold text-base text-ink">
                  Mubashar Hussain
                </h3>
                <p className="text-[10.5px] font-mono text-secondary">
                  Full Stack Engineer • AI Integration
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
