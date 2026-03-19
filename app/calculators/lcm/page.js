'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function LCMCalculator() {
  const [numsInput, setNumsInput] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const calculate = () => {
    const nums = numsInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 2) return;
    const result = nums.reduce(lcm);
    setResult({ lcm: result, numbers: nums, gcdVal: nums.reduce(gcd) });
  };

  return (
    <CalculatorPage 
      title="LCM Calculator" 
      emoji="🔢" 
      description="Find the Least Common Multiple of two or more numbers."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Read the input field requirement, and enter 2 or more numbers separated by commas (e.g., 2, 4, 6).</li>
          <li><strong>Step 2:</strong> Click <strong>Calculate LCM</strong>.</li>
          <li><strong>Step 3:</strong> The calculator instantly computes and displays the Least Common Multiple for the numbers provided perfectly!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="lcm-nums" label="Numbers (comma separated)" type="text"
          placeholder="e.g. 12, 18, 24" value={numsInput}
          onChange={e => setNumsInput(e.target.value)} />
        <CalcButton id="calc-lcm" onClick={calculate}>Find LCM</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label={`LCM of [${result.numbers.join(', ')}]`} value={result.lcm.toLocaleString()}
              subtext={`GCD = ${result.gcdVal}`} />
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', textAlign: 'center' }}>
                💡 LCM(a,b) = (a × b) / GCD(a,b)
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
