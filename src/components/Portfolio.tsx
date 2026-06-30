import type { Trade } from '../App';
export default function Portfolio({ trades }: { trades: Trade[] }) {
  if (!trades.length) return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-5xl mb-4">📊</div>
      <p className="text-lg">No trades yet. Browse markets to get started!</p>
    </div>
  );
  const total = trades.reduce((s, t) => s + (t.price / 100) * t.shares, 0);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Total Invested</div>
          <div className="text-2xl font-bold text-brand">${total.toFixed(2)}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Open Positions</div>
          <div className="text-2xl font-bold">{trades.length}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Markets</div>
          <div className="text-2xl font-bold">{new Set(trades.map(t => t.marketId)).size}</div>
        </div>
      </div>
      <div className="space-y-3">
        {trades.map((t, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1">{t.title}</div>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  t.side === 'YES' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{t.side}</span>
                <span className="text-gray-400">{t.shares} shares @ {t.price}¢</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">${((t.price / 100) * t.shares).toFixed(2)}</div>
              <div className="text-xs text-gray-500">invested</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
