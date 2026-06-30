import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Market } from '../types';
import type { Trade } from '../App';
export default function MarketModal({ market: m, onClose, onTrade }: { market: Market; onClose: () => void; onTrade: (t: Trade) => void }) {
  const [side, setSide] = useState<'YES' | 'NO'>('YES');
  const [shares, setShares] = useState(10);
  const price = side === 'YES' ? m.yesProb : 100 - m.yesProb;
  const cost = ((price / 100) * shares).toFixed(2);
  const submit = () => { onTrade({ marketId: m.id, title: m.title, side, shares, price }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg leading-snug pr-4">{m.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={m.history}>
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, 'YES']} />
            <Line type="monotone" dataKey="p" stroke="#00d4aa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-2 mt-4 mb-4">
          {(['YES','NO'] as const).map(s => (
            <button key={s} onClick={() => setSide(s)}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition ${
                side === s ? (s === 'YES' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{s}</button>
          ))}
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1 block">Shares</label>
          <input type="number" min={1} max={1000} value={shares} onChange={e => setShares(+e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex justify-between text-sm mb-4 text-gray-400">
          <span>Price per share</span><span className="text-white font-semibold">{price}¢</span>
        </div>
        <div className="flex justify-between text-sm mb-5 text-gray-400">
          <span>Total cost</span><span className="text-white font-semibold">${cost}</span>
        </div>
        <button onClick={submit} className="w-full bg-brand text-gray-950 font-bold py-3 rounded-xl hover:opacity-90 transition">
          Buy {side} – ${cost}
        </button>
      </div>
    </div>
  );
}
