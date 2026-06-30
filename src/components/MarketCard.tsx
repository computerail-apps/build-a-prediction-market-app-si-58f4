import type { Market } from '../types';
export default function MarketCard({ market: m, onClick }: { market: Market; onClick: () => void }) {
  const yes = Math.round(m.yesProb);
  return (
    <div onClick={onClick} className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-brand/50 transition group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{m.category}</span>
        <span className="text-xs text-gray-500">Closes {m.closes}</span>
      </div>
      <h3 className="font-semibold text-sm mb-4 leading-snug group-hover:text-brand transition">{m.title}</h3>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-green-400 font-bold">YES {yes}¢</span>
          <span className="text-red-400 font-bold">NO {100 - yes}¢</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-brand rounded-full" style={{ width: `${yes}%` }} />
        </div>
      </div>
      <div className="text-xs text-gray-500">${(m.volume / 1e6).toFixed(2)}M vol</div>
    </div>
  );
}
