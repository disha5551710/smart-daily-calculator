'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!p || d === undefined || isNaN(d)) return;
    const saved = (p * d) / 100;
    const final = p - saved;
    setResult({ final: final.toFixed(2), saved: saved.toFixed(2), original: p });
  };

  return (
    <CalculatorPage 
      title="Discount Calculator" 
      emoji="🏷️" 
      description="Find the final price after applying a percentage discount."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter the <strong>Original Price</strong> of the item.</li>
          <li><strong>Step 2:</strong> Enter the <strong>Discount Percentage</strong> offered.</li>
          <li><strong>Step 3:</strong> Click <strong>Calculate Final Price</strong>.</li>
          <li><strong>Step 4:</strong> Check out the Final Price and how much you saved!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="orig-price" label="Original Price" placeholder="e.g. 2999" value={price}
          onChange={e => setPrice(e.target.value)} unit="₹" />
        <CalcInput id="discount-pct" label="Discount Percentage" placeholder="e.g. 20" value={discount}
          onChange={e => setDiscount(e.target.value)} unit="%" />
        <CalcButton id="calc-discount" onClick={calculate}>Calculate Final Price</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label="Final Price After Discount" value={`₹${result.final}`}
              subtext={`You save ₹${result.saved}!`} />
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
              display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💰</span>
              <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
                You save ₹{result.saved} ({discount}% off)
              </span>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
