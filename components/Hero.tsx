import ConsultationCTA from './ConsultationCTA';

export default function Hero() {
  return (
    <section className="section-shell pt-10 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow">Free one-to-one consultation</p>
          <h1 className="mt-5 break-words text-[clamp(2.55rem,11vw,4.75rem)] font-semibold leading-[.98] tracking-[-.055em]">
            Find a clearer path through your{' '}
            <span className="text-[var(--accent)]">digital marketing.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            A focused conversation to help you understand what feels unclear, where opportunities
            may exist, and which marketing priorities deserve your attention.
          </p>
          <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">
            For small and medium business owners who want practical guidance without inflated promises.
          </p>
          <ConsultationCTA />
          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
            One-to-one conversation · No obligation
          </p>
        </div>
        <div className="hero-visual glass overflow-hidden rounded-[2rem]">
          <img
            src="/images/hero-aaditya.webp"
            alt="Aaditya Dahal seated at his desk, ready to discuss digital marketing"
            width={1541}
            height={1021}
            fetchPriority="high"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
