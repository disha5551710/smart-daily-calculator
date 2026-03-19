'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1), d2 = new Date(date2);
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    setResult({ years, months, days, totalDays, totalWeeks });
  };


  return (
    <CalculatorPage 
      title="Age Difference Calculator" 
      emoji="🎂" 
      description="Find the exact age difference between two dates or birthdays."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Select the <strong>Date / Birthday 1</strong>.</li>
          <li><strong>Step 2:</strong> Select the <strong>Date / Birthday 2</strong>.</li>
          <li><strong>Step 3:</strong> Click on <strong>Calculate Difference</strong>.</li>
          <li><strong>Step 4:</strong> View the exact age difference in years, months, and days, along with total days and weeks!</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="date1" type="date" label="Date / Birthday 1" value={date1} onChange={e => setDate1(e.target.value)} />
        <CalcInput id="date2" type="date" label="Date / Birthday 2" value={date2} onChange={e => setDate2(e.target.value)} />
        <CalcButton id="calc-age-diff" onClick={calculate}>Calculate Difference</CalcButton>
        {result && (
          <div>
            <CalcResult label="Age Difference"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              subtext={`${result.totalDays.toLocaleString()} days • ${result.totalWeeks.toLocaleString()} weeks`}
              />
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
