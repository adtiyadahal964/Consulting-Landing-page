const benefits = [
  {
    title: 'Understand your current challenges',
    description: 'Look at what you are doing now and clarify the questions, gaps, or obstacles that need attention.',
  },
  {
    title: 'Identify relevant priorities',
    description: 'Discuss which channels and opportunities make the most sense for your business, audience, and resources.',
  },
  {
    title: 'Explore practical next steps',
    description: 'Leave the conversation with clearer thinking about the actions you can investigate or take next.',
  },
];

export default function Benefits() {
  return (
    <section className="section-shell">
      <div className="max-w-2xl">
        <p className="eyebrow">A useful conversation</p>
        <h2 className="section-title mt-4">What we can work through together</h2>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          The consultation is designed to bring clarity to your situation—not to make guarantees or push a one-size-fits-all answer.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article key={benefit.title} className="glass flex min-h-64 flex-col rounded-[1.75rem] p-6 sm:p-7">
            <span className="text-sm font-bold tracking-widest text-[var(--accent)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="mt-auto pt-12">
              <h3 className="text-xl font-semibold leading-7">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
