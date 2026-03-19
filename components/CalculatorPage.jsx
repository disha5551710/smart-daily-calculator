'use client';

export default function CalculatorPage({ title, emoji, description, instructions, children }) {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '90px',
      paddingBottom: '4rem',
      backgroundColor: 'var(--color-bg-main)',
    }}>
      {/* Ad Banner Top */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 2rem',
        padding: '0 1.5rem',
      }}>
        <div style={{
          height: 60, borderRadius: 10,
          background: 'rgba(20, 184, 166, 0.05)',
          border: '1px dashed rgba(20, 184, 166, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', color: 'var(--color-text-body)',
        }}>
          Advertisement
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'var(--color-accent-light)',
            border: '1px solid rgba(20, 184, 166, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', margin: '0 auto 1.25rem',
          }}>
            {emoji}
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-text-heading)',
            marginBottom: '0.5rem',
          }}>
            {title}
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1rem' }}>
            {description}
          </p>
        </div>

        {/* Calculator Card */}
        <div style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 20,
          padding: '2rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        }}>
          {children}
        </div>

        {/* How to use */}
        {instructions && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 16,
          }}>
            <h3 style={{
              marginTop: 0,
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              color: 'var(--color-text-heading)',
              fontSize: '1.25rem',
              marginBottom: '1rem'
            }}>
              How it works
            </h3>
            <div style={{
              color: 'var(--color-text-body)',
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}>
              {instructions}
            </div>
          </div>
        )}

        {/* Ad Banner Bottom */}
        <div style={{
          marginTop: '2rem', height: 60, borderRadius: 10,
          background: 'rgba(20, 184, 166, 0.05)',
          border: '1px dashed rgba(20, 184, 166, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', color: 'var(--color-text-body)',
        }}>
          Advertisement
        </div>
      </div>
    </div>
  );
}
