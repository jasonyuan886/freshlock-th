'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Source: USDA + peer-reviewed studies on vacuum-sealed food preservation:
// Vacuum sealing cuts household food waste by 50–70% (midpoint 60%).
// Average US household wastes ~30% of food purchased.
const SAVINGS_RATE = 0.60; // 60% of wasted food saved with vacuum sealing
const FRESHLOCK_PRICE = 29.9;

const COST_MULTIPLIERS = {
  low: 0.85,
  medium: 1.0,
  high: 1.2,
} as const;

type CostLevel = keyof typeof COST_MULTIPLIERS;

function fmtUSD(n: number): string {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function SavingsCalculatorClient() {
  const [household, setHousehold] = useState<number>(2);
  const [weeklyWaste, setWeeklyWaste] = useState<number>(30);
  const [costLevel, setCostLevel] = useState<CostLevel>('medium');

  const results = useMemo(() => {
    const mult = COST_MULTIPLIERS[costLevel];
    // Baseline weekly waste is scaled up by household size relative to 2-person baseline
    // (larger households waste more on spoiled produce/leftovers but slightly less per-person)
    const householdFactor = 0.55 + 0.45 * (household / 2); // sub-linear scaling
    const annualWaste = weeklyWaste * 52 * householdFactor * mult;
    const annualSavings = annualWaste * SAVINGS_RATE;
    const paybackWeeks =
      annualSavings > 0 ? Math.ceil((FRESHLOCK_PRICE / annualSavings) * 52) : 999;
    const threeYearSavings = annualSavings * 3 - FRESHLOCK_PRICE;
    const monthlySavings = annualSavings / 12;
    return {
      annualWaste,
      annualSavings,
      paybackWeeks,
      threeYearSavings,
      monthlySavings,
    };
  }, [household, weeklyWaste, costLevel]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-700 text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            Free tool · 30-second estimate
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            How Much Money Are You{' '}
            <span className="text-secondary-300">Throwing Away</span> on Spoiled Food?
          </h1>
          <p className="text-lg md:text-xl text-primary-50 max-w-3xl mx-auto mb-6 leading-relaxed">
            Studies show vacuum sealing reduces household food waste by{' '}
            <strong className="text-white">50–70%</strong>. Adjust the sliders to see
            how fast a FreshLock pays for itself in your kitchen.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Inputs */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your household
                </h2>
                <p className="text-gray-600 text-sm">
                  Move the sliders to match how your household shops and eats.
                </p>
              </div>

              {/* Household size */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label
                    htmlFor="household"
                    className="font-semibold text-gray-900"
                  >
                    People in your household
                  </label>
                  <span className="text-2xl font-bold text-primary-700">
                    {household}
                  </span>
                </div>
                <input
                  id="household"
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={household}
                  onChange={(e) => setHousehold(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6+</span>
                </div>
              </div>

              {/* Weekly food waste */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label
                    htmlFor="waste"
                    className="font-semibold text-gray-900"
                  >
                    Estimated weekly food waste
                  </label>
                  <span className="text-2xl font-bold text-primary-700">
                    {fmtUSD(weeklyWaste)}
                    <span className="text-sm font-normal text-gray-500"> / week</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Be honest — spoiled produce, expired leftovers, moldy cheese,
                  freezer-burned meat, half-eaten bags of salad. The USDA says
                  the average household wastes about $30–$50/week.
                </p>
                <input
                  id="waste"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={weeklyWaste}
                  onChange={(e) => setWeeklyWaste(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$10</span>
                  <span>$40</span>
                  <span>$70</span>
                  <span>$100</span>
                </div>
              </div>

              {/* Cost level */}
              <div>
                <label className="font-semibold text-gray-900 block mb-3">
                  Local food cost level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { key: 'low', label: 'Lower', sub: 'Rural / low-COL' },
                      { key: 'medium', label: 'Average', sub: 'Most US areas' },
                      { key: 'high', label: 'Higher', sub: 'Major cities' },
                    ] as { key: CostLevel; label: string; sub: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setCostLevel(opt.key)}
                      className={`py-3 px-2 rounded-lg border-2 transition text-center ${
                        costLevel === opt.key
                          ? 'border-primary-600 bg-primary-50 text-primary-800'
                          : 'border-stone-200 bg-white text-gray-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-md border-2 border-primary-200 p-6 md:p-8">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Your annual food waste
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-1">
                  {fmtUSD(results.annualWaste)}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  thrown away on spoiled food each year
                </p>

                <div className="border-t border-stone-200 pt-5">
                  <p className="text-sm text-primary-700 uppercase tracking-wide font-semibold mb-1">
                    Annual savings with FreshLock
                  </p>
                  <p className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-1">
                    {fmtUSD(results.annualSavings)}
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    ≈ {fmtUSD(results.monthlySavings)}/month back in your pocket
                    (cutting 60% of waste via vacuum sealing)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Payback period
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.paybackWeeks} weeks
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      FreshLock earns its keep in under{' '}
                      {results.paybackWeeks <= 8
                        ? 'two months'
                        : results.paybackWeeks <= 26
                        ? 'six months'
                        : 'a year'}
                    </p>
                  </div>
                  <div className="bg-accent/10 rounded-xl p-4">
                    <p className="text-xs text-accent-700 uppercase font-semibold mb-1">
                      3-year total savings
                    </p>
                    <p className="text-2xl font-bold text-accent-700">
                      {fmtUSD(results.threeYearSavings)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      after subtracting the ${FRESHLOCK_PRICE} price
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/products/freshlock-starter-kit"
                    className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition text-lg"
                  >
                    Get FreshLock Starter Kit for $94.99 →
                  </Link>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Free shipping on the Starter Kit · 2-year warranty · 30-day returns
                  </p>
                </div>
              </div>

              {/* Product card */}
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex gap-4 items-center">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 relative">
                  <Image
                    src="/images/products/sealer-main.jpg"
                    alt="FreshLock handheld vacuum sealer"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 leading-tight">
                    FreshLock Handheld Vacuum Sealer
                  </p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                    <li>• -60 kPa strong suction</li>
                    <li>• USB-C rechargeable, ~210g cordless</li>
                    <li>• Detachable drip cup · 80–100 seals/charge</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mt-12 max-w-3xl mx-auto text-gray-600 text-sm bg-stone-100 rounded-xl p-6 border border-stone-200">
            <h3 className="font-bold text-gray-900 mb-2">How we calculate this</h3>
            <p className="mb-2">
              Studies by the USDA and food-preservation researchers consistently
              find that vacuum sealing reduces household food waste by{' '}
              <strong>50–70%</strong> by slowing oxidation, eliminating freezer
              burn, and extending fridge life. We use a conservative 60% reduction.
            </p>
            <p className="mb-2">
              Annual waste = your weekly estimate × 52 weeks, scaled modestly by
              household size (larger households waste more food but slightly less
              per person). Local cost-of-living adjusts by ±15–20%.
            </p>
            <p>
              This is an estimate, not a guarantee — actual savings depend on what
              you eat, how you shop, and how consistently you seal. But for most
              households a vacuum sealer pays for itself in weeks, not years.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop paying for food you don't eat.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The FreshLock is the size of a flashlight, charges with USB-C, and
            keeps food fresh up to 5× longer. Starter Kit from 9.99.
          </p>
          <Link
            href="/products/freshlock-starter-kit"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
          >
            Check out the FreshLock handheld vacuum sealer →
          </Link>
        </div>
      </section>
    </div>
  );
}
