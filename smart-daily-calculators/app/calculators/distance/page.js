'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function DistanceCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
    <CalculatorPage title="Distance Calculator" emoji="📍" description="Calculate distance traveled using speed and time with unit conversion.">
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
              subtext={`${result.miles} miles • ${parseInt(result.meters).toLocaleString()} meters`} isDark={isDark} />
            <div style={{ padding: '0.6rem 1rem', borderRadius: 10,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}` }}>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8', textAlign: 'center' }}>
                💡 Distance = Speed × Time
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
