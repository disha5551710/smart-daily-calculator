'use client';

import Link from 'next/link';

export default function AboutClient() {
  return (
    <div style={{
      paddingTop: '90px', paddingBottom: '4rem',
      background: 'var(--color-bg-main)',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #06b6d4 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem',
          }}>
            About Smart Daily Calculators
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1rem', lineHeight: 1.7 }}>
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
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 16, padding: '1.75rem',
            marginBottom: '1.25rem',
            animation: `fadeInUp 0.5s ease ${i * 100}ms both`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{section.emoji}</span>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: '1.1rem', color: 'var(--color-text-heading)',
              }}>
                {section.title}
              </h2>
            </div>
            <p style={{ color: 'var(--color-text-body)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.8rem 2rem', borderRadius: 12,
            background: 'var(--color-primary)',
            color: '#fff', textDecoration: 'none', fontWeight: 700,
            fontSize: '0.9rem', boxShadow: '0 4px 14px 0 rgba(20, 184, 166, 0.39)',
            transition: 'all 0.2s',
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
            🧮 Explore Calculators →
          </Link>
        </div>
      </div>
    </div>
  );
}
