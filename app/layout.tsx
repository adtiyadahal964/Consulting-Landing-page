import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = { title: 'Free AI-Powered Marketing Consultation', description: 'Get a customized AI-powered marketing plan to generate more qualified leads.', openGraph: { title: 'Free AI-Powered Marketing Consultation', description: 'Get a customized marketing plan for your business.', type: 'website' } };

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
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
