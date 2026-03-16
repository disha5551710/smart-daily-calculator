'use client';
import { useTheme } from './ThemeProvider';

export function CalcInput({ label, id, type = 'number', value, onChange, placeholder, unit, min, step }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label htmlFor={id} style={{
        fontSize: '0.8rem', fontWeight: 600,
        color: isDark ? '#94a3b8' : '#64748b', letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          step={step}
          style={{
            width: '100%', padding: unit ? '0.7rem 3rem 0.7rem 0.9rem' : '0.7rem 0.9rem',
            borderRadius: 10,
            border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'}`,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
            color: isDark ? '#e2e8f0' : '#1e293b',
            fontSize: '0.95rem', outline: 'none',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif',
          }}
          className="calc-input"
          onFocus={e => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.background = isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)';
          }}
          onBlur={e => {
            e.target.style.borderColor = isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)';
            e.target.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)';
          }}
        />
        {unit && (
          <span style={{
            position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
            fontSize: '0.8rem', color: isDark ? '#475569' : '#94a3b8', fontWeight: 500,
          }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function CalcSelect({ label, id, value, onChange, options }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label htmlFor={id} style={{
        fontSize: '0.8rem', fontWeight: 600,
        color: isDark ? '#94a3b8' : '#64748b', letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: '0.7rem 0.9rem',
          borderRadius: 10,
          border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'}`,
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
          color: isDark ? '#e2e8f0' : '#1e293b',
          fontSize: '0.95rem', outline: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ background: isDark ? '#1e1b4b' : '#fff' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CalcButton({ onClick, children, id }) {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        width: '100%', padding: '0.8rem 1.5rem',
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        color: '#fff', border: 'none', borderRadius: 12,
        fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
        transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
        fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 10px 25px rgba(99,102,241,0.5)';
      }}
      onMouseLeave={e => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 6px 20px rgba(99,102,241,0.35)';
      }}
    >
      {children}
    </button>
  );
}

export function CalcResult({ label, value, subtext, isDark }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{
      marginTop: '1.25rem',
      padding: '1.25rem 1.5rem',
      borderRadius: 14,
      background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.12))',
      border: '1px solid rgba(99,102,241,0.3)',
      animation: 'fadeInUp 0.4s ease',
    }}>
      <p style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1.2,
      }}>
        {value}
      </p>
      {subtext && (
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem' }}>{subtext}</p>
      )}
    </div>
  );
}
