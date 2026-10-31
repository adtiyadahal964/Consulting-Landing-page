import ConsultationCTA from './ConsultationCTA';

export default function Hero() {
  return (
    <section className="section-shell hero-section pt-12 sm:pt-16" aria-labelledby="hero-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow">Free one-to-one consultation</p>
          <h1 id="hero-heading" className="mt-5 break-words text-[clamp(2.5rem,10vw,4.5rem)] font-semibold leading-[1.01] tracking-[-.055em]">
            Get a Clearer{' '}
            <span className="editorial-highlight">Digital Marketing Plan</span>{' '}
            for Your Business
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            Understand what&apos;s holding your marketing back, identify your priorities, and explore practical next steps for attracting the right customers.
          </p>
          <ConsultationCTA />
          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
            One-to-one conversation · No obligation
          </p>
        </div>
        <div className="hero-visual glass overflow-hidden rounded-[2rem]">
          <img
            src="/images/hero-aaditya.webp"
            alt="Aaditya Dahal seated at his desk"
            width={1541}
            height={1021}
            fetchPriority="high"
            className="aspect-[4/3] h-auto w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
