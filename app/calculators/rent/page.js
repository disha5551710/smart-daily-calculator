'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function RentCalculator() {
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
    <CalculatorPage 
      title="Rent Calculator" 
      emoji="🏠" 
      description="Split rent fairly between roommates or calculate per-person cost."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter the <strong>Total Rent Amount</strong> (e.g. 15000).</li>
          <li><strong>Step 2:</strong> Specify the <strong>Number of People</strong>/roommates sharing the rent.</li>
          <li><strong>Step 3:</strong> Optional: You can list their names to see individualized portions.</li>
          <li><strong>Step 4:</strong> Click <strong>Calculate Shares</strong> to easily split the cost equally!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="total-rent" label="Total Monthly Rent" placeholder="e.g. 25000" value={totalRent}
          onChange={e => setTotalRent(e.target.value)} unit="₹" />
        <CalcInput id="num-people" label="Number of People" placeholder="e.g. 3" value={people}
          onChange={e => setPeople(e.target.value)} min="1" />
        <CalcButton id="calc-rent" onClick={calculate}>Calculate Rent per Person</CalcButton>
        {result && (
          <div>
            <CalcResult label="Rent Per Person" value={`₹${result.perPerson}`}
              subtext={`₹${result.total} ÷ ${result.people} people`} />
            <div style={{ marginTop: '0.75rem', padding: '1rem', borderRadius: 12,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'rgba(99,102,241,0.1)'}`,
            }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-body)', textAlign: 'center' }}>
                💡 Formula: Rent Per Person = Total Rent ÷ Number of People
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
