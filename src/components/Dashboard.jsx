import { useEffect, useMemo, useState } from 'react';

const ranges = [
  { key: 'daily', label: 'Harian', days: 1 },
  { key: 'weekly', label: 'Mingguan', days: 7 },
  { key: 'monthly', label: 'Bulanan', days: 30 },
];

export default function Dashboard() {
  const [range, setRange] = useState('weekly');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/transactions?range=${range}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Gagal memuat');
        setItems(data);
      } catch (e) {
        // fallback demo data when backend not available
        const now = Date.now();
        setItems([
          { category: 'Pemasukan', amount: 500000, time: now },
          { category: 'Pengeluaran', amount: 320000, time: now },
        ]);
      }
    };
    load();
  }, [range]);

  const { income, expense } = useMemo(() => {
    const income = items.filter((i) => i.category === 'Pemasukan').reduce((a, b) => a + Number(b.amount || 0), 0);
    const expense = items.filter((i) => i.category !== 'Pemasukan').reduce((a, b) => a + Number(b.amount || 0), 0);
    return { income, expense };
  }, [items]);

  const max = Math.max(income, expense, 1);
  const barHeight = 180;
  const incomeH = (income / max) * barHeight;
  const expenseH = (expense / max) * barHeight;

  return (
    <section id="dashboard" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Dashboard</h2>
          <div className="flex gap-2">
            {ranges.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`h-9 px-3 rounded-lg text-sm border transition ${
                  range === r.key
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-black/10 dark:border-white/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Stat title="Pemasukan" value={income} color="text-emerald-600 dark:text-emerald-400" />
            <Stat title="Pengeluaran" value={expense} color="text-red-600 dark:text-red-400" />
          </div>

          <div className="relative w-full max-w-xl mx-auto">
            <svg viewBox={`0 0 300 ${barHeight + 40}`} className="w-full">
              <defs>
                <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* axes */}
              <line x1="30" y1={10} x2="30" y2={barHeight + 10} stroke="currentColor" className="text-neutral-300 dark:text-neutral-700" />
              <line x1="30" y1={barHeight + 10} x2={290} y2={barHeight + 10} stroke="currentColor" className="text-neutral-300 dark:text-neutral-700" />

              {/* bars */}
              <rect x="70" y={barHeight + 10 - incomeH} width="60" height={incomeH} rx="12" fill="url(#gIncome)" />
              <rect x="170" y={barHeight + 10 - expenseH} width="60" height={expenseH} rx="12" fill="url(#gExpense)" />

              {/* labels */}
              <text x="100" y={barHeight + 30} textAnchor="middle" className="fill-current text-neutral-600 dark:text-neutral-300" fontSize="12">Pemasukan</text>
              <text x="200" y={barHeight + 30} textAnchor="middle" className="fill-current text-neutral-600 dark:text-neutral-300" fontSize="12">Pengeluaran</text>

              <text x="100" y={barHeight + 0 - incomeH} textAnchor="middle" className="fill-current" fontSize="12" dy="-8">
                Rp {Math.round(income).toLocaleString('id-ID')}
              </text>
              <text x="200" y={barHeight + 0 - expenseH} textAnchor="middle" className="fill-current" fontSize="12" dy="-8">
                Rp {Math.round(expense).toLocaleString('id-ID')}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="text-sm text-neutral-600 dark:text-neutral-300">{title}</div>
      <div className={`mt-1 text-2xl font-semibold ${color}`}>Rp {Math.round(value).toLocaleString('id-ID')}</div>
    </div>
  );
}
