import React from 'react';
import { Navbar } from './components/Navbar';
import { IntroShowcase } from './components/IntroShowcase';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { ReleasesSection } from './components/ReleasesSection';
import { RosterSection } from './components/RosterSection';
import { DatesTableSection } from './components/DatesTableSection';
import { CloseSection } from './components/CloseSection';

export default function App() {
  const scrollToPortal = () => {
    const portalElement = document.getElementById('portal');
    if (portalElement) {
      const navOffset = 58;
      const elementPosition = portalElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#383636] text-ink selection:bg-amber selection:text-[#383636] font-sans">
      {/* Fixed 58px Bar with 14px blur and smooth scroll navigation */}
      <Navbar />

      <main>
        {/* Intro Page: 3D Neon Tubes Cursor Background, Reel Video, and 3 Fixed-Aspect Images */}
        <IntroShowcase onEnterPortal={scrollToPortal} />

        {/* Record Label Front Landing Page */}
        {/* Section 01: Tall Portal Hero */}
        <PortalHero />

        {/* Section 02: Statement Fold */}
        <StatementFold />

        {/* Section 03: Releases & Physical Throwable Deck */}
        <ReleasesSection />

        {/* Section 04: Archival Roster */}
        <RosterSection />

        {/* Section 05: Performance Dates Table */}
        <DatesTableSection />

        {/* Section 06: Close & Edge-Cropped Wordmark */}
        <CloseSection />
      </main>
    </div>
  );
}
