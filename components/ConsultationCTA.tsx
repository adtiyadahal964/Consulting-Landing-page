'use client';

import type { MouseEvent } from 'react';

export default function ConsultationCTA({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  function scrollToForm(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const formSection = document.getElementById('consultation-form');
    if (!formSection) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    formSection.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', '#consultation-form');
    onNavigate?.();
  }

  return (
    <a
      href="#consultation-form"
      onClick={scrollToForm}
      className={`primary-button inline-flex items-center justify-center px-6 ${compact ? 'min-h-11 text-sm' : 'mt-9 min-h-14 w-full sm:w-auto sm:px-8'}`}
    >
      Book a Free Consultation
    </a>
  );
}
