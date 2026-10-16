export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 Aaditya Creatives. Clear guidance, honest conversation.</p>
        <a
          className="font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
          href="mailto:adtiyadahal964@gmail.com"
        >
          adtiyadahal964@gmail.com
        </a>
      </div>
    </footer>
  );
}
