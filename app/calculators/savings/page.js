'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function SavingsCalculator() {
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
              subtext={`Over ${months} months`} />
            <div style={{ padding: '1rem', borderRadius: 12,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              {[
                ['Principal (Deposits)', `₹${parseFloat(result.principal).toLocaleString('en-IN')}`],
                ['Interest Earned', `₹${parseFloat(result.interest).toLocaleString('en-IN')}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0',
                  borderBottom: `1px solid ${'var(--color-border)'}` }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-body)' }}>{k}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
