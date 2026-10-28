export default function About() {
  return (
    <section id="about" className="section-shell anchor-section" aria-labelledby="about-heading">
      <div className="glass overflow-hidden rounded-[2rem]">
        <div className="about-image-panel aspect-[16/9] w-full overflow-hidden sm:aspect-[16/7]">
          <img
            src="/images/hero-aaditya.webp"
            alt="Aaditya Dahal seated at his desk"
            width={1541}
            height={1021}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="p-7 sm:p-10 lg:p-14">
          <p className="eyebrow">About me</p>
          <h2 id="about-heading" className="section-title mt-4">Hi, I’m Aaditya Dahal.</h2>
          <div className="mt-8 grid gap-7 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
            <div>
              <p className="text-lg leading-8 text-[var(--muted)]">
                I&apos;m building my work at the intersection of AI and digital marketing, with a focus on helping small and growing businesses approach their marketing more strategically.
              </p>
              <p className="mt-5 leading-7 text-[var(--muted)]">
                I believe effective marketing starts with understanding the business, its audience, and its goals before deciding which tactics to use.
              </p>
            </div>
            <div>
              <p className="leading-7 text-[var(--muted)]">
                My approach combines research, practical learning, and AI-assisted workflows to explore ways to make marketing more focused and efficient.
              </p>
              <p className="mt-5 leading-7 text-[var(--muted)]">
                My goal is to understand each business&apos;s needs, communicate clearly, and recommend realistic next steps rather than make promises that marketing cannot guarantee.
              </p>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
              <h3 className="text-lg font-semibold">What You Can Expect From Me</h3>
              <ul className="mt-4 grid gap-3" aria-label="What you can expect from me">
                {[
                  'Practical, business-focused recommendations.',
                  'Clear and transparent communication.',
                  'An honest discussion of opportunities and limitations.',
                ].map((item) => (
                  <li key={item} className="trust-item">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 10 3 3 7-7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
