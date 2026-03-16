'use client';
import { useTheme } from './ThemeProvider';

export default function CalculatorPage({ title, emoji, description, children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '90px',
      paddingBottom: '2rem',
      background: isDark
        ? 'linear-gradient(135deg, #0a0a0f 0%, #0d0b1e 50%, #0a0a0f 100%)'
        : '#f8fafc',
    }}>
      {/* Ad Banner Top */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 1.5rem',
        padding: '0 1.5rem',
      }}>
        <div style={{
          height: 60, borderRadius: 10,
          background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
          border: `1px dashed ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', color: isDark ? '#334155' : '#94a3b8',
        }}>
          Advertisement
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
            border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', margin: '0 auto 1rem',
          }}>
            {emoji}
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}>
            {title}
          </h1>
          <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.9rem' }}>
            {description}
          </p>
        </div>

        {/* Calculator Card */}
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(99,102,241,0.06))'
            : 'white',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'}`,
          borderRadius: 20,
          padding: '2rem',
          boxShadow: isDark
            ? '0 25px 50px rgba(0,0,0,0.4)'
            : '0 10px 30px rgba(99,102,241,0.08)',
        }}>
          {children}
        </div>

        {/* Ad Banner Bottom */}
        <div style={{
          marginTop: '2rem', height: 60, borderRadius: 10,
          background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
          border: `1px dashed ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', color: isDark ? '#334155' : '#94a3b8',
        }}>
          Advertisement
        </div>
      </div>
    </div>
  );
}
