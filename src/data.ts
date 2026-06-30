import type { Market } from './types';
const gen = (base: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    t: `Day ${i + 1}`,
    p: Math.min(99, Math.max(1, base + (Math.random() - 0.5) * 10))
  }));
export const MARKETS: Market[] = [
  { id: '1', title: 'Will BTC exceed $100k by end of 2025?', category: 'Crypto', yesProb: 62, volume: 1240000, closes: '2025-12-31', history: gen(62) },
  { id: '2', title: 'Will the Fed cut rates in Q3 2025?', category: 'Finance', yesProb: 45, volume: 890000, closes: '2025-09-30', history: gen(45) },
  { id: '3', title: 'Will GPT-5 launch before July 2025?', category: 'AI', yesProb: 71, volume: 2100000, closes: '2025-07-01', history: gen(71) },
  { id: '4', title: 'Will SpaceX land on Mars by 2030?', category: 'Space', yesProb: 28, volume: 560000, closes: '2030-01-01', history: gen(28) },
  { id: '5', title: 'Will the S&P 500 hit 6000 in 2025?', category: 'Finance', yesProb: 55, volume: 3400000, closes: '2025-12-31', history: gen(55) },
  { id: '6', title: 'Will a major AI regulation pass in the EU?', category: 'Policy', yesProb: 83, volume: 780000, closes: '2025-06-30', history: gen(83) }
];
