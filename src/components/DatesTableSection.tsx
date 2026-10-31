import React from 'react';
import { TOUR_DATES } from '../data';

export function DatesTableSection() {
  return (
    <section 
      id="dates" 
      className="relative w-full bg-[#383636] border-b border-hairline py-24 px-6 sm:px-12 lg:px-20"
      aria-label="Engagements and Availability Table"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.15em] text-secondary font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              <span>05 / ENGAGEMENTS & AVAILABILITY</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-ink">
              Availability & Services
            </h2>
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.14em] font-mono text-muted">
            SEASON 2026 — 2027
          </div>
        </div>

        {/* Main Content Layout: Table on left, Forest Canopy Photo on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Table Container (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Table on medium/large screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline text-[10px] uppercase tracking-[0.15em] font-mono text-secondary">
                    <th className="py-3.5 font-normal">SERVICE & DOMAIN</th>
                    <th className="py-3.5 font-normal">TIMELINE</th>
                    <th className="py-3.5 font-normal">FORMAT</th>
                    <th className="py-3.5 font-normal text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {TOUR_DATES.map((date) => (
                    <tr 
                      key={date.id} 
                      className="group hover:bg-ground-secondary/40 transition-colors"
                    >
                      {/* Display-face first column */}
                      <td className="py-4 font-display font-bold text-base text-ink group-hover:text-amber transition-colors">
                        <span>{date.city}</span>
                        <span className="block font-sans text-xs text-secondary font-normal mt-0.5">{date.venue}</span>
                      </td>

                      {/* Neutral metadata columns */}
                      <td className="py-4 font-mono text-xs text-secondary">
                        {date.date}
                      </td>

                      <td className="py-4 text-xs text-muted font-mono">
                        {date.format}
                      </td>

                      {/* Status indicator strictly in type or dot, never a filled area */}
                      <td className="py-4 text-right font-mono text-[10px] uppercase tracking-[0.14em]">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            date.statusType === 'amber' ? 'bg-amber' :
                            date.statusType === 'teal' ? 'bg-teal' : 'bg-muted'
                          }`} />
                          <span className={
                            date.statusType === 'amber' ? 'text-amber' :
                            date.statusType === 'teal' ? 'text-teal' : 'text-muted'
                          }>
                            {date.status}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Collapsing to a two-column card per row on narrow screens */}
            <div className="md:hidden divide-y divide-hairline">
              {TOUR_DATES.map((date) => (
                <div key={date.id} className="py-5 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-lg text-ink">{date.city}</h3>
                      <p className="text-xs text-secondary">{date.venue}</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] inline-flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        date.statusType === 'amber' ? 'bg-amber' :
                        date.statusType === 'teal' ? 'bg-teal' : 'bg-muted'
                      }`} />
                      <span className={
                        date.statusType === 'amber' ? 'text-amber' :
                        date.statusType === 'teal' ? 'text-teal' : 'text-muted'
                      }>
                        {date.status}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1.5 border-t border-hairline/50">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted font-mono block">TIMELINE</span>
                      <span className="text-secondary font-mono">{date.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted font-mono block">DEVELOPER</span>
                      <span className="text-ink">{date.artists}</span>
                    </div>
                  </div>

                  <div className="text-[10px] uppercase font-mono text-muted tracking-wider">
                    {date.format}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (lg:col-span-4): Project video */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end w-full">
            <video
              src="/assets/aistudio/47730_21969c1b.mp4"
              aria-label="AHAPE International website project video"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full max-w-[320px] aspect-[3/4] rounded-2xl border border-hairline bg-[#48403F] object-cover shadow-2xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
