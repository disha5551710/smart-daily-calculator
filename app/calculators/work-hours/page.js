'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcButton, CalcResult } from '@/components/CalcUI';


export default function WorkHoursCalculator() {
  const [entries, setEntries] = useState([
    { start: '09:00', end: '17:00', label: 'Monday' },
    { start: '09:00', end: '17:00', label: 'Tuesday' },
  ]);
  const [result, setResult] = useState(null);

  const addEntry = () => setEntries([...entries, { start: '', end: '', label: `Day ${entries.length + 1}` }]);
  const removeEntry = (i) => setEntries(entries.filter((_, idx) => idx !== i));
  const updateEntry = (i, field, val) => {
    const copy = [...entries];
    copy[i][field] = val;
    setEntries(copy);
  };

  const timeToMins = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const calculate = () => {
    let totalMins = 0;
    const detail = entries.map(e => {
      if (!e.start || !e.end) return { ...e, hours: 0, mins: 0 };
      const diff = timeToMins(e.end) - timeToMins(e.start);
      const d = diff < 0 ? diff + 1440 : diff;
      totalMins += d;
      return { ...e, hours: Math.floor(d / 60), mins: d % 60 };
    });
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    setResult({ total: `${h}h ${m}m`, totalMins, detail });
  };

  const inputStyle = {
    padding: '0.45rem 0.6rem', borderRadius: 8, fontSize: '0.85rem',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg-secondary)',
    color: 'var(--color-text-heading)', outline: 'none', width: '100%',
  };

  return (
    <CalculatorPage 
      title="Work Hours Calculator" 
      emoji="⏰" 
      description="Track and total your work hours across multiple days or sessions."
      instructions={(
        <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1:</strong> Select a <strong>Start Time</strong> and an <strong>End Time</strong> for a work session.</li>
          <li><strong>Step 2:</strong> Enter how many minutes of <strong>Break</strong> you took.</li>
          <li><strong>Step 3:</strong> Click <strong>+ Add Session</strong> to keep racking up your work logged time.</li>
          <li><strong>Step 4:</strong> Click <strong>Calculate Total Hours</strong> and review the summary of accumulated hours.</li>
        </ul>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden',
          border: '1px solid var(--color-border)' }}>
          <div style={{ background: 'var(--color-bg-secondary)', padding: '0.6rem 1rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.5rem' }}>
            {['Label', 'Start', 'End', ''].map((h, i) => (
              <span key={i} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {entries.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.5rem', padding: '0.5rem 1rem', alignItems: 'center',
              borderTop: `1px solid ${'var(--color-border)'}` }}>
              <input value={e.label} onChange={ev => updateEntry(i, 'label', ev.target.value)} style={inputStyle} placeholder="Label" />
              <input type="time" value={e.start} onChange={ev => updateEntry(i, 'start', ev.target.value)} style={inputStyle} />
              <input type="time" value={e.end} onChange={ev => updateEntry(i, 'end', ev.target.value)} style={inputStyle} />
              <button onClick={() => removeEntry(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 6, color: '#ef4444', cursor: 'pointer', width: 28, height: 28, fontWeight: 700, fontSize: '0.9rem' }}>
                ×
              </button>
            </div>
          ))}
        </div>
        <button onClick={addEntry} style={{ padding: '0.5rem', borderRadius: 8, background: 'transparent',
          border: '1px dashed var(--color-primary)',
          color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          + Add Time Entry
        </button>
        <CalcButton id="calc-work-hours" onClick={calculate}>Calculate Total Hours</CalcButton>
        {result && (
          <div>
            <CalcResult label="Total Work Hours" value={result.total}
              subtext={`${result.totalMins} minutes total`} />
            <div style={{ marginTop: '0.75rem', borderRadius: 10, overflow: 'hidden',
              border: `1px solid ${'var(--color-bg-secondary)'}` }}>
              {result.detail.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem',
                  background: 'var(--color-bg-secondary)',
                  borderBottom: i < result.detail.length - 1 ? `1px solid ${'var(--color-border)'}` : 'none' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-body)' }}>{d.label} ({d.start}–{d.end})</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.85rem' }}>{d.hours}h {d.mins}m</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
