'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function GSTCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState('exclusive');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (!a || !r) return;
    if (mode === 'exclusive') {
      const gst = (a * r) / 100;
      const total = a + gst;
      const cgst = gst / 2;
      setResult({ gst: gst.toFixed(2), total: total.toFixed(2), cgst: cgst.toFixed(2), sgst: cgst.toFixed(2) });
    } else {
      const originalPrice = (a * 100) / (100 + r);
      const gst = a - originalPrice;
      const cgst = gst / 2;
      setResult({ gst: gst.toFixed(2), total: a.toFixed(2), originalPrice: originalPrice.toFixed(2), cgst: cgst.toFixed(2), sgst: cgst.toFixed(2) });
    }
  };

  return (
    <CalculatorPage title="GST Calculator" emoji="🧾" description="Calculate GST inclusive or exclusive prices for any GST rate slab.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcSelect id="gst-mode" label="Calculation Mode" value={mode}
          onChange={e => { setMode(e.target.value); setResult(null); }}
          options={[{ value: 'exclusive', label: 'Add GST (Price exclusive of GST)' }, { value: 'inclusive', label: 'Remove GST (Price inclusive of GST)' }]} />
        <CalcInput id="gst-amount" label={mode === 'exclusive' ? 'Price (Before GST)' : 'Price (Including GST)'} placeholder="e.g. 5000"
          value={amount} onChange={e => setAmount(e.target.value)} unit="₹" />
        <CalcSelect id="gst-rate" label="GST Rate" value={rate} onChange={e => { setRate(e.target.value); setResult(null); }}
          options={['5', '12', '18', '28'].map(r => ({ value: r, label: `${r}%` }))} />
        <CalcButton id="calc-gst" onClick={calculate}>Calculate GST</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <CalcResult label={mode === 'exclusive' ? 'Total Price (with GST)' : 'Original Price (before GST)'}
              value={`₹${mode === 'exclusive' ? result.total : result.originalPrice}`}
              subtext={`GST Amount: ₹${result.gst}`} isDark={isDark} />
            <div style={{ padding: '1rem', borderRadius: 12,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}` }}>
              {[
                ['CGST (' + rate / 2 + '%)', `₹${result.cgst}`],
                ['SGST (' + rate / 2 + '%)', `₹${result.sgst}`],
                ['Total GST (' + rate + '%)', `₹${result.gst}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0',
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                  <span style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>{k}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#e2e8f0' : '#1e293b' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
