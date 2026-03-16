'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const calcLinks = [
    { name: 'Rent Calculator', href: '/calculators/rent' },
    { name: 'BMI Calculator', href: '/calculators/bmi' },
    { name: 'Income Tax', href: '/calculators/income-tax' },
    { name: 'Discount', href: '/calculators/discount' },
    { name: 'Savings', href: '/calculators/savings' },
    { name: 'Profit', href: '/calculators/profit' },
  ];

  return (
    <footer style={{
      background: isDark
        ? 'linear-gradient(180deg, #0a0a0f 0%, #0d0b1e 100%)'
        : 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
      borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
      padding: '3rem 1.5rem 1.5rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden' }}>
                <Image src="/logo.png" alt="Logo" width={36} height={36} style={{ borderRadius: '50%' }} />
              </div>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Smart Daily Calculators</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: isDark ? '#64748b' : '#94a3b8', maxWidth: 260 }}>
              A collection of useful finance, health, math, and daily life calculators — fast, free, and beautifully designed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.9rem' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[['Home', '/'], ['All Calculators', '/calculators'], ['About', '/about']].map(([label, href]) => (
                <Link key={href} href={href} style={{
                  textDecoration: 'none', fontSize: '0.875rem',
                  color: isDark ? '#64748b' : '#94a3b8', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#6366f1'}
                  onMouseLeave={e => e.target.style.color = isDark ? '#64748b' : '#94a3b8'}
                >
                  → {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.9rem' }}>
              Popular Calculators
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {calcLinks.map(c => (
                <Link key={c.href} href={c.href} style={{
                  textDecoration: 'none', fontSize: '0.875rem',
                  color: isDark ? '#64748b' : '#94a3b8', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#6366f1'}
                  onMouseLeave={e => e.target.style.color = isDark ? '#64748b' : '#94a3b8'}
                >
                  → {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.9rem' }}>
              About
            </h4>
            <p style={{ fontSize: '0.875rem', color: isDark ? '#64748b' : '#94a3b8', lineHeight: 1.7 }}>
              Built with ❤️ using Next.js and Tailwind CSS. Designed to make everyday calculations simple and accessible.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              {['Finance', 'Health', 'Math', 'Daily Life'].map(tag => (
                <span key={tag} style={{
                  padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem',
                  background: 'rgba(99,102,241,0.15)', color: '#818cf8',
                  border: '1px solid rgba(99,102,241,0.25)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#475569' : '#94a3b8' }}>
            © {new Date().getFullYear()} Smart Daily Calculators. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#475569' : '#94a3b8' }}>
            Free • Fast • Accurate
          </p>
        </div>
      </div>
    </footer>
  );
}
