'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function RentCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [totalRent, setTotalRent] = useState('');
  const [people, setPeople] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const rent = parseFloat(totalRent);
    const n = parseInt(people);
    if (!rent || !n || n <= 0) return;
    setResult({ perPerson: (rent / n).toFixed(2), total: rent, people: n });
  };

  return (
    <CalculatorPage title="Rent Calculator" emoji="🏠" description="Split rent fairly between roommates or calculate per-person cost.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="total-rent" label="Total Monthly Rent" placeholder="e.g. 25000" value={totalRent}
          onChange={e => setTotalRent(e.target.value)} unit="₹" />
        <CalcInput id="num-people" label="Number of People" placeholder="e.g. 3" value={people}
          onChange={e => setPeople(e.target.value)} min="1" />
        <CalcButton id="calc-rent" onClick={calculate}>Calculate Rent per Person</CalcButton>
        {result && (
          <div>
            <CalcResult label="Rent Per Person" value={`₹${result.perPerson}`}
              subtext={`₹${result.total} ÷ ${result.people} people`} isDark={isDark} />
            <div style={{ marginTop: '0.75rem', padding: '1rem', borderRadius: 12,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.1)'}`,
            }}>
              <p style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8', textAlign: 'center' }}>
                💡 Formula: Rent Per Person = Total Rent ÷ Number of People
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
