const steps = [
  'Fill out the form with your business details.',
  'Book your free one-to-one consultation call.',
  'Receive your customized AI-powered digital marketing plan in PDF format.',
];

export default function Process() {
  return (
    <section className="section-shell">
      <p className="eyebrow">A simple three-step process</p>
      <h2 className="section-title mt-4">How It Works</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step} className="glass rounded-[1.75rem] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-bold text-[var(--accent-ink)]">
              {index + 1}
            </div>
            <p className="mt-12 text-lg leading-7">{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
