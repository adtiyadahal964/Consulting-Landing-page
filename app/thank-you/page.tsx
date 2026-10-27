import Header from '../../components/Header';

const message = encodeURIComponent(
  "Hi, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.",
);

export default function ThankYouPage() {
  return (
    <main className="thank-you-page bg-glow min-h-screen overflow-hidden">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Request received</p>
          <div className="thank-you-check mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m5 12 4 4L19 6" />
          </svg>
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl text-[clamp(2.5rem,9vw,4.75rem)] font-semibold leading-[.98] tracking-[-.055em]">
            Thank you—your consultation request is in.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            I’ll review the details you shared and get back to you with the next steps for your free digital marketing consultation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_.65fr] lg:items-stretch">
          <div className="glass overflow-hidden rounded-[1.75rem] p-2 sm:p-3">
            <video
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-[1.25rem] bg-black object-contain"
              aria-label="Aaditya explains the next steps for the consultation"
            >
              <source src="/media/consultation-next-steps.mp4" type="video/mp4" />
              Your browser does not support the video player.
            </video>
          </div>

          <aside className="glass flex flex-col rounded-[1.75rem] p-7 text-left sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb)/.16)] text-[var(--accent)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-.035em]">What happens next?</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-[var(--muted)]">
              <li className="flex gap-3"><strong className="text-[var(--accent)]">01</strong><span>I’ll review your business details and consultation goals.</span></li>
              <li className="flex gap-3"><strong className="text-[var(--accent)]">02</strong><span>I’ll contact you to confirm a suitable time and the next step.</span></li>
            </ol>
            <div className="mt-auto pt-8">
              <p className="mb-4 text-sm leading-6 text-[var(--muted)]">Have a question in the meantime?</p>
              <a
                href={`https://wa.me/9779846701009?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-center font-bold focus-visible:outline-none"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2a9.75 9.75 0 0 0-8.3 14.86L2.3 22l5.28-1.38A9.75 9.75 0 1 0 12 2Zm0 17.72a7.92 7.92 0 0 1-4.04-1.1l-.29-.17-3.13.82.84-3.05-.19-.31A7.97 7.97 0 1 1 12 19.72Zm4.37-5.97c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                Message Me on WhatsApp
              </a>
            </div>
          </aside>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-[var(--muted)]">
          You can close this page safely. Your request has already been received.
        </p>
      </section>
    </main>
  );
}
