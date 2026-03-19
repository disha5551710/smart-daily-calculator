'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton, CalcResult } from '@/components/CalcUI';


export default function CGPACalculator() {
  const [cgpa, setCgpa] = useState('');
  const [result, setResult] = useState(null);

  const getGrade = (cgpa) => {
    if (cgpa >= 9) return { grade: 'O (Outstanding)', color: '#22c55e' };
    if (cgpa >= 8) return { grade: 'A+ (Excellent)', color: 'var(--color-primary)' };
    if (cgpa >= 7) return { grade: 'A (Very Good)', color: 'var(--color-primary)' };
    if (cgpa >= 6) return { grade: 'B+ (Good)', color: '#8b5cf6' };
    if (cgpa >= 5) return { grade: 'B (Average)', color: '#f59e0b' };
    return { grade: 'C (Below Average)', color: '#ef4444' };
  };

  const calculate = () => {
    const val = parseFloat(cgpa);
    if (!val || val < 0 || val > 10) return;
    const percentage = (val - 0.75) * 10;
    const gradeInfo = getGrade(val);
    setResult({ percentage: percentage.toFixed(2), grade: gradeInfo.grade, color: gradeInfo.color });
  };

  return (
    <CalculatorPage 
      title="CGPA Calculator" 
      emoji="🎓" 
      description="Quickly calculate your CGPA / GPA for the semester."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Enter the <strong>Credits</strong> and <strong>Grade / Points</strong> for your first subject.</li>
          <li><strong>Step 2:</strong> Click <strong>+ Add Subject</strong> to add additional courses to your calculation.</li>
          <li><strong>Step 3:</strong> Click <strong>Calculate CGPA</strong>.</li>
          <li><strong>Step 4:</strong> Review your overall CGPA and the total total credits you have accumulated.</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <CalcInput id="cgpa-input" label="Your CGPA (out of 10)" placeholder="e.g. 8.5" value={cgpa}
          onChange={e => setCgpa(e.target.value)} min="0" step="0.01" />
        <CalcButton id="calc-cgpa" onClick={calculate}>Convert to Percentage</CalcButton>
        {result && (
          <div>
            <CalcResult label="Equivalent Percentage" value={`${result.percentage}%`}
              subtext="Formula: (CGPA − 0.75) × 10" />
            <div style={{ marginTop: '0.75rem', padding: '0.9rem 1.25rem', borderRadius: 12,
              background: `${result.color}15`, border: `1px solid ${result.color}40`,
              display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🎓</span>
              <span style={{ color: result.color, fontWeight: 700, fontSize: '0.9rem' }}>Grade: {result.grade}</span>
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
