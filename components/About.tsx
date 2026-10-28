export default function About() {
  return (
    <section id="about" className="section-shell anchor-section" aria-labelledby="about-heading">
      <div className="glass overflow-hidden rounded-[2rem]">
        <div className="grid items-end lg:grid-cols-[.88fr_1.12fr]">
          <div className="portrait-panel flex min-h-[22rem] items-end justify-center px-6 pt-8 sm:min-h-[30rem] sm:px-10 lg:min-h-[34rem]">
            <img
              src="/images/aaditya-portrait.webp"
              alt="Portrait of Aaditya Dahal"
              width={1024}
              height={1536}
              loading="lazy"
              className="max-h-[34rem] w-auto max-w-full object-contain object-bottom"
            />
          </div>
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">About me</p>
            <h2 id="about-heading" className="section-title mt-4">Hi, I’m Aaditya Dahal.</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              I’m developing my professional practice in AI-powered digital marketing, with a focus on helping businesses understand their options and make more practical marketing decisions.
            </p>
            <p className="mt-5 leading-7 text-[var(--muted)]">
              My approach begins with understanding the business, its audience, current marketing, and the challenges affecting its growth. From there, I focus on clear communication, useful research, and practical next steps.
            </p>
            <p className="mt-5 leading-7 text-[var(--muted)]">
              You can expect clear expectations, honest communication, business-focused thinking, and a transparent consultation process.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" aria-label="My approach">
              {['Clear expectations', 'Practical thinking', 'Honest communication'].map((item) => (
                <span key={item} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
