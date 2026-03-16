'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcButton, CalcResult } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function AgeDifferenceCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1), d2 = new Date(date2);
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    setResult({ years, months, days, totalDays, totalWeeks });
  };

  const inputStyle = (isDark) => ({
    width: '100%', padding: '0.7rem 0.9rem', borderRadius: 10,
    border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
    color: isDark ? '#e2e8f0' : '#1e293b',
    fontSize: '0.95rem', outline: 'none', fontFamily: 'Inter, sans-serif',
  });

  return (
    <CalculatorPage title="Age Difference Calculator" emoji="🎂" description="Find the exact age difference between two dates or birthdays.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {[['date1', 'Date / Birthday 1', date1, setDate1], ['date2', 'Date / Birthday 2', date2, setDate2]].map(([id, label, val, setter]) => (
          <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor={id} style={{ fontSize: '0.8rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {label}
            </label>
            <input id={id} type="date" value={val} onChange={e => setter(e.target.value)} style={inputStyle(isDark)} />
          </div>
        ))}
        <CalcButton id="calc-age-diff" onClick={calculate}>Calculate Difference</CalcButton>
        {result && (
          <div>
            <CalcResult label="Age Difference"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              subtext={`${result.totalDays.toLocaleString()} days • ${result.totalWeeks.toLocaleString()} weeks`}
              isDark={isDark} />
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
