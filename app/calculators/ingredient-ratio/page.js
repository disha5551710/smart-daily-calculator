'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton } from '@/components/CalcUI';
import { useTheme } from '@/components/ThemeProvider';

export default function IngredientRatioCalculator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [ingredients, setIngredients] = useState([
    { name: 'Flour', amount: '200' },
    { name: 'Sugar', amount: '100' },
    { name: 'Butter', amount: '50' },
  ]);
  const [origServings, setOrigServings] = useState('4');
  const [newServings, setNewServings] = useState('');
  const [results, setResults] = useState([]);

  const addIngredient = () => setIngredients([...ingredients, { name: '', amount: '' }]);
  const updateIngredient = (i, field, val) => {
    const copy = [...ingredients];
    copy[i][field] = val;
    setIngredients(copy);
  };

  const calculate = () => {
    const orig = parseFloat(origServings);
    const newS = parseFloat(newServings);
    if (!orig || !newS) return;
    const ratio = newS / orig;
    setResults(ingredients.map(ing => ({
      name: ing.name || 'Ingredient',
      scaled: (parseFloat(ing.amount) * ratio || 0).toFixed(2),
      original: ing.amount,
    })));
  };

  return (
    <CalculatorPage title="Ingredient Ratio Calculator" emoji="🍳" description="Scale recipe ingredients up or down based on number of servings.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <CalcInput id="orig-servings" label="Original Servings" placeholder="e.g. 4"
            value={origServings} onChange={e => setOrigServings(e.target.value)} />
          <CalcInput id="new-servings" label="New Servings" placeholder="e.g. 10"
            value={newServings} onChange={e => setNewServings(e.target.value)} />
        </div>

        <div style={{ border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)', padding: '0.6rem 1rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isDark ? '#818cf8' : '#6366f1', textTransform: 'uppercase' }}>Ingredient</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isDark ? '#818cf8' : '#6366f1', textTransform: 'uppercase' }}>Amount (g/ml)</span>
          </div>
          {ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.5rem 1rem',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
              <input placeholder="Name" value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
                  color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem', outline: 'none' }} />
              <input type="number" placeholder="Amount" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
                  color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem', outline: 'none' }} />
            </div>
          ))}
        </div>

        <button onClick={addIngredient} style={{ padding: '0.5rem', borderRadius: 8, background: 'transparent',
          border: `1px dashed ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
          color: isDark ? '#818cf8' : '#6366f1', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          + Add Ingredient
        </button>
        <CalcButton id="scale-recipe" onClick={calculate}>Scale Recipe</CalcButton>

        {results.length > 0 && (
          <div style={{ borderRadius: 12, overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.08))',
            border: '1px solid rgba(99,102,241,0.25)', animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#818cf8', fontSize: '0.9rem' }}>Scaled Ingredients</span>
              <span style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8' }}>for {newServings} servings</span>
            </div>
            {results.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem',
                borderBottom: i < results.length - 1 ? '1px solid rgba(99,102,241,0.1)' : 'none' }}>
                <span style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.9rem' }}>{r.name}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: '#818cf8', fontFamily: 'Space Grotesk', fontSize: '1rem' }}>{r.scaled}</span>
                  <span style={{ color: isDark ? '#475569' : '#94a3b8', fontSize: '0.75rem', marginLeft: '0.25rem' }}>
                    (orig: {r.original})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CalculatorPage>
  );
}
