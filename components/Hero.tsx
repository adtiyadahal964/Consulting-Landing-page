import ConsultationCTA from './ConsultationCTA';

export default function Hero() {
  return (
    <section className="section-shell hero-section pt-12 sm:pt-16" aria-labelledby="hero-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow">Free one-to-one consultation</p>
          <h1 id="hero-heading" className="mt-5 break-words text-[clamp(2.5rem,10vw,4.6rem)] font-semibold leading-[1.01] tracking-[-.055em]">
            Find a Clearer Path Through Your{' '}
            <span className="text-[var(--accent)]">Digital Marketing</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            Bring your business goals and marketing challenges to a practical conversation about what to improve, where to focus, and what to do next.
          </p>
          <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">
            Receive clear, practical next steps based on your business situation.
          </p>
          <ConsultationCTA />
          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
            Practical conversation. No pressure.
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
