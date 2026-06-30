import { useState } from 'react';
import { MARKETS } from './data';
import type { Market } from './types';
import MarketCard from './components/MarketCard';
import MarketModal from './components/MarketModal';
import Portfolio from './components/Portfolio';

export type Trade = { marketId: string; title: string; side: 'YES' | 'NO'; shares: number; price: number };

export default function App() {
  const [selected, setSelected] = useState<Market | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tab, setTab] = useState<'markets' | 'portfolio'>('markets');
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...Array.from(new Set(MARKETS.map(m => m.category)))];
  const filtered = filter === 'All' ? MARKETS : MARKETS.filter(m => m.category === filter);
  const addTrade = (t: Trade) => setTrades(p => [...p, t]);
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand">PredictX</span>
          <span className="text-xs bg-brand/20 text-brand px-2 py-0.5 rounded-full">BETA</span>
        </div>
        <nav className="flex gap-1">
          {(['markets','portfolio'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                tab === t ? 'bg-brand text-gray-950' : 'text-gray-400 hover:text-white'}`}>{t}</button>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'markets' ? (
          <>
            <div className="flex gap-2 mb-6 flex-wrap">
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    filter === c ? 'bg-brand text-gray-950 font-semibold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>{c}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(m => <MarketCard key={m.id} market={m} onClick={() => setSelected(m)} />)}
            </div>
          </>
        ) : <Portfolio trades={trades} />}
      </main>
      {selected && <MarketModal market={selected} onClose={() => setSelected(null)} onTrade={addTrade} />}
    </div>
  );
}
