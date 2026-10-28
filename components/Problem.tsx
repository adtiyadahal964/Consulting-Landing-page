const challenges = [
  {
    title: 'Too Many Channels',
    description: 'It can be difficult to know which platforms and activities deserve your attention and budget.',
  },
  {
    title: 'Unclear Performance',
    description: 'Content and campaigns may be active, but the reasons behind their results are not always easy to understand.',
  },
  {
    title: 'Attention Without Enquiries',
    description: 'Online visibility does not always translate into conversations with the right potential customers.',
  },
];

export default function Problem() {
  return (
    <section id="challenges" className="section-shell anchor-section" aria-labelledby="challenges-heading">
      <div className="max-w-3xl">
          <p className="eyebrow">The marketing challenge</p>
          <h2 id="challenges-heading" className="section-title mt-4">Marketing Feels Harder When Every Channel Looks Important</h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            You may be posting, running campaigns, or trying new ideas without a clear way to decide what deserves your time and budget.
          </p>
      </div>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <article key={challenge.title} className="glass interactive-card flex h-full flex-col rounded-[1.5rem] p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-auto pt-10">
                <h3 className="text-xl font-semibold">{challenge.title}</h3>
                <p className="mt-2 leading-7 text-[var(--muted)]">{challenge.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-[var(--accent)] pl-5 text-lg leading-8 text-[var(--muted)]">A clearer review of your situation can help identify where to focus next.</p>
    </section>
  );
}
