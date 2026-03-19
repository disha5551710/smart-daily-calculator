'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function DistanceCalculator() {
  const [speed, setSpeed] = useState('');
  const [time, setTime] = useState('');
  const [speedUnit, setSpeedUnit] = useState('kmh');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const s = parseFloat(speed);
    const t = parseFloat(time);
    if (!s || !t) return;
    const distKm = speedUnit === 'kmh' ? s * t : s * t * 1.60934;
    const distMi = distKm / 1.60934;
    const distM = distKm * 1000;
    setResult({ km: distKm.toFixed(2), miles: distMi.toFixed(2), meters: distM.toFixed(0) });
  };

  return (
    <CalculatorPage 
      title="Distance Calculator" 
      emoji="📍" 
      description="Calculate distance traveled using speed and time with unit conversion."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter your <strong>Speed</strong> and select the unit (km/h or mph).</li>
          <li><strong>Step 2:</strong> Enter the <strong>Time</strong> and select its unit (hours, minutes, seconds).</li>
          <li><strong>Step 3:</strong> Select your preferred <strong>Distance Unit</strong> (km, miles, meters, etc.).</li>
          <li><strong>Step 4:</strong> Click <strong>Calculate Distance</strong> to get the result!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', alignItems: 'end' }}>
          <CalcInput id="speed-input" label="Speed" placeholder="e.g. 60" value={speed}
            onChange={e => setSpeed(e.target.value)} unit={speedUnit === 'kmh' ? 'km/h' : 'mph'} />
          <CalcSelect id="speed-unit" label="Unit" value={speedUnit}
            onChange={e => { setSpeedUnit(e.target.value); setResult(null); }}
            options={[{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }]} />
        </div>
        <CalcInput id="time-input" label="Time (hours)" placeholder="e.g. 2.5" value={time}
          onChange={e => setTime(e.target.value)} unit="hrs" />
        <CalcButton id="calc-distance" onClick={calculate}>Calculate Distance</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <CalcResult label="Distance Traveled" value={`${result.km} km`}
              subtext={`${result.miles} miles • ${parseInt(result.meters).toLocaleString()} meters`} />
            <div style={{ padding: '0.6rem 1rem', borderRadius: 10,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', textAlign: 'center' }}>
                💡 Distance = Speed × Time
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
