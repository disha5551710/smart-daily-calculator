'use client';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';

const featuredCalculators = [
  { name: 'Income Tax', description: 'Estimate your annual income tax based on slab.', emoji: '💰', href: '/calculators/income-tax', category: 'finance' },
  { name: 'BMI Calculator', description: 'Calculate Body Mass Index and check weight category.', emoji: '⚖️', href: '/calculators/bmi', category: 'health' },
  { name: 'Percentage', description: 'Find percentage, increase/decrease, etc.', emoji: '📊', href: '/calculators/percentage', category: 'math' },
  { name: 'Discount', description: 'Calculate final price after discounts or cashback.', emoji: '🏷️', href: '/calculators/discount', category: 'finance' },
  { name: 'Rent Calculator', description: 'Split rent fairly or calculate per-person cost.', emoji: '🏠', href: '/calculators/rent', category: 'finance' },
  { name: 'Age Difference', description: 'Find the exact age difference between two people.', emoji: '🎂', href: '/calculators/age-difference', category: 'daily' },
];

const stats = [
  { value: '16+', label: 'Calculators' },
  { value: '100%', label: 'Free' },
  { value: 'Fast', label: 'No Signup' },
  { value: '∞', label: 'Calculations' },
];

export default function HomePage() {
  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-bg-main)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'var(--color-hero-bg)',
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center', borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: 20,
            background: 'rgba(20,184,166,0.15)',
            border: '1px solid rgba(20,184,166,0.2)',
            color: 'var(--color-primary-hover)', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1.5rem', letterSpacing: '0.05em',
          }}>
            🧮 16+ Smart Calculator Tools
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            lineHeight: 1.1, marginBottom: '1.25rem',
            color: 'var(--color-text-heading)',
          }}>
            All-in-One{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, #06b6d4 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 4s ease infinite',
            }}>
              Smart Calculator
            </span>
            {' '}Tools
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--color-text-body)',
            lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem',
          }}>
            A clean, modern, and professional collection of finance, health, math, and daily life calculators — designed for speed and simplicity.
          </p>

          <Link href="/calculators" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            boxShadow: '0 4px 14px 0 rgba(20, 184, 166, 0.39)',
            transition: 'all 0.2s',
            marginBottom: '3rem'
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--color-primary-hover)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.4)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--color-primary)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 14px 0 rgba(20, 184, 166, 0.39)';
          }}>
            Browse All Calculators →
          </Link>

          {/* Stats */}
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  color: 'var(--color-text-heading)'
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Calculators Grid Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--color-text-heading)', marginBottom: '0.5rem',
          }}>
            Featured Calculators
          </h2>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1rem' }}>
            Quickly access our most popular tools
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          {featuredCalculators.map((calc, i) => (
            <CalculatorCard key={calc.href} {...calc} delay={i * 50} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/calculators" style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-heading)',
            border: '1.5px solid var(--color-border)',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--color-accent-light)';
            e.target.style.borderColor = 'var(--color-primary-hover)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--color-bg-secondary)';
            e.target.style.borderColor = 'var(--color-border)';
          }}>
            View All 16+ Calculators
          </Link>
        </div>
      </section>

      {/* Features Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '3rem 1.5rem',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { emoji: '⚡', title: 'Instant Results', desc: 'Calculations happen in real-time, no waiting required.' },
            { emoji: '📱', title: 'Mobile Friendly', desc: 'Perfectly responsive on phones, tablets, and desktops.' },
            { emoji: '✨', title: 'Clean Design', desc: 'Beautiful, modern, distraction-free calculation experience.' },
            { emoji: '🔒', title: '100% Private', desc: 'No data stored, no signup needed. Completely free.' },
          ].map(f => (
            <div key={f.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.emoji}</div>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                color: 'var(--color-text-heading)', fontSize: '1.1rem', marginBottom: '0.4rem',
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
