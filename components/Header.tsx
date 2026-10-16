import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="mx-auto grid w-full max-w-6xl grid-cols-[44px_1fr_44px] items-center px-5 py-5 sm:px-8 sm:py-7">
      <div aria-hidden="true" />
      <div className="flex min-h-9 items-center justify-center">
        {/* FUTURE LOGO: Add the supplied logo file here. The centered layout can remain unchanged. */}
      </div>
      <ThemeToggle />
    </header>
  );
}
