'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function PercentageCalculator() {
  const [mode, setMode] = useState('percent-of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const modes = [
    { value: 'percent-of', label: 'What is X% of Y?' },
    { value: 'what-percent', label: 'X is what % of Y?' },
    { value: 'percent-change', label: 'Percentage Change' },
  ];

  const calculate = () => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (mode === 'percent-of') {
      setResult({ value: ((x / 100) * y).toFixed(4), label: `${x}% of ${y}` });
    } else if (mode === 'what-percent') {
      setResult({ value: `${((x / y) * 100).toFixed(4)}%`, label: `${x} is ___% of ${y}` });
    } else {
      const change = ((y - x) / x) * 100;
      setResult({ value: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, label: `Change from ${x} to ${y}` });
    }
  };

  const labels = {
    'percent-of': ['Percentage (%)', 'Number'],
    'what-percent': ['Value (X)', 'Total (Y)'],
    'percent-change': ['Original Value', 'New Value'],
  };

  return (
    <CalculatorPage 
      title="Percentage Calculator" 
      emoji="📊" 
      description="Calculate percentages, find what percent of a number, or compute percentage change."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Select what you want to calculate: <strong>X% of Y</strong>, <strong>X is what % of Y</strong>, or <strong>% increase/decrease</strong>.</li>
          <li><strong>Step 2:</strong> Enter the relevant values into the fields below.</li>
          <li><strong>Step 3:</strong> Click <strong>Calculate Percentage</strong> to view the answer effortlessly.</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcSelect id="pct-mode" label="Calculation Mode" value={mode} onChange={e => { setMode(e.target.value); setResult(null); }} options={modes} />
        <CalcInput id="pct-a" label={labels[mode][0]} placeholder="Enter value" value={a} onChange={e => setA(e.target.value)}
          unit={mode === 'percent-of' ? '%' : ''} />
        <CalcInput id="pct-b" label={labels[mode][1]} placeholder="Enter value" value={b} onChange={e => setB(e.target.value)} />
        <CalcButton id="calc-pct" onClick={calculate}>Calculate</CalcButton>
        {result && <CalcResult label={result.label} value={result.value} />}
      </div>
    </CalculatorPage>
  );
}
