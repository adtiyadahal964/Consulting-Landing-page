export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-6 px-5 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <a href="#top" className="logo-frame inline-flex items-center px-3 py-2" aria-label="Aaditya Creatives">
            <img src="/brand/aaditya-creatives-logo.png" alt="Aaditya Creatives" width={327} height={120} className="h-auto w-[150px] object-contain" />
          </a>
          <p className="mt-4 max-w-md leading-6">AI-powered digital marketing support built around clear communication and practical next steps.</p>
        </div>
        <p className="sm:text-right">© 2026 Aaditya Creatives. All rights reserved.</p>
      </div>
    </footer>
  );
}
