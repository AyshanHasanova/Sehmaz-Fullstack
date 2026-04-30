import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. Tip Təyinləri (TypeScript xətalarını kəsmək üçün)
interface StockDetail {
  symbol: string;
  name: string;
  price: number;
  description: string;
}

// Əgər səndə stockData faylı yoxdursa, test üçün bura əlavə edirəm
const stockData: Record<string, StockDetail> = {
  AAPL: { symbol: 'AAPL', name: 'Apple Inc.', price: 190.50, description: 'iPhone və texnologiya nəhəngi.' },
  TSLA: { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.20, description: 'Elektrikli avtomobil istehsalçısı.' },
  NVDA: { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 850.10, description: 'Süni intellekt çipləri lideri.' },
  MSFT: { symbol: 'MSFT', name: 'Microsoft', price: 410.30, description: 'Proqram təminatı və bulut texnologiyaları.' },
  GOOGL: { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 150.10, description: 'Google və YouTube-un ana şirkəti.' },
  AMZN: { symbol: 'AMZN', name: 'Amazon.com', price: 180.40, description: 'E-ticarət və AWS texnologiyaları.' },
  META: { symbol: 'META', name: 'Meta Platforms', price: 490.20, description: 'Facebook və Instagram.' },
  NFLX: { symbol: 'NFLX', name: 'Netflix', price: 610.50, description: 'Onlayn film və serial platforması.' }
};

const Simulator = () => {
  const [searchParams] = useSearchParams();
  const initialStock = searchParams.get('stock') || 'AAPL';
  
  // States
  const [selectedStock, setSelectedStock] = useState<string>(initialStock);
  const [amount, setAmount] = useState<number>(1000);
  const [startDate, setStartDate] = useState<string>('2020-02-01');

  // URL-dən gələn stock dəyişərsə state-i yenilə
  useEffect(() => {
    if (searchParams.get('stock')) {
      setSelectedStock(searchParams.get('stock')!);
    }
  }, [searchParams]);

  // Simulyasiya Məntiqi
  const getMultiplier = (sym: string) => {
    const values: Record<string, number> = { 
      NVDA: 12.42, TSLA: 8.5, AAPL: 3.04, MSFT: 2.8, 
      GOOGL: 2.1, AMZN: 1.9, META: 4.2, NFLX: 1.5 
    };
    return values[sym] || 1.45;
  };

  const multiplier = getMultiplier(selectedStock);
  const currentVal = Math.round(amount * multiplier);
  const profit = currentVal - amount;
  const currentPrice = stockData[selectedStock]?.price || 100;
  const shareCount = (amount / (currentPrice * 0.7)).toFixed(2);

  const symbols = Object.keys(stockData);

  return (
    <div className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="space-y-4 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Əgər investisiya etsəydim?
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium">
            Keçmişdə bir məbləğ qoysaydınız, bu gün nə qədər olardı? Sürgü çubuğu və tarixi seçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-4 bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm space-y-10">
            
            {/* STOCKS */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Şirkət</span>
              <div className="grid grid-cols-4 gap-2">
                {symbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setSelectedStock(sym)}
                    className={`py-3 rounded-xl text-[11px] font-black transition-all ${
                      selectedStock === sym 
                      ? 'bg-black text-white' 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* AMOUNT */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Məbləğ</span>
                <span className="text-3xl font-black text-gray-900">${amount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-300 uppercase">
                <span>$50</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* DATE */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Başlanğıc Tarixi</span>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <div className="flex gap-2 pt-2">
                {['1y', '3y', '5y', '10y'].map(t => (
                  <button key={t} className="flex-1 py-2 bg-gray-50 rounded-xl text-[10px] font-black text-gray-400 hover:bg-gray-100 uppercase transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="lg:col-span-8 bg-[#f2f9f5] rounded-[40px] border border-emerald-100 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[3px]">Bugünkü Dəyər</span>
                  <div className="text-6xl md:text-8xl font-black text-gray-900 leading-none">
                    ${currentVal.toLocaleString()}
                  </div>
                </div>
                <div className="md:text-right flex flex-col items-start md:items-end gap-1">
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-full font-black text-sm">
                    ▲ +{((multiplier - 1) * 100).toFixed(2)}%
                  </div>
                  <div className="text-emerald-700/50 font-bold text-sm uppercase tracking-tighter mt-2">
                    {multiplier}x dəfə artıb
                  </div>
                </div>
              </div>

              {/* STATS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-emerald-100/50 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2 tracking-widest">Qoyduğunuz</span>
                  <span className="text-2xl font-black text-gray-900">${amount.toLocaleString()}</span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-emerald-100/50 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2 tracking-widest">Səhm sayı</span>
                  <span className="text-2xl font-black text-gray-900">{shareCount}</span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-emerald-100/50 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2 tracking-widest">Mənfəət</span>
                  <span className="text-2xl font-black text-emerald-600">+${profit.toLocaleString()}</span>
                </div>
              </div>

              {/* CHART AREA */}
              <div className="h-40 md:h-56 w-full mt-10 relative">
                <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible drop-shadow-xl">
                  <path 
                    d="M0,100 Q50,90 100,80 T200,60 T300,70 T400,20" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M0,100 Q50,90 100,80 T200,60 T300,70 T400,20 V120 H0 Z" 
                    fill="url(#emeraldGradient)" 
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <p className="relative z-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[4px] mt-8">
              Bu, keçmiş məlumatlardır. Gələcəyə zəmanət vermir.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Simulator;