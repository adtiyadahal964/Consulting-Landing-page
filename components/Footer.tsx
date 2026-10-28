export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto grid w-full max-w-[76rem] gap-8 px-5 py-10 text-sm text-[var(--muted)] sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <a href="#top" className="logo-frame inline-flex items-center px-3 py-2" aria-label="Aaditya Creatives home">
            <img src="/brand/aaditya-creatives-logo.png" alt="Aaditya Creatives" width={327} height={120} className="h-auto w-[150px] object-contain" />
          </a>
          <p className="mt-4 max-w-md leading-6">AI-powered digital marketing support built around clear communication and practical next steps.</p>
        </div>
        <div className="md:text-right">
          <nav className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end" aria-label="Footer navigation">
            <a className="footer-link" href="#about">About Me</a>
            <a className="footer-link" href="#benefits">Services</a>
            <a className="footer-link" href="#consultation-form">Consultation</a>
            <a className="footer-link" href="mailto:adtiyadahal964@gmail.com">Contact</a>
          </nav>
          <p className="mt-5">© 2026 Aaditya Creatives. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
