import ConsultationCTA from './ConsultationCTA';

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-20 pt-12 text-center sm:px-8 sm:pb-28 sm:pt-20">
      <p className="eyebrow">Free one-to-one consultation</p>
      <h1 className="mx-auto mt-5 max-w-5xl break-words text-[clamp(2.25rem,11.5vw,2.55rem)] font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl lg:text-7xl">
        Get a Customized AI-Powered Marketing Plan to Generate{' '}
        <span className="text-[var(--accent)]">More Qualified Leads</span>
      </h1>
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
        Find out why your current marketing is not bringing enough customers—and what to do next.
      </p>
      <div className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
        <p>
          This free one-to-one consultation is for small and medium business owners struggling to
          sell their products or services.
        </p>
        <p className="mt-4">
          During the free 1-hour AI-powered marketing consultation, you will receive a customized
          digital marketing plan in PDF format that you can immediately implement.
        </p>
      </div>
      <ConsultationCTA />
    </section>
  );
}
