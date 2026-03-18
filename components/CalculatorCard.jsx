'use client';
import Link from 'next/link';

export default function CalculatorCard({ name, description, emoji, href, category, delay = 0 }) {
  const categoryColors = {
    finance: { bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.3)', text: 'var(--color-primary)', label: 'Finance' },
    health: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444', label: 'Health' },
    math: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)', text: '#a855f7', label: 'Math' },
    daily: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b', label: 'Daily Life' },
    tech: { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#06b6d4', label: 'Tech' },
  };

  const cat = categoryColors[category] || categoryColors.daily;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        animation: `fadeInUp 0.4s ease ${delay}ms both`,
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(20, 184, 166, 0.2)';
        e.currentTarget.style.borderColor = 'var(--color-primary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Emoji Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'var(--color-accent-light)',
          border: '1px solid rgba(20, 184, 166, 0.2)',
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
          fontSize: '1.05rem', color: 'var(--color-text-heading)',
          marginBottom: '0.3rem',
        }}>
          {name}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      <Link href={href}
        id={`open-${href.replace('/calculators/', '').replace('/', '-')}`}
        style={{
          marginTop: 'auto',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.4rem', padding: '0.6rem 1rem',
          background: 'var(--color-bg-main)',
          color: 'var(--color-primary-hover)', textDecoration: 'none',
          borderRadius: 10, fontSize: '0.85rem', fontWeight: 600,
          border: '1px solid var(--color-border)',
          transition: 'all 0.2s', width: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--color-accent-light)';
          e.currentTarget.style.borderColor = 'var(--color-primary-hover)';
          e.currentTarget.style.color = 'var(--color-primary-hover)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--color-bg-main)';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        Open Calculator →
      </Link>
    </div>
  );
}
