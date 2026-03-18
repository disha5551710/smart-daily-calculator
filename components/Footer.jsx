'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
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
      background: 'var(--color-footer-bg)',
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
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#fff', padding: '2px' }}>
                <Image src="/logo.png" alt="Logo" width={32} height={32} style={{ borderRadius: '50%' }} />
              </div>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                color: 'var(--color-primary)',
              }}>Smart Daily Calculators</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-footer-text)', maxWidth: 260 }}>
              A collection of useful finance, health, math, and daily life calculators — fast, free, and beautifully designed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#fff', fontSize: '0.9rem' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[['Home', '/'], ['All Calculators', '/calculators'], ['About', '/about']].map(([label, href]) => (
                <Link key={href} href={href} style={{
                  textDecoration: 'none', fontSize: '0.875rem',
                  color: 'var(--color-footer-text)', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-footer-text)'}
                >
                  → {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#fff', fontSize: '0.9rem' }}>
              Popular Calculators
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {calcLinks.map(c => (
                <Link key={c.href} href={c.href} style={{
                  textDecoration: 'none', fontSize: '0.875rem',
                  color: 'var(--color-footer-text)', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-footer-text)'}
                >
                  → {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#fff', fontSize: '0.9rem' }}>
              About
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-footer-text)', lineHeight: 1.7 }}>
              Built with ❤️ using Next.js and Tailwind CSS. Designed to make everyday calculations simple and accessible.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              {['Finance', 'Health', 'Math', 'Daily Life'].map(tag => (
                <span key={tag} style={{
                  padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem',
                  background: 'rgba(255,255,255,0.05)', color: 'var(--color-footer-text)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-footer-text)' }}>
            © {new Date().getFullYear()} Smart Daily Calculators. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-footer-text)' }}>
            Free • Fast • Accurate
          </p>
        </div>
      </div>
    </footer>
  );
}
