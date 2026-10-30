import React, { useState } from 'react';
import { LABEL_DATA } from '../data';
import { ArrowUpRight, Check, Terminal, Mail } from 'lucide-react';

export function CloseSection() {
  const [dispatchEmail, setDispatchEmail] = useState('');
  const [dispatchSubmitted, setDispatchSubmitted] = useState(false);

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const senderEmail = dispatchEmail.trim();
    if (!senderEmail) return;

    const subject = encodeURIComponent('Portfolio inquiry');
    const body = encodeURIComponent(`Please contact me at ${senderEmail}.`);
    window.location.href = `mailto:mubashar11711@gmail.com?subject=${subject}&body=${body}`;
    setDispatchSubmitted(true);
  };

  return (
    <footer 
      id="close" 
      className="relative w-full bg-[#383636] pt-20 overflow-hidden border-t border-hairline"
      aria-label="Archive Close and Contact Section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 space-y-16">
        
        {/* Contact Section Grid with 3rd Photo Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* 3rd Photo integrated in Contact Section */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden border border-hairline bg-[#48403F] shadow-2xl group">
              <img
                src="/assets/aistudio/48009_11535b54.jpg"
                alt="Mubashar Hussain - Architectural Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-teal block">
                    ARCHIVAL PROFILE // 03
                  </span>
                  <span className="font-display font-bold text-sm text-ink">
                    Mubashar Hussain
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details & Action Form */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.15em] text-secondary font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                <span>06 / CONTACT & COLLABORATION</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink">
                Building Next-Generation Web & AI Systems.
              </h2>

              <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
                Specialized in MERN stack web development, custom RESTful APIs, and responsive frontends with integrated AI features. Open for full-stack opportunities, remote engagements, and client software builds.
              </p>
            </div>

            {/* Direct Email Link & Inquiry Form */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:mubashar11711@gmail.com"
                className="px-6 py-3 border border-hairline text-[11px] uppercase tracking-[0.14em] font-semibold text-ink hover:text-amber hover:border-amber transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber" />
                <span>Email Mubashar Directly</span>
              </a>

              {!dispatchSubmitted ? (
                <form onSubmit={handleDispatchSubmit} className="flex items-center">
                  <input
                    type="email"
                    value={dispatchEmail}
                    onChange={(e) => setDispatchEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="px-4 py-3 bg-ground-secondary border border-hairline text-ink text-[11px] uppercase tracking-wider font-mono placeholder:text-muted focus:outline-none focus:border-amber w-48 sm:w-60"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 border border-l-0 border-hairline text-[11px] uppercase tracking-[0.14em] font-semibold text-secondary hover:text-amber hover:border-amber transition-colors flex items-center gap-1.5 cursor-pointer bg-ground"
                  >
                    <span>Connect</span>
                    <span className="w-1 h-1 rounded-full bg-teal" />
                  </button>
                </form>
              ) : (
                <div className="px-5 py-3 border border-hairline font-mono text-[11px] uppercase tracking-wider text-teal flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal" />
                  <span>CHECK YOUR EMAIL APP TO SEND</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href="#releases"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-amber transition-colors"
              >
                <span>Review Active Project Cards</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Hairline Footer Strip */}
        <div className="border-t border-hairline pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          <div>
            <span>© 2026 {LABEL_DATA.name.toUpperCase()}</span>
            <span className="mx-2">•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <span>FULL STACK & AI INTEGRATION</span>
            <span className="hidden sm:inline text-secondary">LAHORE, PAKISTAN</span>
          </div>

          <div className="flex items-center gap-2 text-ink">
            <Terminal className="w-3.5 h-3.5 text-amber" />
            <span>REACT • NODE • TYPESCRIPT • AI</span>
          </div>
        </div>

      </div>

      {/* Wordmark full width, translated down slightly so the page edge crops it */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-4">
        <div 
          className="font-display font-extrabold text-[clamp(44px,13vw,210px)] leading-[0.74] tracking-[-0.035em] text-ink/[0.07] text-center translate-y-[28%] uppercase whitespace-nowrap"
          aria-hidden="true"
        >
          {LABEL_DATA.fullWordmark}
        </div>
      </div>

    </footer>
  );
}
