'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function LCMCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
    <CalculatorPage title="LCM Calculator" emoji="🔢" description="Find the Least Common Multiple of two or more numbers.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="lcm-nums" label="Numbers (comma separated)" type="text"
          placeholder="e.g. 12, 18, 24" value={numsInput}
          onChange={e => setNumsInput(e.target.value)} />
        <CalcButton id="calc-lcm" onClick={calculate}>Find LCM</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label={`LCM of [${result.numbers.join(', ')}]`} value={result.lcm.toLocaleString()}
              subtext={`GCD = ${result.gcdVal}`} isDark={isDark} />
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}` }}>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8', textAlign: 'center' }}>
                💡 LCM(a,b) = (a × b) / GCD(a,b)
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
