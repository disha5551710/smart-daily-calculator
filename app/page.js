'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import CalculatorCard from '@/components/CalculatorCard';

const calculators = [
  { name: 'Rent Calculator', description: 'Split rent fairly among roommates or calculate per-person cost.', emoji: '🏠', href: '/calculators/rent', category: 'daily' },
  { name: 'Income Tax Calculator', description: 'Estimate your annual income tax based on your salary and slab.', emoji: '💰', href: '/calculators/income-tax', category: 'finance' },
  { name: 'Percentage Calculator', description: 'Find percentage, increase/decrease, and what percent of a number.', emoji: '📊', href: '/calculators/percentage', category: 'math' },
  { name: 'CGPA / Grade Calculator', description: 'Convert CGPA to percentage and calculate your grade point average.', emoji: '🎓', href: '/calculators/cgpa', category: 'daily' },
  { name: 'BMI Calculator', description: 'Calculate your Body Mass Index and check your weight category.', emoji: '⚖️', href: '/calculators/bmi', category: 'health' },
  { name: 'Discount Calculator', description: 'Calculate final price after discounts, cashback, or coupon codes.', emoji: '🏷️', href: '/calculators/discount', category: 'finance' },
  { name: 'Currency Converter', description: 'Convert amounts between popular world currencies instantly.', emoji: '💱', href: '/calculators/currency', category: 'finance' },
  { name: 'Binary to Decimal', description: 'Convert binary numbers to decimal and vice versa, with steps.', emoji: '💻', href: '/calculators/binary-decimal', category: 'tech' },
  { name: 'GST Calculator', description: 'Calculate GST-inclusive or exclusive price for any tax slab.', emoji: '🧾', href: '/calculators/gst', category: 'finance' },
  { name: 'Age Difference Calculator', description: 'Find the exact age difference between two people or dates.', emoji: '🎂', href: '/calculators/age-difference', category: 'daily' },
  { name: 'LCM Calculator', description: 'Find the Least Common Multiple of two or more numbers.', emoji: '🔢', href: '/calculators/lcm', category: 'math' },
  { name: 'Distance Calculator', description: 'Calculate distance using speed and time with unit conversion.', emoji: '📍', href: '/calculators/distance', category: 'daily' },
  { name: 'Ingredient Ratio Calculator', description: 'Scale recipe ingredients by adjusting servings or ratios.', emoji: '🍳', href: '/calculators/ingredient-ratio', category: 'daily' },
  { name: 'Profit Calculator', description: 'Calculate profit, loss, and profit percentage for business.', emoji: '📈', href: '/calculators/profit', category: 'finance' },
  { name: 'Savings Calculator', description: 'Project your total savings over time based on monthly deposits.', emoji: '🐷', href: '/calculators/savings', category: 'finance' },
  { name: 'Work Hours Calculator', description: 'Track total work hours for the day, week, or any time period.', emoji: '⏰', href: '/calculators/work-hours', category: 'daily' },
];

const stats = [
  { value: '16+', label: 'Calculators' },
  { value: '100%', label: 'Free' },
  { value: 'Fast', label: 'No Signup' },
  { value: '∞', label: 'Calculations' },
];

const categories = ['All', 'Finance', 'Health', 'Math', 'Daily Life', 'Tech'];
const catMap = { 'All': null, 'Finance': 'finance', 'Health': 'health', 'Math': 'math', 'Daily Life': 'daily', 'Tech': 'tech' };

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = calculators.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = catMap[activeCategory] === null || c.category === catMap[activeCategory];
    return matchSearch && matchCat;
  });

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* Hero Section */}
      <section style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0f 0%, #0d0b1e 40%, #1a1040 70%, #0a0a0f 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #f0f9ff 50%, #fef3c7 100%)',
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Background orbs */}
        {isDark && (
          <>
            <div style={{
              position: 'absolute', top: '20%', left: '10%',
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: '10%', right: '15%',
              width: 250, height: 250, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />
          </>
        )}

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: 20,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: '#818cf8', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1.5rem', letterSpacing: '0.05em',
          }}>
            🧮 16+ Smart Calculator Tools
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            lineHeight: 1.1, marginBottom: '1.25rem',
            color: isDark ? '#f1f5f9' : '#0f172a',
          }}>
            All-in-One{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #f59e0b 100%)',
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
            color: isDark ? '#64748b' : '#475569',
            lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem',
          }}>
            A collection of useful finance, health, math, and daily life calculators — designed for speed and simplicity.
          </p>

          {/* Hero Search */}
          <div style={{ position: 'relative', maxWidth: '460px', margin: '0 auto 2.5rem' }}>
            <span style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              fontSize: '1.1rem',
            }}>🔍</span>
            <input
              id="hero-search"
              type="text"
              placeholder="Search any calculator..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.9rem 1rem 0.9rem 2.75rem',
                borderRadius: 14,
                border: `2px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)'}`,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.9)',
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontSize: '1rem', outline: 'none',
                boxShadow: isDark ? '0 0 0 0 transparent' : '0 4px 20px rgba(99,102,241,0.1)',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#6366f1';
                e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.15)';
              }}
              onBlur={e => {
                e.target.style.borderColor = isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)';
                e.target.style.boxShadow = isDark ? 'none' : '0 4px 20px rgba(99,102,241,0.1)';
              }}
            />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 3rem)', flexWrap: 'wrap' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: isDark ? '#475569' : '#94a3b8', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Grid Section */}
      <section id="calculators" style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '3rem 1.5rem',
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: isDark ? '#e2e8f0' : '#1e293b', marginBottom: '0.5rem',
          }}>
            All Calculators
          </h2>
          <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.9rem' }}>
            {filtered.length} calculator{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 1rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                  : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: activeCategory === cat ? '#fff' : isDark ? '#94a3b8' : '#64748b',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map((calc, i) => (
              <CalculatorCard
                key={calc.href}
                {...calc}
                delay={i * 50}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '1.1rem', fontWeight: 500 }}>
              No calculators found for "{search}"
            </p>
            <p style={{ color: isDark ? '#475569' : '#b0c0d0', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Try a different search term
            </p>
          </div>
        )}
      </section>

      {/* Features Banner */}
      <section style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))'
          : 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(6,182,212,0.04))',
        borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
        borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
        padding: '3rem 1.5rem',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { emoji: '⚡', title: 'Instant Results', desc: 'Calculations happen in real-time, no waiting required.' },
            { emoji: '📱', title: 'Mobile Friendly', desc: 'Perfectly responsive on phones, tablets, and desktops.' },
            { emoji: '🌙', title: 'Dark Mode', desc: 'Easy on your eyes with beautiful light and dark themes.' },
            { emoji: '🔒', title: '100% Private', desc: 'No data stored, no signup needed. Completely free.' },
          ].map(f => (
            <div key={f.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.emoji}</div>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '1rem', marginBottom: '0.4rem',
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: isDark ? '#64748b' : '#94a3b8', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
