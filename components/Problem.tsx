const challenges = [
  {
    title: 'Too many channels',
    description: 'It can be difficult to know which platforms and activities deserve your limited time and budget.',
  },
  {
    title: 'Unclear performance',
    description: 'Content and campaigns may be active, while the reasons behind their results remain hard to understand.',
  },
  {
    title: 'Attention without inquiries',
    description: 'Online visibility does not always translate into conversations with the right potential customers.',
  },
];

export default function Problem() {
  return (
    <section className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">The marketing challenge</p>
          <h2 className="section-title mt-4">Marketing feels harder when every channel looks important.</h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            You may be posting, running campaigns, or trying new ideas without a clear way to decide what should come next.
          </p>
        </div>
        <div className="grid gap-4">
          {challenges.map((challenge, index) => (
            <article key={challenge.title} className="glass grid gap-4 rounded-[1.5rem] p-6 sm:grid-cols-[3rem_1fr] sm:items-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-ink)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                <p className="mt-2 leading-7 text-[var(--muted)]">{challenge.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
