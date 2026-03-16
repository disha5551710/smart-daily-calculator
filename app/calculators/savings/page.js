'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function SavingsCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [monthly, setMonthly] = useState('');
  const [months, setMonths] = useState('');
  const [rate, setRate] = useState('0');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const m = parseFloat(monthly);
    const n = parseInt(months);
    const r = parseFloat(rate) / 100 / 12;
    if (!m || !n) return;
    let total;
    if (r === 0) {
      total = m * n;
    } else {
      total = m * ((Math.pow(1 + r, n) - 1) / r);
    }
    const principal = m * n;
    const interest = total - principal;
    setResult({ total: total.toFixed(2), principal: principal.toFixed(2), interest: interest.toFixed(2) });
  };

  return (
    <CalculatorPage title="Savings Calculator" emoji="🐷" description="Project your total savings over time with optional compound interest.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="monthly-saving" label="Monthly Saving Amount" placeholder="e.g. 5000" value={monthly}
          onChange={e => setMonthly(e.target.value)} unit="₹" />
        <CalcInput id="duration-months" label="Duration (months)" placeholder="e.g. 24" value={months}
          onChange={e => setMonths(e.target.value)} unit="mo" />
        <CalcInput id="annual-rate" label="Annual Interest Rate (optional)" placeholder="e.g. 7" value={rate}
          onChange={e => setRate(e.target.value)} unit="%" />
        <CalcButton id="calc-savings" onClick={calculate}>Calculate Total Savings</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label="Total Savings" value={`₹${parseFloat(result.total).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
              subtext={`Over ${months} months`} isDark={isDark} />
            <div style={{ padding: '1rem', borderRadius: 12,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}` }}>
              {[
                ['Principal (Deposits)', `₹${parseFloat(result.principal).toLocaleString('en-IN')}`],
                ['Interest Earned', `₹${parseFloat(result.interest).toLocaleString('en-IN')}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0',
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                  <span style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>{k}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#e2e8f0' : '#1e293b' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
