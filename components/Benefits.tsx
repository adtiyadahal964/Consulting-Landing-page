const benefits = [
  {
    title: 'Understand Your Current Challenges',
    description: 'Discuss your existing marketing approach, goals, and the obstacles you want to address.',
  },
  {
    title: 'Identify Relevant Priorities',
    description: 'Explore which channels, activities, or improvements may deserve your attention.',
  },
  {
    title: 'Explore Practical Next Steps',
    description: 'Discuss realistic actions you can consider based on your business goals and current situation.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section-shell anchor-section" aria-labelledby="benefits-heading">
      <div className="max-w-2xl">
        <p className="eyebrow">A useful conversation</p>
        <h2 id="benefits-heading" className="section-title mt-4">What We Can Work Through Together</h2>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          The consultation is designed to help you review your current situation, understand your priorities, and explore practical next steps.
        </p>
      </div>
      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article key={benefit.title} className="glass interactive-card flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7">
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
