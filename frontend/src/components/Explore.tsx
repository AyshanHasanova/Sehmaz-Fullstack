import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllStocks } from '../services/stockService';

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('A-Z');
  
  // 1. Watchlist State-i (Yüklənəndə localStorage-dan oxuyur)
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('sehm_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Watchlist dəyişəndə yaddaşa yaz
  useEffect(() => {
    localStorage.setItem('sehm_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['stocks'],
    queryFn: getAllStocks,
    refetchInterval: 60000, 
  });

  const allStocks = apiResponse?.data || [];

  // Watchlist-ə əlavə/silmə funksiyası
  const toggleWatchlist = (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation(); // Karta klikləyib Detail-a getməyi dayandırır
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol) 
        : [...prev, symbol]
    );
  };

  const filteredStocks = useMemo(() => {
    if (!Array.isArray(allStocks)) return [];
    let result = [...allStocks];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(stock => {
        const name = stock?.name ? String(stock.name).toLowerCase() : "";
        const symbol = stock?.symbol ? String(stock.symbol).toLowerCase() : "";
        return name.includes(term) || symbol.includes(term);
      });
    }

    // "Seçilmişlər" filtri
    if (activeFilter === 'Seçilmişlər') {
      result = result.filter(s => watchlist.includes(s.symbol));
    }

    if (activeFilter === 'Ən çox qalxan') {
      result.sort((a, b) => (b.currentPrice - b.previousClose) - (a.currentPrice - a.previousClose));
    } else if (activeFilter === 'A-Z') {
      result.sort((a, b) => (a.symbol || "").localeCompare(b.symbol || ""));
    }

    return result;
  }, [searchTerm, activeFilter, allStocks, watchlist]);

  if (isLoading) return <div className="text-center py-20 font-black text-emerald-500">Yüklənir...</div>;

  return (
    <main className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 sm:px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">Səhmləri kəşf et</h1>
          <p className="text-gray-400 font-medium">{watchlist.length} səhm izlənilir.</p>
        </header>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <input 
            type="text"
            placeholder="Şirkət axtarın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white border border-gray-100 py-4 px-6 rounded-[20px] shadow-sm outline-none focus:border-emerald-500 transition-all"
          />

          <div className="flex bg-white p-1.5 rounded-[20px] border border-gray-100 shadow-sm overflow-x-auto">
            {['A-Z', 'Ən çox qalxan', 'Seçilmişlər'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-[15px] text-xs font-black transition-all ${
                  activeFilter === filter ? 'bg-[#fbf8f2] text-gray-900' : 'text-gray-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* STOCKS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => {
            const isFavorite = watchlist.includes(stock.symbol);
            const change = (stock.currentPrice - stock.previousClose).toFixed(2);
            const isPositive = parseFloat(change) >= 0;

            return (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/learn?stock=${stock.symbol}`)}
                className="group bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative"
              >
                {/* Watchlist Button */}
                <button 
                  onClick={(e) => toggleWatchlist(e, stock.symbol)}
                  className={`absolute top-6 right-6 p-2 rounded-full transition-all ${
                    isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-300 hover:text-gray-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <div>
                  <span className="text-[12px] font-black text-gray-900 block mb-1 uppercase tracking-wider">${stock.symbol}</span>
                  <h3 className="text-gray-400 text-[13px] font-medium">{stock.name}</h3>
                </div>

                <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                  <div>
                    <span className="text-[10px] font-black text-gray-300 uppercase block mb-1">Cari Qiymət</span>
                    <span className="text-2xl font-black text-gray-900">${stock.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className={`font-black text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(parseFloat(change))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Explore;