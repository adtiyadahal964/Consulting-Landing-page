const steps = [
  {
    title: 'Share Your Business Details',
    description: 'Tell me about your business, your main challenge, and what you want to achieve.',
  },
  {
    title: 'Discuss Your Goals and Challenges',
    description: 'We’ll talk through your current marketing approach and identify areas worth exploring.',
  },
  {
    title: 'Explore Practical Next Steps',
    description: 'We’ll discuss realistic actions that may help you move toward your marketing goals.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section-shell anchor-section" aria-labelledby="process-heading">
      <p className="eyebrow">How it works</p>
      <h2 id="process-heading" className="section-title mt-4">A Simple Process to Get Started</h2>
      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="glass interactive-card flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-bold text-[var(--accent-ink)]">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="mt-auto pt-10">
              <h3 className="text-xl font-semibold leading-7">{step.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
