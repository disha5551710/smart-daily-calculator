'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function BMICalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#06b6d4' };
    if (bmi < 25) return { label: 'Normal weight ✅', color: '#22c55e' };
    if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' };
    return { label: 'Obese', color: '#ef4444' };
  };

  const calculate = () => {
    let bmi;
    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      if (!w || !h) return;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weight);
      const h = parseFloat(height);
      if (!w || !h) return;
      bmi = (703 * w) / (h * h);
    }
    const cat = getCategory(bmi);
    setResult({ bmi: bmi.toFixed(1), category: cat.label, color: cat.color });
  };

  return (
    <CalculatorPage title="BMI Calculator" emoji="⚖️" description="Calculate your Body Mass Index and check your weight health category.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcSelect id="bmi-unit" label="Unit System" value={unit} onChange={e => { setUnit(e.target.value); setResult(null); }}
          options={[{ value: 'metric', label: 'Metric (kg, cm)' }, { value: 'imperial', label: 'Imperial (lbs, inches)' }]} />
        <CalcInput id="bmi-weight" label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'} value={weight}
          onChange={e => setWeight(e.target.value)} unit={unit === 'metric' ? 'kg' : 'lbs'} />
        <CalcInput id="bmi-height" label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
          placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 69'} value={height}
          onChange={e => setHeight(e.target.value)} unit={unit === 'metric' ? 'cm' : 'in'} />
        <CalcButton id="calc-bmi" onClick={calculate}>Calculate BMI</CalcButton>
        {result && (
          <div>
            <CalcResult label="Your BMI" value={result.bmi} isDark={isDark} />
            <div style={{ marginTop: '0.75rem', padding: '0.9rem 1.25rem', borderRadius: 12,
              background: `${result.color}15`, border: `1px solid ${result.color}40`,
              display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: result.color, flexShrink: 0 }} />
              <span style={{ color: result.color, fontWeight: 700, fontSize: '0.9rem' }}>{result.category}</span>
            </div>
            <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: 10,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.08)'}` }}>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8', textAlign: 'center' }}>
                💡 BMI = Weight (kg) ÷ Height² (m) | Healthy range: 18.5 – 24.9
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
