'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'var(--color-primary)' };
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
    <CalculatorPage 
      title="BMI Calculator" 
      emoji="⚖️" 
      description="Calculate Body Mass Index (BMI) and determine weight category."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter your <strong>Weight</strong> in kilograms (kg).</li>
          <li><strong>Step 2:</strong> Enter your <strong>Height</strong> in centimeters (cm).</li>
          <li><strong>Step 3:</strong> Click <strong>Calculate BMI</strong> to get your result.</li>
          <li><strong>Step 4:</strong> The calculator will show your BMI value and indicate your weight category (Underweight, Normal, Overweight, or Obese).</li>
        </ul>
      )}
    >
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
            <CalcResult label="Your BMI" value={result.bmi} />
            <div style={{ marginTop: '0.75rem', padding: '0.9rem 1.25rem', borderRadius: 12,
              background: `${result.color}15`, border: `1px solid ${result.color}40`,
              display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: result.color, flexShrink: 0 }} />
              <span style={{ color: result.color, fontWeight: 700, fontSize: '0.9rem' }}>{result.category}</span>
            </div>
            <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: 10,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', textAlign: 'center' }}>
                💡 BMI = Weight (kg) ÷ Height² (m) | Healthy range: 18.5 – 24.9
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
