export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  marketCap?: string;
}

export interface StockHistory {
  date: string;
  price: number;
}

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.45,
    change: 2.34,
    changePercent: 1.33,
    volume: 58234567,
    open: 176.20,
    high: 179.10,
    low: 175.80,
    previousClose: 176.11,
    marketCap: "2.8T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.67,
    change: 3.21,
    changePercent: 2.30,
    volume: 28456123,
    open: 139.50,
    high: 143.20,
    low: 139.10,
    previousClose: 139.46,
    marketCap: "1.7T",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 412.34,
    change: 5.67,
    changePercent: 1.39,
    volume: 32145678,
    open: 407.00,
    high: 413.50,
    low: 406.20,
    previousClose: 406.67,
    marketCap: "3.1T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 245.89,
    change: -4.32,
    changePercent: -1.73,
    volume: 125678901,
    open: 250.50,
    high: 252.10,
    low: 244.30,
    previousClose: 250.21,
    marketCap: "780B",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.23,
    change: 2.89,
    changePercent: 1.65,
    volume: 45678912,
    open: 175.50,
    high: 179.00,
    low: 175.10,
    previousClose: 175.34,
    marketCap: "1.8T",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.43,
    change: 12.56,
    changePercent: 1.45,
    volume: 38234567,
    open: 863.00,
    high: 878.90,
    low: 860.20,
    previousClose: 862.87,
    marketCap: "2.2T",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 487.12,
    change: -3.45,
    changePercent: -0.70,
    volume: 18234567,
    open: 490.80,
    high: 492.30,
    low: 485.60,
    previousClose: 490.57,
    marketCap: "1.2T",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 612.34,
    change: 8.90,
    changePercent: 1.47,
    volume: 5234567,
    open: 603.50,
    high: 614.20,
    low: 602.80,
    previousClose: 603.44,
    marketCap: "265B",
  },
];

export const generateStockHistory = (currentPrice: number): StockHistory[] => {
  const history: StockHistory[] = [];
  const days = 30;
  let price = currentPrice * 0.92; // Start 8% lower than current

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some randomness to make it realistic
    const change = (Math.random() - 0.48) * (currentPrice * 0.02);
    price = Math.max(price + change, currentPrice * 0.85);
    
    history.push({
      date: date.toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
    });
  }

  // Ensure last price matches current price
  history[history.length - 1].price = currentPrice;

  return history;
};
