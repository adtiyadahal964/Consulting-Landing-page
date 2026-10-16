const benefits = [
  'Identify why your current marketing is not generating enough sales',
  'Know which channels should be your priority',
  'Get practical actions to improve leads and inquiries',
  'Learn how to attract more qualified customers',
  'Receive a clear 30-day marketing direction for your business',
  'Receive a customized digital marketing plan in PDF format',
];

export default function Benefits() {
  return (
    <section className="section-shell">
      <p className="eyebrow">Clear, practical outcomes</p>
      <h2 className="section-title mt-4">What You Will Get From This Consultation</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article key={benefit} className="glass flex min-h-48 flex-col rounded-[1.75rem] p-6 sm:p-7">
            <span className="text-sm font-bold tracking-widest text-[var(--accent)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-auto pt-10 text-lg font-medium leading-7">{benefit}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
