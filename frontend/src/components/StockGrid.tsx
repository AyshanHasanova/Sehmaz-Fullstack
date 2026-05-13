import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllStocks } from '../services/stockService';

const StockGrid: React.FC = () => {
  const navigate = useNavigate();

  const { data: stocksRes, isLoading } = useQuery({
    queryKey: ['allStocks'],
    queryFn: getAllStocks,
  });

  const stocks = stocksRes?.data || [];

  if (isLoading) {
    return (
      <div className="w-full py-24 text-center font-black text-gray-300 animate-pulse">
        Gözləyin, bazarlar canlanır...
      </div>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter antialiased">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Bu gün hərəkətdə 📈
          </h2>
          <button 
            onClick={() => navigate('/explore')}
            className="text-sm font-bold text-gray-400 hover:text-black transition-colors"
          >
            Hamısı →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stocks.slice(0, 8).map((stock: any) => {
            const isPositive = stock.currentPrice >= stock.previousClose;
            const changePercent = stock.previousClose > 0 
                ? (((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100).toFixed(2)
                : "0.00";

            return (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/learn?stock=${stock.symbol}`)}
                className="group bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="text-[13px] font-black text-gray-900 tracking-wide uppercase">
                      ${stock.symbol}
                    </span>
                    <p className="text-[11px] text-gray-400 font-medium truncate w-24">
                      {stock.name || 'Şirkət Adı'}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black ${
                    isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(Number(changePercent))}%
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black text-gray-900 tracking-tighter">
                    ${stock.currentPrice.toLocaleString()}
                  </span>

                  <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={`w-full h-full ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      <path 
                        d={isPositive ? "M0,25 Q15,28 30,20 T60,15 T100,5" : "M0,5 Q20,2 40,15 T70,20 T100,28"} 
                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StockGrid;