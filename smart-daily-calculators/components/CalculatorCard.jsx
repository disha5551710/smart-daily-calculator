'use client';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function CalculatorCard({ name, description, emoji, href, category, delay = 0 }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const categoryColors = {
    finance: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', text: '#22c55e', label: 'Finance' },
    health: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444', label: 'Health' },
    math: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)', text: '#a855f7', label: 'Math' },
    daily: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b', label: 'Daily Life' },
    tech: { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#06b6d4', label: 'Tech' },
  };

  const cat = categoryColors[category] || categoryColors.daily;

  return (
    <div
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(99,102,241,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
        border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)'}`,
        borderRadius: 16,
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        animation: `fadeInUp 0.5s ease ${delay}ms both`,
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 20px 40px rgba(99,102,241,0.2), 0 0 0 1px rgba(99,102,241,0.3)'
          : '0 20px 40px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.2)';
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)';
      }}
    >
      {/* Subtle bg glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(99,102,241,0.06)', filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Emoji Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', flexShrink: 0,
        }}>
          {emoji}
        </div>

        {/* Category badge */}
        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600,
          background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text,
          letterSpacing: '0.03em',
        }}>
          {cat.label}
        </span>
      </div>

      <div>
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: '1rem', color: isDark ? '#e2e8f0' : '#1e293b',
          marginBottom: '0.3rem',
        }}>
          {name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      <Link href={href}
        id={`open-${href.replace('/calculators/', '').replace('/', '-')}`}
        style={{
          marginTop: 'auto',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.4rem', padding: '0.55rem 1rem',
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          color: '#fff', textDecoration: 'none',
          borderRadius: 10, fontSize: '0.8rem', fontWeight: 600,
          transition: 'all 0.2s', width: '100%',
          boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5, #4338ca)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.3)';
        }}
      >
        Open Calculator →
      </Link>
    </div>
  );
}
