'use client';

export function CalcInput({ label, id, type = 'number', value, onChange, placeholder, unit, min, step }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontSize: '0.85rem', fontWeight: 600,
        color: 'var(--color-text-heading)',
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
            width: '100%', padding: unit ? '0.75rem 3.5rem 0.75rem 1rem' : '0.75rem 1rem',
            borderRadius: 10,
            border: '1.5px solid var(--color-border)',
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-heading)',
            fontSize: '1rem', outline: 'none',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif',
          }}
          className="calc-input"
          onFocus={e => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.15)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--color-border)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {unit && (
          <span style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
            fontSize: '0.9rem', color: 'var(--color-text-body)', fontWeight: 500,
            background: 'var(--color-bg-main)', padding: '0.2rem 0.5rem', borderRadius: 6,
          }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function CalcSelect({ label, id, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontSize: '0.85rem', fontWeight: 600,
        color: 'var(--color-text-heading)',
      }}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: '0.75rem 1rem',
          borderRadius: 10,
          border: '1.5px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
          color: 'var(--color-text-heading)',
          fontSize: '1rem', outline: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--color-primary)';
          e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--color-border)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ background: 'var(--color-bg-secondary)' }}>
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
        width: '100%', padding: '0.9rem 1.5rem',
        background: 'var(--color-primary)',
        color: '#ffffff', border: 'none', borderRadius: 10,
        fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => {
        e.target.style.background = 'var(--color-primary-hover)';
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.2)';
      }}
      onMouseLeave={e => {
        e.target.style.background = 'var(--color-primary)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
}

export function CalcResult({ label, value, subtext }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{
      marginTop: '1.5rem',
      padding: '1.5rem',
      borderRadius: 14,
      background: 'var(--color-accent-light)',
      border: '1px solid rgba(20, 184, 166, 0.3)',
      animation: 'fadeInUp 0.4s ease',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-primary-hover)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', fontWeight: 800,
        color: 'var(--color-text-heading)',
        lineHeight: 1.1,
      }}>
        {value}
      </p>
      {subtext && (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', marginTop: '0.5rem', fontWeight: 500 }}>{subtext}</p>
      )}
    </div>
  );
}
