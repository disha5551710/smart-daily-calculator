'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult, CalcSelect } from '@/components/CalcUI';


export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState('');
  const [regime, setRegime] = useState('new');
  const [result, setResult] = useState(null);

  const calculateNewRegime = (inc) => {
    let tax = 0;
    if (inc <= 300000) tax = 0;
    else if (inc <= 700000) tax = (inc - 300000) * 0.05;
    else if (inc <= 1000000) tax = 20000 + (inc - 700000) * 0.10;
    else if (inc <= 1200000) tax = 50000 + (inc - 1000000) * 0.15;
    else if (inc <= 1500000) tax = 80000 + (inc - 1200000) * 0.20;
    else tax = 140000 + (inc - 1500000) * 0.30;
    return tax;
  };

  const calculateOldRegime = (inc) => {
    const taxable = inc - 250000;
    if (taxable <= 0) return 0;
    let tax = 0;
    if (taxable <= 250000) tax = taxable * 0.05;
    else if (taxable <= 750000) tax = 12500 + (taxable - 250000) * 0.20;
    else tax = 112500 + (taxable - 750000) * 0.30;
    return tax;
  };

  const calculate = () => {
    const inc = parseFloat(income);
    if (!inc || inc < 0) return;
    const tax = regime === 'new' ? calculateNewRegime(inc) : calculateOldRegime(inc);
    const cess = tax * 0.04;
    const total = tax + cess;
    const effective = ((total / inc) * 100).toFixed(2);
    setResult({ tax: tax.toFixed(0), cess: cess.toFixed(0), total: total.toFixed(0), effective });
  };

  return (
    <CalculatorPage 
      title="Income Tax Calculator" 
      emoji="💰" 
      description="Estimate your Indian income tax under New or Old tax regime."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter your total <strong>Annual Income</strong>.</li>
          <li><strong>Step 2:</strong> Enter any <strong>Deductions</strong> (e.g. Section 80C, 80D, standard deduction).</li>
          <li><strong>Step 3:</strong> Select whether you want to calculate exactly according to the <strong>New Regime</strong> or <strong>Old Regime</strong>.</li>
          <li><strong>Step 4:</strong> Click <strong>Calculate Tax</strong> to view your estimated taxable income and estimated tax liability!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcSelect id="tax-regime" label="Tax Regime" value={regime} onChange={e => { setRegime(e.target.value); setResult(null); }}
          options={[{ value: 'new', label: 'New Tax Regime (FY 2024-25)' }, { value: 'old', label: 'Old Tax Regime' }]} />
        <CalcInput id="annual-income" label="Annual Income" placeholder="e.g. 800000" value={income}
          onChange={e => setIncome(e.target.value)} unit="₹" />
        <CalcButton id="calc-tax" onClick={calculate}>Calculate Income Tax</CalcButton>
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CalcResult label="Total Tax Payable (incl. cess)" value={`₹${parseInt(result.total).toLocaleString('en-IN')}`}
              subtext={`Effective Tax Rate: ${result.effective}%`} />
            <div style={{ padding: '1rem', borderRadius: 12,
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              {[
                { label: 'Base Income Tax', val: `₹${parseInt(result.tax).toLocaleString('en-IN')}` },
                { label: 'Health & Education Cess (4%)', val: `₹${parseInt(result.cess).toLocaleString('en-IN')}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.4rem 0', borderBottom: `1px solid ${'var(--color-border)'}` }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-body)' }}>{row.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
