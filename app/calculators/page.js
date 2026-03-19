import CalculatorCard from '@/components/CalculatorCard';

export const metadata = {
  title: 'All Calculators – Smart Daily Calculators',
  description: 'Browse all 16+ free online calculators for finance, health, math, and daily life.',
};

const allCalculators = [
  { name: 'Income Tax', description: 'Estimate your annual income tax based on slab.', emoji: '💰', href: '/calculators/income-tax', category: 'finance' },
  { name: 'BMI Calculator', description: 'Calculate Body Mass Index and check weight category.', emoji: '⚖️', href: '/calculators/bmi', category: 'health' },
  { name: 'Percentage', description: 'Find percentage, increase/decrease, etc.', emoji: '📊', href: '/calculators/percentage', category: 'math' },
  { name: 'Discount', description: 'Calculate final price after discounts or cashback.', emoji: '🏷️', href: '/calculators/discount', category: 'finance' },
  { name: 'Rent Calculator', description: 'Split rent fairly or calculate per-person cost.', emoji: '🏠', href: '/calculators/rent', category: 'finance' },
  { name: 'Age Difference', description: 'Find the exact age difference between two people.', emoji: '🎂', href: '/calculators/age-difference', category: 'daily' },
  { name: 'Binary / Decimal / Hex', description: 'Convert between number systems seamlessly.', emoji: '💻', href: '/calculators/binary-decimal', category: 'math' },
  { name: 'CGPA Calculator', description: 'Calculate overall CGPA based on credits and grades.', emoji: '🎓', href: '/calculators/cgpa', category: 'math' },
  { name: 'Currency Converter', description: 'Convert amounts between changing currency rates.', emoji: '💱', href: '/calculators/currency', category: 'finance' },
  { name: 'Distance Calculator', description: 'Find distance from speed and time.', emoji: '📍', href: '/calculators/distance', category: 'daily' },
  { name: 'GST Calculator', description: 'Add or remove GST for price components.', emoji: '🧾', href: '/calculators/gst', category: 'finance' },
  { name: 'Ingredient Ratio', description: 'Scale your recipe ingredients perfectly.', emoji: '🍳', href: '/calculators/ingredient-ratio', category: 'daily' },
  { name: 'LCM Calculator', description: 'Find least common multiple for numbers.', emoji: '🔢', href: '/calculators/lcm', category: 'math' },
  { name: 'Profit Calculator', description: 'See profit margin and percentages from sales.', emoji: '📈', href: '/calculators/profit', category: 'finance' },
  { name: 'Savings Calculator', description: 'Project the compound growth of your savings.', emoji: '🐷', href: '/calculators/savings', category: 'finance' },
  { name: 'Work Hours', description: 'Log working timestamps and get pure total times.', emoji: '⏰', href: '/calculators/work-hours', category: 'daily' }
];

export default function CalculatorsPage() {
  return (
    <div style={{ paddingTop: '90px', paddingBottom: '4rem', backgroundColor: 'var(--color-bg-main)', minHeight: '100vh' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text-heading)', marginBottom: '1rem',
          }}>
            All Calculators
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Browse our complete collection of 16+ absolutely free and private calculator tools sorted below for you!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {allCalculators.map((calc, i) => (
            <CalculatorCard key={calc.href} {...calc} delay={(i % 10) * 50} />
          ))}
        </div>
      </section>
    </div>
  );
}
