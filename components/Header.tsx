import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="mx-auto grid w-full max-w-6xl grid-cols-[44px_1fr_44px] items-center px-5 py-5 sm:px-8 sm:py-7">
      <div aria-hidden="true" />
      <div className="flex min-h-10 items-center justify-center px-2">
        <img
          src="/brand/aaditya-creatives-logo.png"
          alt="Aaditya Creatives"
          width={327}
          height={120}
          className="h-auto w-full max-w-[150px] object-contain sm:max-w-[205px]"
        />
      </div>
      <ThemeToggle />
    </header>
  );
}
