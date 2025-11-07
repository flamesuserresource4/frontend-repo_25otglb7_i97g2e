import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative" id="features">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-3 py-1 text-xs text-neutral-700 dark:text-neutral-200 shadow">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Realtime finance manager
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white">
            Kelola arus kas dengan mudah, visual, dan terhubung
          </h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-xl">
            APFlow membantu Anda mencatat transaksi, mensinkronkan ke Google Sheets, dan mengirim notifikasi Telegram secara otomatis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#form" className="inline-flex justify-center items-center h-11 px-6 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium shadow-lg">
              Catat Transaksi
            </a>
            <a href="#dashboard" className="inline-flex justify-center items-center h-11 px-6 rounded-xl border border-neutral-900/10 dark:border-white/20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur text-neutral-900 dark:text-white font-medium">
              Lihat Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/40" />
    </section>
  );
}
