'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const calculatorLinks = [
  { name: 'Rent Calculator', href: '/calculators/rent' },
  { name: 'Income Tax', href: '/calculators/income-tax' },
  { name: 'Discount', href: '/calculators/discount' },
  { name: 'GST Calculator', href: '/calculators/gst' },
  { name: 'Profit Calculator', href: '/calculators/profit' },
  { name: 'Savings Calculator', href: '/calculators/savings' },
  { name: 'Percentage', href: '/calculators/percentage' },
  { name: 'CGPA / Grade', href: '/calculators/cgpa' },
  { name: 'BMI Calculator', href: '/calculators/bmi' },
  { name: 'Currency Converter', href: '/calculators/currency' },
  { name: 'Binary to Decimal', href: '/calculators/binary-decimal' },
  { name: 'Age Difference', href: '/calculators/age-difference' },
  { name: 'LCM Calculator', href: '/calculators/lcm' },
  { name: 'Distance', href: '/calculators/distance' },
  { name: 'Ingredient Ratio', href: '/calculators/ingredient-ratio' },
  { name: 'Work Hours', href: '/calculators/work-hours' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent';
  const navBorder = scrolled ? '1px solid var(--color-border)' : 'none';

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: scrolled ? 'var(--color-nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: navBorder,
        transition: 'all 0.3s ease',
        padding: '0 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px', gap: '1rem' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flex: '0 0 auto' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Smart Daily Calculators Logo" width={40} height={40} style={{ borderRadius: '50%' }} />
          </div>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700, fontSize: '1.05rem',
            color: 'var(--color-primary)',
            lineHeight: 1.2, display: 'block'
          }}>
            Smart Daily<br />
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-heading)' }}>Calculators</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="hidden-mobile">
          <Link href="/" style={{
            textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.9rem',
            fontWeight: 600, color: 'var(--color-text-body)', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-primary-hover)'; e.target.style.background = 'var(--color-accent-light)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--color-text-body)'; e.target.style.background = 'transparent'; }}
          >
            Home
          </Link>

          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link href="/calculators" style={{
              textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.9rem', display: 'inline-block',
              fontWeight: 600, color: 'var(--color-text-body)', transition: 'all 0.2s', background: dropdownOpen ? 'var(--color-accent-light)' : 'transparent',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--color-primary-hover)'; e.target.style.background = 'var(--color-accent-light)'; }}
              onMouseLeave={e => { if(!dropdownOpen) { e.target.style.color = 'var(--color-text-body)'; e.target.style.background = 'transparent'; } }}
            >
              Calculators ▾
            </Link>

            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                borderRadius: 12, padding: '0.75rem', minWidth: '240px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                display: 'grid', gridTemplateColumns: '1fr', gap: '0.2rem',
                maxHeight: '60vh', overflowY: 'auto',
                marginTop: '0.5rem'
              }}>
                {calculatorLinks.map(calc => (
                  <Link key={calc.href} href={calc.href} onClick={() => setDropdownOpen(false)} style={{
                    display: 'block', padding: '0.6rem 1rem',
                    color: 'var(--color-text-body)', textDecoration: 'none',
                    fontSize: '0.85rem', borderRadius: 8, transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                  onMouseEnter={e => { e.target.style.color = 'var(--color-primary-hover)'; e.target.style.background = 'var(--color-accent-light)'; }}
                  onMouseLeave={e => { e.target.style.color = 'var(--color-text-body)'; e.target.style.background = 'transparent'; }}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" style={{
            textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.9rem',
            fontWeight: 600, color: 'var(--color-text-body)', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-primary-hover)'; e.target.style.background = 'var(--color-accent-light)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--color-text-body)'; e.target.style.background = 'transparent'; }}
          >
            About
          </Link>
          
        </div>

        {/* Right controls: Theme + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '1.2rem', padding: '0.5rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-body)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            aria-label="Toggle Dark Mode"
          >
            {mounted && theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              display: 'none', background: 'transparent', border: 'none',
              cursor: 'pointer', fontSize: '1.5rem',
              color: 'var(--color-text-body)',
            }}
            className="show-mobile"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxHeight: '80vh', overflowY: 'auto'
        }}>
          {['/', '/calculators', '/about'].map((href, i) => {
            const labels = ['🏠 Home', '🧮 All Calculators', 'ℹ️ About'];
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                textDecoration: 'none', padding: '0.6rem 0.75rem',
                borderRadius: 8, fontWeight: 600, fontSize: '0.9rem',
                color: 'var(--color-text-heading)',
                background: 'var(--color-bg-main)', border: '1px solid var(--color-border)',
                marginBottom: href === '/calculators' ? '0.5rem' : '0'
              }}>
                {labels[i]}
              </Link>
            );
          })}
          
          {/* Mobile Calculator Links List (nested) */}
          <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
            {calculatorLinks.map(calc => (
              <Link key={calc.href} href={calc.href} onClick={() => setMenuOpen(false)} style={{
                textDecoration: 'none', padding: '0.5rem 0.75rem',
                borderRadius: 8, fontWeight: 500, fontSize: '0.85rem',
                color: 'var(--color-text-body)',
              }}>
                • {calc.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

