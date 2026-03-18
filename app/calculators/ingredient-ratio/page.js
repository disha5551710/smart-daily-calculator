'use client';
import { useState } from 'react';
import CalculatorPage from '@/components/CalculatorPage';
import { CalcInput, CalcButton } from '@/components/CalcUI';


export default function IngredientRatioCalculator() {
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

        <div style={{ border: `1px solid ${'rgba(99,102,241,0.1)'}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'var(--color-bg-secondary)', padding: '0.6rem 1rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Ingredient</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Amount (g/ml)</span>
          </div>
          {ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.5rem 1rem',
              borderTop: `1px solid ${'var(--color-border)'}` }}>
              <input placeholder="Name" value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: 'var(--color-bg-main)',
                  border: `1px solid ${'rgba(99,102,241,0.15)'}`,
                  color: 'var(--color-text-heading)', fontSize: '0.875rem', outline: 'none' }} />
              <input type="number" placeholder="Amount" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: 'var(--color-bg-main)',
                  border: `1px solid ${'rgba(99,102,241,0.15)'}`,
                  color: 'var(--color-text-heading)', fontSize: '0.875rem', outline: 'none' }} />
            </div>
          ))}
        </div>

        <button onClick={addIngredient} style={{ padding: '0.5rem', borderRadius: 8, background: 'transparent',
          border: `1px dashed ${'rgba(99,102,241,0.2)'}`,
          color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          + Add Ingredient
        </button>
        <CalcButton id="scale-recipe" onClick={calculate}>Scale Recipe</CalcButton>

        {results.length > 0 && (
          <div style={{ borderRadius: 12, overflow: 'hidden',
            background: 'var(--color-accent-light)',
            border: '1px solid rgba(99,102,241,0.25)', animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#818cf8', fontSize: '0.9rem' }}>Scaled Ingredients</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-body)' }}>for {newServings} servings</span>
            </div>
            {results.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem',
                borderBottom: i < results.length - 1 ? '1px solid rgba(99,102,241,0.1)' : 'none' }}>
                <span style={{ color: 'var(--color-text-heading)', fontSize: '0.9rem' }}>{r.name}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: '#818cf8', fontFamily: 'Space Grotesk', fontSize: '1rem' }}>{r.scaled}</span>
                  <span style={{ color: 'var(--color-text-body)', fontSize: '0.75rem', marginLeft: '0.25rem' }}>
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
