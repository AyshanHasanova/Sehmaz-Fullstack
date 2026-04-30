import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../data/stock';

const StockExplorer = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const navigate = useNavigate();
  const currentStock = stockData[selectedSymbol as keyof typeof stockData];
  const symbols = Object.keys(stockData);

  return (
    <section className="w-full py-8 md:py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter antialiased">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
        {/* SOL TEREF EYNI SAXLANILDI */}
        <div className="w-full lg:w-[320px] space-y-5">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] opacity-70">
              Bir simvol yazın
            </span>

            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 font-bold">$</div>
              <input
                type="text"
                readOnly
                value={selectedSymbol}
                className="w-full bg-white border border-gray-100 py-4 pl-10 pr-6 rounded-2xl text-sm font-black shadow-sm outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {symbols.map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => setSelectedSymbol(symbol)}
                  className={`px-4 py-2 rounded-full text-[11px] font-black transition-all border ${
                    selectedSymbol === symbol
                      ? 'bg-[#f1f1f1] border-gray-200 text-gray-900 shadow-sm'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANA KART KICILDI VE RESPONSIVE OLDU */}
        <div className="w-full lg:flex-1 max-w-[720px] xl:max-w-[780px]">
          <div className="bg-white rounded-[28px] md:rounded-[40px] p-5 sm:p-7 md:p-10 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.06)] border border-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[3px] block">
                  ${selectedSymbol} • MARKET DATA
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tighter break-words">
                  {currentStock.name}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm w-fit">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                CANLI
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-5 mb-6">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900 leading-none">
                ${currentStock.price}
              </span>

              <div className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 w-fit ${
                currentStock.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {currentStock.isPositive ? '▲' : '▼'} {currentStock.change}
              </div>
            </div>

            <div className="w-full h-24 sm:h-28 md:h-32 mb-8 opacity-30">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-emerald-500">
                <path d="M0,18 Q15,16 30,18 T50,12 T70,14 T100,4" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>

            <div className="bg-[#fbf8f2]/60 rounded-[24px] md:rounded-[28px] p-5 sm:p-6 md:p-7 mb-8 border border-[#f1ede4]/50">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg">AI İZAH</span>
                <div className="h-[1px] flex-1 bg-gray-200/50"></div>
              </div>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic tracking-tight">
                “{currentStock.description}”
              </p>
            </div>

            <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <button
                onClick={() => navigate(`/learn?stock=${selectedSymbol}`)}
                className="w-full sm:w-auto px-8 py-4 border-2 border-gray-100 rounded-2xl text-[11px] font-black tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 uppercase shadow-sm"
              >
                Daha çox öyrən →
              </button>

              <div className="flex flex-col sm:items-end">
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-[3px]">Sistem Durumu</span>
                <span className="text-[10px] font-bold text-gray-400 italic">Real-Time Data Active</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockExplorer;