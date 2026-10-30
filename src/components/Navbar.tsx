import React, { useState, useEffect } from 'react';
import { LABEL_DATA } from '../data';
import { ArrowUpRight, Menu, X, Play } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  code: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Profile', href: '#intro', code: '00' },
  { name: 'Portal', href: '#portal', code: '01' },
  { name: 'Statement', href: '#statement', code: '02' },
  { name: 'Contact', href: '#close', code: '03' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler with offset for 58px navbar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navOffset = 58;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash smoothly
      window.history.pushState(null, '', href);
    }
  };

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const id = NAV_ITEMS[i].href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[58px] bg-[#383636]/90 backdrop-blur-[14px] border-b border-hairline flex items-center transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Wordmark at 15px with trailing period in amber */}
        <a 
          href="#intro" 
          onClick={(e) => handleNavClick(e, '#intro')}
          className="font-display font-bold text-[15px] tracking-[-0.02em] text-ink flex items-center gap-0.5 hover:text-amber transition-colors group"
        >
          <span>{LABEL_DATA.name}</span>
          <span className="text-amber group-hover:scale-125 transition-transform">.</span>
        </a>

        {/* Uppercase links at 10.5px, turning amber on hover */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-7" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[10.5px] uppercase tracking-[0.14em] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive ? 'text-amber' : 'text-secondary hover:text-amber'
                }`}
              >
                <span className="text-[9px] text-muted tracking-tight font-mono">{item.code}</span>
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* One pill button (border hairline, amber accent dot, no filled area) */}
          <a
            href="#close"
            onClick={(e) => handleNavClick(e, '#close')}
            className="px-4 py-1.5 rounded-full border border-hairline text-[10.5px] uppercase tracking-[0.12em] font-medium text-ink hover:text-amber hover:border-amber transition-all flex items-center gap-1.5"
          >
            <span>Contact</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-ink p-1 rounded border border-hairline hover:text-amber transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[58px] left-0 right-0 bg-[#383636]/95 backdrop-blur-[16px] border-b border-hairline p-6 flex flex-col space-y-4 shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs uppercase tracking-[0.15em] font-medium text-ink hover:text-amber transition-colors flex items-center justify-between py-2 border-b border-hairline"
            >
              <span className="text-secondary font-mono">{item.code}</span>
              <span>{item.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
