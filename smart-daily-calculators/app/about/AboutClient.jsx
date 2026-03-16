'use client';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';

export default function AboutClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      paddingTop: '90px', paddingBottom: '4rem',
      background: isDark ? 'linear-gradient(135deg, #0a0a0f, #0d0b1e)' : '#f8fafc',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem',
          }}>
            About Smart Daily Calculators
          </h1>
          <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>
            A modern platform designed to make everyday calculations effortless.
          </p>
        </div>

        {[
          {
            emoji: '🎯', title: 'Our Mission',
            content: 'Smart Daily Calculators was built with one goal in mind: make complex calculations simple and accessible for everyone. Whether you\'re splitting rent, calculating your BMI, or converting currencies — we\'ve got you covered.',
          },
          {
            emoji: '🛠️', title: 'Technology',
            content: 'Built with Next.js and Tailwind CSS, the platform offers lightning-fast page loads, responsive design, and a modern aesthetic. The App Router architecture ensures each calculator is clean and focused.',
          },
          {
            emoji: '🔒', title: 'Privacy First',
            content: 'All calculations happen locally in your browser. We don\'t collect any personal data, don\'t require signups, and don\'t store your calculation history. 100% private and free.',
          },
          {
            emoji: '🚀', title: 'Future Plans',
            content: 'We\'re constantly adding new calculators. Upcoming features include real-time currency APIs, calculation history, user accounts, and even more specialized calculators.',
          },
        ].map((section, i) => (
          <div key={section.title} style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
            borderRadius: 16, padding: '1.75rem',
            marginBottom: '1.25rem',
            animation: `fadeInUp 0.5s ease ${i * 100}ms both`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{section.emoji}</span>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: '1.1rem', color: isDark ? '#e2e8f0' : '#1e293b',
              }}>
                {section.title}
              </h2>
            </div>
            <p style={{ color: isDark ? '#64748b' : '#64748b', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.8rem 2rem', borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff', textDecoration: 'none', fontWeight: 700,
            fontSize: '0.9rem', boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
            transition: 'all 0.2s',
          }}>
            🧮 Explore Calculators →
          </Link>
        </div>
      </div>
    </div>
  );
}
