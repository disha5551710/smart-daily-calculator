'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


const RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50,
  AUD: 1.53, CAD: 1.36, CHF: 0.90, CNY: 7.24, SGD: 1.34,
  AED: 3.67, MYR: 4.68,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState(null);

  const opts = Object.keys(RATES).map(c => ({ value: c, label: c }));

  const convert = () => {
    const a = parseFloat(amount);
    if (!a) return;
    const inUSD = a / RATES[from];
    const converted = inUSD * RATES[to];
    setResult({ value: converted.toFixed(4), rate: (RATES[to] / RATES[from]).toFixed(6) });
  };

  return (
    <CalculatorPage 
      title="Currency Converter" 
      emoji="💱" 
      description="Quickly convert amounts between two currencies using an exchange rate."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Provide the <strong>Exchange Rate</strong> (how much 1 unit of the "From" currency is worth in the "To" currency).</li>
          <li><strong>Step 2:</strong> Enter the <strong>Amount to convert</strong>.</li>
          <li><strong>Step 3:</strong> Click <strong>Convert</strong>.</li>
          <li><strong>Step 4:</strong> The final converted amount will be displayed below!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="currency-amount" label="Amount" placeholder="e.g. 100" value={amount}
          onChange={e => setAmount(e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <CalcSelect id="from-currency" label="From" value={from}
            onChange={e => { setFrom(e.target.value); setResult(null); }} options={opts} />
          <CalcSelect id="to-currency" label="To" value={to}
            onChange={e => { setTo(e.target.value); setResult(null); }} options={opts} />
        </div>
        <CalcButton id="convert-currency" onClick={convert}>Convert</CalcButton>
        {result && (
          <div>
            <CalcResult label={`${amount} ${from} =`} value={`${result.value} ${to}`}
              subtext={`1 ${from} = ${result.rate} ${to} (indicative rate)`} />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', marginTop: '0.75rem', textAlign: 'center' }}>
              ⚠️ Rates are indicative. For live rates, use a bank or forex service.
            </p>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
