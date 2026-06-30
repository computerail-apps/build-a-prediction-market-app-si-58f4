export interface Market {
  id: string;
  title: string;
  category: string;
  yesProb: number;
  volume: number;
  closes: string;
  history: { t: string; p: number }[];
}
