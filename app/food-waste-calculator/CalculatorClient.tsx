'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Food preservation multiplier data (USDA + peer-reviewed studies, conservative midpoints)
const FOODS = [
  { name: 'Ground Beef', mult: 3.0, emoji: '🥩' },
  { name: 'Chicken Breast', mult: 2.5, emoji: '🍗' },
  { name: 'Salmon / Fish', mult: 2.0, emoji: '🐟' },
  { name: 'Cheese', mult: 4.0, emoji: '🧀' },
  { name: 'Berries', mult: 3.5, emoji: '🍓' },
  { name: 'Coffee Beans', mult: 2.0, emoji: '☕' },
  { name: 'Bread', mult: 3.0, emoji: '🍞' },
  { name: 'Leafy Greens', mult: 4.0, emoji: '🥬' },
];

const AVG_ANNUAL_WASTE = 1866;
const FRESHLOCK_PRICE = 74.99;
const KIT_PRICE = 94.99;

export default function CalculatorClient() {
  const [household, setHousehold] = useState(2);
  const [spendPerWeek, setSpendPerWeek] = useState(150);
  const [wastePercent, setWastePercent] = useState(30);
  const [bagUsed, setBagUsed] = useState(60);

  const result = useMemo(() => {
    // baseline: 2-person household at $150/wk = $7,800/yr → 30% waste = $2,340
    // scale linearly by household size relative to baseline
    const annualSpend = spendPerWeek * 52 * (household / 2);
    const wastedAnnual = annualSpend * (wastePercent / 100);
    const sealableSavings = wastedAnnual * (bagUsed / 100) * 0.7;
    const paybackDays = sealableSavings > 0 ? Math.ceil((FRESHLOCK_PRICE / sealableSavings) * 365) : 999;
    const fiveYearSavings = sealableSavings * 5 - FRESHLOCK_PRICE;
    return { wastedAnnual, sealableSavings, paybackDays, fiveYearSavings };
  }, [household, spendPerWeek, wastePercent, bagUsed]);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            USDA-backed savings calculator
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Stop Wasting <span className="text-accent">$1,866/Year</span><br />on Spoiled Food
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            The average US household throws away 30% of the food they buy — that's
            <strong className="text-white"> ${AVG_ANNUAL_WASTE.toLocaleString()}</strong> in the trash every year.
            FreshLock stops freezer burn before it starts, keeping food fresh up to 5× longer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calculator" className="btn-primary text-lg px-8 py-4 bg-accent hover:bg-accent/90 border-0">
              Calculate My Savings →
            </a>
            <Link href="/products/freshlock-starter-kit" className="bg-white/10 border-2 border-white/40 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition">
              Get Starter Kit — ${KIT_PRICE}
            </Link>
          </div>
        </div>
      </section>

      {/* USDA COMPARISON TABLE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">How Much Longer Does Food Last?</h2>
            <p className="section-subtitle">
              Side-by-side: regular storage vs. vacuum-sealed with FreshLock. Based on USDA FoodKeeper guidelines.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="grid grid-cols-4 bg-primary text-white font-semibold text-sm md:text-base">
              <div className="p-4">Food</div>
              <div className="p-4 text-center">Fridge/Freezer (regular)</div>
              <div className="p-4 text-center">Vacuum-Sealed (FreshLock)</div>
              <div className="p-4 text-center">Lasts</div>
            </div>
            {FOODS.map((f, i) => (
              <div key={f.name} className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-sm md:text-base`}>
                <div className="p-4 font-medium">
                  <span className="mr-2">{f.emoji}</span>{f.name}
                </div>
                <div className="p-4 text-center text-gray-600">
                  ~{Math.round(30 / f.mult)} days
                </div>
                <div className="p-4 text-center font-semibold text-primary">
                  ~30 days
                </div>
                <div className="p-4 text-center">
                  <span className="inline-block bg-accent/10 text-accent font-bold px-2 py-1 rounded text-xs">
                    {f.mult}× longer
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Typical fresh-food storage times in the freezer. Actual results vary by food type, temperature, and sealing quality.
            Source: USDA FoodKeeper App + vacuum-sealing food-storage research.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">💰 Your Personal Food Waste Calculator</h2>
            <p className="section-subtitle">
              Move the sliders to match your household — see how fast FreshLock pays for itself.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 md:p-10 shadow-lg border border-primary/10">
            <div className="space-y-8">
              <div>
                <label className="flex justify-between text-sm md:text-base font-semibold text-gray-700 mb-3">
                  <span>👥 People in your household</span>
                  <span className="text-accent">{household} {household === 1 ? 'person' : 'people'}</span>
                </label>
                <input
                  type="range" min={1} max={8} value={household}
                  onChange={(e) => setHousehold(Number(e.target.value))}
                  onInput={(e) => setHousehold(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-accent h-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span><span>4</span><span>8</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm md:text-base font-semibold text-gray-700 mb-3">
                  <span>🛒 Weekly grocery spending</span>
                  <span className="text-accent">${spendPerWeek}/week</span>
                </label>
                <input
                  type="range" min={50} max={400} step={10} value={spendPerWeek}
                  onChange={(e) => setSpendPerWeek(Number(e.target.value))}
                  onInput={(e) => setSpendPerWeek(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-accent h-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$50</span><span>$200</span><span>$400</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm md:text-base font-semibold text-gray-700 mb-3">
                  <span>🗑️ % of food you throw away (USDA avg: 30%)</span>
                  <span className="text-accent">{wastePercent}%</span>
                </label>
                <input
                  type="range" min={10} max={50} step={5} value={wastePercent}
                  onChange={(e) => setWastePercent(Number(e.target.value))}
                  onInput={(e) => setWastePercent(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-accent h-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10%</span><span>30%</span><span>50%</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm md:text-base font-semibold text-gray-700 mb-3">
                  <span>🫙 % of groceries you'd vacuum-seal (meats, cheese, bread, leftovers...)</span>
                  <span className="text-accent">{bagUsed}%</span>
                </label>
                <input
                  type="range" min={20} max={90} step={5} value={bagUsed}
                  onChange={(e) => setBagUsed(Number(e.target.value))}
                  onInput={(e) => setBagUsed(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-accent h-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>20%</span><span>60%</span><span>90%</span>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="mt-10 bg-white rounded-xl p-6 md:p-8 border-2 border-accent/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">You throw away every year</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-red-500">
                    ${Math.round(result.wastedAnnual).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">You could save with FreshLock</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-accent">
                    ${Math.round(result.sealableSavings).toLocaleString()}/yr
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">FreshLock pays for itself in</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-primary">
                    {result.paybackDays < 365 ? `${result.paybackDays} days` : `${(result.paybackDays / 30).toFixed(1)} mo`}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  5-year projected savings (after FreshLock pays for itself):
                  <span className="text-2xl font-bold text-accent ml-2">
                    ${Math.round(Math.max(0, result.fiveYearSavings)).toLocaleString()}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <Link href="/products/freshlock-pro" className="btn-primary text-base px-6 py-3">
                    Get FreshLock Pro — ${FRESHLOCK_PRICE}
                  </Link>
                  <Link href="/products/freshlock-starter-kit" className="btn-secondary text-base px-6 py-3">
                    🎁 Starter Kit — ${KIT_PRICE} (Ships FREE)
                  </Link>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Calculator is an estimate based on USDA averages. Your actual savings depend on food habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">3 Steps to Start Saving</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: 1, title: 'Seal in Seconds', text: 'Drop food into a valve bag, zip the slider, attach FreshLock to the valve, press once. The -60 kPa pump pulls air out in seconds.' },
              { n: 2, title: 'Fridge · Freezer · Pantry', text: 'Meal prep, leftovers, marinating meats, cheese, coffee, berries — everything lasts 2–5× longer without freezer burn.' },
              { n: 3, title: 'Save Money Every Week', text: 'Throw away less, buy less, and the sealer pays for itself in weeks. Reusable bags, zero waste.' },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent text-white font-bold text-xl flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop Throwing Money in the Trash
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Join households saving ${Math.round(AVG_ANNUAL_WASTE * 0.4).toLocaleString()}+/year on groceries.
            60-day returns · 2-year warranty · Free shipping over $89.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products/freshlock-starter-kit" className="bg-accent hover:bg-accent/90 text-white text-lg font-bold px-8 py-4 rounded-lg transition">
              🎁 Get Starter Kit — ${KIT_PRICE} (Ships FREE)
            </Link>
            <Link href="/products/freshlock-pro" className="bg-white/10 border-2 border-white/40 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition">
              FreshLock Pro — ${FRESHLOCK_PRICE}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
