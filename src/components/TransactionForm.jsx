import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Info } from 'lucide-react';

const categories = [
  'Pemasukan',
  'Pengeluaran',
  'Investasi',
  'Operasional',
  'Marketing',
  'Lainnya',
];

export default function TransactionForm() {
  const [form, setForm] = useState({
    user: '',
    category: 'Pemasukan',
    amount: '',
    description: '',
    time: new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.user.trim()) return 'Nama pengguna wajib diisi';
    if (!form.amount || Number.isNaN(Number(form.amount))) return 'Nominal tidak valid';
    if (Number(form.amount) <= 0) return 'Nominal harus lebih dari 0';
    if (!form.time) return 'Waktu wajib diisi';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMessage({ type: 'error', text: error });
      return;
    }

    if (!backendURL) {
      setMessage({ type: 'error', text: 'Backend belum dikonfigurasi. Set VITE_BACKEND_URL untuk mengaktifkan sinkronisasi.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${backendURL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: form.user,
          category: form.category,
          amount: Number(form.amount),
          description: form.description,
          time: new Date(form.time).toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Gagal menyimpan transaksi');
      setMessage({ type: 'success', text: 'Transaksi tercatat dan disinkronkan!' });
      setForm((f) => ({ ...f, amount: '', description: '' }));
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Catat Transaksi</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">Masukkan detail transaksi Anda. Data akan dikirim ke Google Sheets dan notifikasi Telegram.</p>
            </div>
            {!backendURL && (
              <div className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300 border border-amber-200/60 dark:border-amber-400/20">
                <Info size={14} /> Atur VITE_BACKEND_URL untuk mengaktifkan API
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Pengguna</label>
              <input name="user" value={form.user} onChange={handleChange} placeholder="mis. @andi"
                className="w-full h-11 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kategori</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nominal</label>
              <input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Waktu</label>
              <input name="time" type="datetime-local" value={form.time} onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Deskripsi</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div className="md:col-span-2 flex items-center justify-between mt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                type="submit"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow disabled:opacity-60"
              >
                <Send size={18} /> {loading ? 'Menyimpan...' : 'Simpan & Kirim'}
              </motion.button>

              {message && (
                <span className={`text-sm ${message.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {message.text}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
