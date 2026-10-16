'use client';

import type { MouseEvent } from 'react';

export default function ConsultationCTA() {
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
  }

  return (
    <a
      href="#consultation-form"
      onClick={scrollToForm}
      className="primary-button mt-9 inline-flex min-h-14 w-full items-center justify-center px-6 sm:w-auto sm:px-8"
    >
      Book a Free Consultation
    </a>
  );
}
