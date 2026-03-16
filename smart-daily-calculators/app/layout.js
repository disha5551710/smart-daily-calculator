import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'Smart Daily Calculators – All-in-One Calculator Tools',
  description: 'A collection of useful finance, health, math, and daily life calculators. Free, fast, and easy to use.',
  keywords: 'calculator, BMI, rent, tax, percentage, CGPA, discount, currency, savings, profit',
  openGraph: {
    title: 'Smart Daily Calculators',
    description: 'All-in-one smart calculator tools for everyday use.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
