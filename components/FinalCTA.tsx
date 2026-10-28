import ConsultationCTA from './ConsultationCTA';

export default function FinalCTA() {
  return (
    <section className="section-shell pt-0">
      <div className="accent-panel rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="eyebrow text-[var(--accent-ink)] opacity-70">Ready to take the next step?</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] text-[var(--accent-ink)] sm:text-5xl">
          Let’s Talk About Your Marketing Goals
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--accent-ink)] opacity-80">
          Tell me what you&apos;re trying to achieve, and let&apos;s explore practical next steps for your business.
        </p>
        <ConsultationCTA />
      </div>
    </section>
  );
}
