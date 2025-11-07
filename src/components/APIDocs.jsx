export default function APIDocs() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  return (
    <section id="docs" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Dokumentasi API Internal</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">Gunakan endpoint berikut untuk integrasi lanjutan. Semua respons bertipe JSON.</p>

          <ul className="space-y-4 text-sm">
            <li>
              <code className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">POST {base}/transactions</code>
              <div className="text-neutral-600 dark:text-neutral-400">Body: user, category, amount, description, time (ISO8601). Aksi: simpan ke DB + kirim ke Google Sheets + notifikasi Telegram.</div>
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">GET {base}/transactions?range=(daily|weekly|monthly)</code>
              <div className="text-neutral-600 dark:text-neutral-400">Mengambil transaksi berdasarkan rentang waktu.</div>
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">POST {base}/auth/login</code>
              <div className="text-neutral-600 dark:text-neutral-400">Login multi-user dengan email/password. Kembalikan token untuk otorisasi.</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
