const steps = [
  {
    title: 'Share your business details',
    description: 'Tell me a little about your business, goals, and the marketing challenge you would like to discuss.',
  },
  {
    title: 'Discuss your goals and challenges',
    description: 'We will use the consultation to understand your situation and examine the choices in front of you.',
  },
  {
    title: 'Explore practical next steps',
    description: 'We will identify sensible areas to focus on, based on the conversation and your current resources.',
  },
];

export default function Process() {
  return (
    <section className="section-shell">
      <p className="eyebrow">A straightforward process</p>
      <h2 className="section-title mt-4">How It Works</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="glass flex min-h-64 flex-col rounded-[1.75rem] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-bold text-[var(--accent-ink)]">
              {index + 1}
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
