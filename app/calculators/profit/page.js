'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function ProfitCalculator() {
  const [cost, setCost] = useState('');
  const [sell, setSell] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const s = parseFloat(sell);
    if (!c || !s) return;
    const profit = s - c;
    const pct = ((profit / c) * 100);
    const isLoss = profit < 0;
    setResult({ profit: Math.abs(profit).toFixed(2), percentage: Math.abs(pct).toFixed(2), isLoss, cost: c, sell: s });
  };

  return (
    <CalculatorPage title="Profit Calculator" emoji="📈" description="Calculate profit or loss and profit percentage for any business transaction.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="cost-price" label="Cost Price (CP)" placeholder="e.g. 500" value={cost}
          onChange={e => setCost(e.target.value)} unit="₹" />
        <CalcInput id="sell-price" label="Selling Price (SP)" placeholder="e.g. 750" value={sell}
          onChange={e => setSell(e.target.value)} unit="₹" />
        <CalcButton id="calc-profit" onClick={calculate}>Calculate Profit / Loss</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label={result.isLoss ? 'Loss Amount' : 'Profit Amount'}
              value={`₹${result.profit}`}
              subtext={`${result.percentage}% ${result.isLoss ? 'loss' : 'profit margin'}`}
              />
            <div style={{ padding: '0.75rem 1.25rem', borderRadius: 12,
              background: result.isLoss ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${result.isLoss ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)'}`,
              display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.3rem' }}>{result.isLoss ? '📉' : '📈'}</span>
              <div>
                <p style={{ fontWeight: 700, color: result.isLoss ? '#ef4444' : '#22c55e', fontSize: '0.95rem' }}>
                  {result.isLoss ? 'LOSS' : 'PROFIT'} of {result.percentage}%
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-body)' }}>
                  SP ₹{result.sell} − CP ₹{result.cost} = {result.isLoss ? '−' : '+'}₹{result.profit}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
