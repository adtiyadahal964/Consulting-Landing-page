'use client';

import { useState } from 'react';
import ConsultationCTA from './ConsultationCTA';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--line)]">
      <div className="mx-auto flex min-h-[4.75rem] w-full max-w-[76rem] items-center gap-3 px-5 sm:px-8">
        <a href="#top" onClick={closeMenu} className="logo-frame flex shrink-0 items-center justify-center px-3 py-2" aria-label="Aaditya Creatives home">
          <img
            src="/brand/aaditya-creatives-logo.png"
            alt="Aaditya Creatives"
            width={327}
            height={120}
            className="h-auto w-full max-w-[142px] object-contain xl:max-w-[168px]"
          />
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          <a className="nav-link active" href="#top" aria-current="page">Home</a>
          <a className="nav-link" href="#about">About Me</a>
          <div className="relative flex items-center">
            <a className="nav-link pr-2" href="#benefits">Services</a>
            <button
              type="button"
              className="nav-dropdown-button"
              aria-label="Show service sections"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((current) => !current)}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 7.5 5 5 5-5" /></svg>
            </button>
            {servicesOpen && (
              <div className="nav-dropdown glass" role="menu">
                <a href="#challenges" role="menuitem" onClick={() => setServicesOpen(false)}>Marketing challenges</a>
                <a href="#benefits" role="menuitem" onClick={() => setServicesOpen(false)}>Consultation benefits</a>
                <a href="#process" role="menuitem" onClick={() => setServicesOpen(false)}>How it works</a>
              </div>
            )}
          </div>
          <a className="nav-link" href="mailto:adtiyadahal964@gmail.com">Contact</a>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <ThemeToggle />
          <div className="hidden xl:block"><ConsultationCTA compact /></div>
          <button
            type="button"
            className="menu-button lg:hidden"
            aria-label={`${menuOpen ? 'Close' : 'Open'} navigation menu`}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav border-t border-[var(--line)] px-5 pb-5 pt-3 lg:hidden" aria-label="Mobile navigation">
          <a href="#top" onClick={closeMenu} aria-current="page">Home</a>
          <a href="#about" onClick={closeMenu}>About Me</a>
          <a href="#benefits" onClick={closeMenu}>Services</a>
          <a href="#process" onClick={closeMenu}>How It Works</a>
          <a href="mailto:adtiyadahal964@gmail.com" onClick={closeMenu}>Contact</a>
          <ConsultationCTA compact onNavigate={closeMenu} />
        </nav>
      )}
    </header>
  );
}
