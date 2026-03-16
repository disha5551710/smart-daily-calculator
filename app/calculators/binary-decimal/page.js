'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function BinaryDecimalConverter() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mode, setMode] = useState('bin2dec');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setResult(null);
    if (mode === 'bin2dec') {
      if (!/^[01]+$/.test(input)) { setError('Please enter a valid binary number (0s and 1s only).'); return; }
      const dec = parseInt(input, 2);
      setResult({ main: dec.toString(), hex: dec.toString(16).toUpperCase(), octal: dec.toString(8) });
    } else {
      const dec = parseInt(input, 10);
      if (isNaN(dec) || dec < 0) { setError('Please enter a valid positive decimal number.'); return; }
      setResult({ main: dec.toString(2), hex: dec.toString(16).toUpperCase(), octal: dec.toString(8) });
    }
  };

  return (
    <CalculatorPage title="Binary ↔ Decimal Converter" emoji="💻" description="Convert between binary, decimal, hexadecimal, and octal number systems.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcSelect id="conv-mode" label="Conversion Mode" value={mode}
          onChange={e => { setMode(e.target.value); setResult(null); setError(''); }}
          options={[{ value: 'bin2dec', label: 'Binary → Decimal' }, { value: 'dec2bin', label: 'Decimal → Binary' }]} />
        <CalcInput id="bin-dec-input" label={mode === 'bin2dec' ? 'Binary Number' : 'Decimal Number'}
          type="text" placeholder={mode === 'bin2dec' ? 'e.g. 1010' : 'e.g. 42'}
          value={input} onChange={e => setInput(e.target.value)} />
        {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', padding: '0.6rem 0.9rem', borderRadius: 8 }}>{error}</p>}
        <CalcButton id="convert-binary" onClick={convert}>Convert</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <CalcResult label={mode === 'bin2dec' ? 'Decimal Value' : 'Binary Value'} value={result.main} isDark={isDark} />
            {[
              { label: 'Hexadecimal', val: '0x' + result.hex },
              { label: 'Octal', val: '0o' + result.octal },
            ].map(row => (
              <div key={row.label} style={{ padding: '0.75rem 1rem', borderRadius: 10,
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}`,
                display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: isDark ? '#64748b' : '#94a3b8' }}>{row.label}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'monospace', color: '#818cf8' }}>{row.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
