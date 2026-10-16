import Header from '../../components/Header';

const message = encodeURIComponent(
  "Hi, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.",
);

export default function ThankYouPage() {
  return (
    <main className="bg-glow min-h-screen overflow-hidden">
      <Header />
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-14 text-center sm:px-8 sm:pt-20">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>
        <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.05] tracking-[-.045em] sm:text-6xl">
          Congratulations! Your Consultation Request Is Submitted.
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
          Thank you for booking your Free Digital Marketing Consultation.
          <br />
          <br />
          We will review your details and guide you on the next steps.
        </p>

        <div className="glass mt-12 overflow-hidden rounded-[1.75rem]">
          <video
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black object-contain"
            aria-label="Consultation next steps video"
          >
            <source src="/media/consultation-next-steps.mp4" type="video/mp4" />
            Your browser does not support the video player.
          </video>
        </div>

        <a
          href={`https://wa.me/9779846701009?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#25D366] px-8 font-bold text-[#062b13] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
        >
          Message Us on WhatsApp
        </a>
      </section>
    </main>
  );
}
