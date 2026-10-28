import ConsultationCTA from './ConsultationCTA';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--line)]">
      <div className="relative mx-auto flex min-h-[4.75rem] w-full max-w-[76rem] items-center justify-center px-5 sm:px-8">
        <a href="#top" className="logo-frame flex shrink-0 items-center justify-center px-3 py-2" aria-label="Aaditya Creatives">
          <img
            src="/brand/aaditya-creatives-logo.png"
            alt="Aaditya Creatives"
            width={327}
            height={120}
            className="h-auto w-full max-w-[142px] object-contain xl:max-w-[168px]"
          />
        </a>

        <div className="absolute right-5 flex items-center gap-2 sm:right-8">
          <ThemeToggle />
          <div className="hidden lg:block"><ConsultationCTA compact /></div>
        </div>
      </div>
    </header>
  );
}
