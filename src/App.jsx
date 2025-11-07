import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransactionForm from './components/TransactionForm';
import Dashboard from './components/Dashboard';
import APIDocs from './components/APIDocs';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <Hero />
      <main>
        <TransactionForm />
        <Dashboard />
        <APIDocs />
      </main>
      <footer className="py-10 border-t border-black/5 dark:border-white/10 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Made with ❤️ for APFlow — realtime finance manager
      </footer>
    </div>
  );
}

export default App;
