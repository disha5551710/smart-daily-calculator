'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function GSTCalculator() {
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
    <CalculatorPage 
      title="GST Calculator" 
      emoji="🧾" 
      description="Calculate GST inclusive or exclusive prices for any GST rate slab."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter the <strong>Initial Amount</strong>.</li>
          <li><strong>Step 2:</strong> Enter the <strong>GST Rate</strong> percentage (e.g. 5, 12, 18 or 28).</li>
          <li><strong>Step 3:</strong> Click <strong>Add GST</strong> if the price excludes GST, or <strong>Remove GST</strong> if the price already includes it.</li>
          <li><strong>Step 4:</strong> Check out the resulting Net Amount, Total GST, and the Gross Amount below!</li>
        </ul>
      )}
    >
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
              subtext={`GST Amount: ₹${result.gst}`} />
            <div style={{ padding: '1rem', borderRadius: 12,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              {[
                ['CGST (' + rate / 2 + '%)', `₹${result.cgst}`],
                ['SGST (' + rate / 2 + '%)', `₹${result.sgst}`],
                ['Total GST (' + rate + '%)', `₹${result.gst}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0',
                  borderBottom: `1px solid ${'var(--color-border)'}` }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-body)' }}>{k}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
