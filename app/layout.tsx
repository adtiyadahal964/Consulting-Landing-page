import type { Metadata } from 'next';
import { Inter, Manrope, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-ui', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-editorial', style: ['italic'], display: 'swap' });

export const metadata: Metadata = { title: 'Free Digital Marketing Consultation | Aaditya Creatives', description: 'Discuss your marketing challenges, priorities, and practical next steps with Aaditya Dahal.', openGraph: { title: 'Free Digital Marketing Consultation | Aaditya Creatives', description: 'A focused one-to-one conversation about your business and digital marketing priorities.', type: 'website' } };

const themeInitializationScript = `
  (() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const theme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (_) {
      document.documentElement.classList.toggle(
        'dark',
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
    }
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
