'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';

const calculatorLinks = [
  { name: 'Rent Calculator', href: '/calculators/rent', emoji: '🏠' },
  { name: 'Income Tax', href: '/calculators/income-tax', emoji: '💰' },
  { name: 'Percentage', href: '/calculators/percentage', emoji: '📊' },
  { name: 'CGPA / Grade', href: '/calculators/cgpa', emoji: '🎓' },
  { name: 'BMI', href: '/calculators/bmi', emoji: '⚖️' },
  { name: 'Discount', href: '/calculators/discount', emoji: '🏷️' },
  { name: 'Currency Converter', href: '/calculators/currency', emoji: '💱' },
  { name: 'Binary to Decimal', href: '/calculators/binary-decimal', emoji: '💻' },
  { name: 'GST Calculator', href: '/calculators/gst', emoji: '🧾' },
  { name: 'Age Difference', href: '/calculators/age-difference', emoji: '🎂' },
  { name: 'LCM Calculator', href: '/calculators/lcm', emoji: '🔢' },
  { name: 'Distance', href: '/calculators/distance', emoji: '📍' },
  { name: 'Ingredient Ratio', href: '/calculators/ingredient-ratio', emoji: '🍳' },
  { name: 'Profit Calculator', href: '/calculators/profit', emoji: '📈' },
  { name: 'Savings Calculator', href: '/calculators/savings', emoji: '🐷' },
  { name: 'Work Hours', href: '/calculators/work-hours', emoji: '⏰' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = calculatorLinks.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navBg = scrolled
    ? isDark
      ? 'rgba(10,10,15,0.95)'
      : 'rgba(248,250,252,0.95)'
    : 'transparent';

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: navBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}` : 'none',
        transition: 'all 0.3s ease',
        padding: '0 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', height: '70px', gap: '1rem' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flex: '0 0 auto' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Smart Daily Calculators Logo" width={40} height={40} style={{ borderRadius: '50%' }} />
          </div>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700, fontSize: '1.05rem',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.2, display: 'block'
          }}>
            Smart Daily<br />
            <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Calculators</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', marginLeft: '1rem', flexShrink: 0 }}
          className="hidden-mobile">
          {['/', '/calculators', '/about'].map((href, i) => {
            const labels = ['Home', 'Calculators', 'About'];
            return (
              <Link key={href} href={href} style={{
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: 8,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isDark ? '#94a3b8' : '#64748b',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.color = '#6366f1'; e.target.style.background = isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)'; }}
                onMouseLeave={e => { e.target.style.color = isDark ? '#94a3b8' : '#64748b'; e.target.style.background = 'transparent'; }}
              >
                {labels[i]}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <div ref={searchRef} style={{ flex: 1, position: 'relative', maxWidth: '360px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', opacity: 0.5 }}>🔍</span>
            <input
              id="navbar-search"
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                borderRadius: 10,
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.2s',
              }}
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
              background: isDark ? '#1e1b4b' : '#fff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#e2e8f0'}`,
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              zIndex: 2000,
            }}>
              {searchResults.map(r => (
                <Link key={r.href} href={r.href}
                  onClick={() => { setShowResults(false); setSearchQuery(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.6rem 1rem', textDecoration: 'none',
                    color: isDark ? '#e2e8f0' : '#1e293b',
                    fontSize: '0.875rem', transition: 'background 0.15s',
                    borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f1f5f9',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(99,102,241,0.15)' : '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{r.emoji}</span> {r.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
            borderRadius: 10, padding: '0.45rem 0.7rem',
            cursor: 'pointer', fontSize: '1rem',
            transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          style={{
            display: 'none', background: 'transparent', border: 'none',
            cursor: 'pointer', fontSize: '1.5rem',
            color: isDark ? '#94a3b8' : '#64748b',
          }}
          className="show-mobile"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: isDark ? '#0f0e1a' : '#fff',
          borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#e2e8f0'}`,
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {['/', '/calculators', '/about'].map((href, i) => {
            const labels = ['🏠 Home', '🧮 Calculators', 'ℹ️ About'];
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                textDecoration: 'none', padding: '0.6rem 0.75rem',
                borderRadius: 8, fontWeight: 500, fontSize: '0.9rem',
                color: isDark ? '#e2e8f0' : '#1e293b',
                background: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
              }}>
                {labels[i]}
              </Link>
            );
          })}
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
