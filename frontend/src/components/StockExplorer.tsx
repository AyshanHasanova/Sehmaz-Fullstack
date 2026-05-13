// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getStockDetails, getAllStocks } from '../services/stockService';
// import toast from 'react-hot-toast';

// const StockExplorer = () => {
//   const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
//   const [searchInput, setSearchInput] = useState('');
//   const navigate = useNavigate();

//   const { data: allStocksRes } = useQuery({
//     queryKey: ['allStocks'],
//     queryFn: getAllStocks,
//   });

//   const { data: stockDetailsRes, isLoading, isError } = useQuery({
//     queryKey: ['stockDetails', selectedSymbol],
//     queryFn: () => getStockDetails(selectedSymbol),
//     refetchInterval: 30000,
//     retry: 1,
//     onError: () => {
//       toast.error("Simvol tapılmadı və ya API limitinə çatıldı.");
//     }
//   });

//   const currentStock = stockDetailsRes?.data;
//   const symbols = allStocksRes?.data?.map((s: any) => s.symbol).slice(0, 8) || 
//                   ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       setSelectedSymbol(searchInput.toUpperCase());
//       setSearchInput('');
//     }
//   };

//   // Köməkçi funksiya: BINANCE:BTC -> BTC çevirmək üçün
//   const formatSymbol = (symbol: string) => {
//     return symbol.includes(':') ? symbol.split(':').pop() : symbol;
//   };

//   // Köməkçi funksiya: Uzun adları qısaltmaq üçün
//   const truncateName = (name: string, limit: number = 22) => {
//     return name.length > limit ? name.substring(0, limit) + "..." : name;
//   };

//   const isPositive = currentStock ? currentStock.currentPrice >= currentStock.previousClose : true;
//   const priceChange = currentStock 
//     ? (currentStock.currentPrice - currentStock.previousClose).toFixed(2) 
//     : "0.00";
//   const percentageChange = currentStock && currentStock.previousClose > 0
//     ? (((currentStock.currentPrice - currentStock.previousClose) / currentStock.previousClose) * 100).toFixed(2)
//     : "0.00";

//   return (
//     <section className="w-full py-8 md:py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter antialiased min-h-[80vh]">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
        
//         {/* SOL TƏRƏF: SEÇİM VƏ AXTARIŞ PANELİ */}
//         <div className="w-full lg:w-[340px] space-y-8">
//           <div className="space-y-4">
//             <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] opacity-70">
//               Yeni Simvol Axtar
//             </span>

//             <form onSubmit={handleSearch} className="relative group">
//               <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 font-bold">$</div>
//               <input
//                 type="text"
//                 placeholder="Məs: NVDA, BABA..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 className="w-full bg-white border border-gray-100 py-4 pl-10 pr-20 rounded-2xl text-sm font-black shadow-sm outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
//               />
//               <button 
//                 type="submit"
//                 className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white rounded-xl text-[10px] font-black hover:bg-gray-800 transition-colors"
//               >
//                 ARA
//               </button>
//             </form>

//             <div className="space-y-3">
//               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] opacity-70">
//                 Trenddə olanlar
//               </span>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                 {symbols.map((symbol: string) => (
//                   <button
//                     key={symbol}
//                     onClick={() => setSelectedSymbol(symbol)}
//                     className={`px-2 py-3 rounded-xl text-[10px] font-black transition-all border truncate whitespace-nowrap ${
//                       selectedSymbol === symbol
//                         ? 'bg-black border-black text-white shadow-lg'
//                         : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
//                     }`}
//                     title={symbol}
//                   >
//                     {formatSymbol(symbol)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SAĞ TƏRƏF: REAL MƏLUMAT KARTI */}
//         <div className="w-full lg:flex-1 max-w-[760px]">
//           <div className={`bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-white transition-all duration-500 ${isLoading ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-10">
//               <div className="space-y-2 min-w-0">
//                 <div className="flex items-center gap-3">
//                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-[3px]">
//                       ${formatSymbol(selectedSymbol)} • MARKET DATA
//                     </span>
//                     {isError && <span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Xəta</span>}
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter break-words leading-tight" title={currentStock?.name}>
//                   {currentStock?.name 
//                     ? truncateName(currentStock.name) 
//                     : (isLoading ? "Axtarılır..." : `${formatSymbol(selectedSymbol)} Korporasiyası`)}
//                 </h2>
//               </div>

//               <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm w-fit shrink-0">
//                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
//                 SİSTEM AKTİVDİR
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-10">
//               <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-gray-900 leading-none">
//                 ${currentStock?.currentPrice ? currentStock.currentPrice.toLocaleString() : "---"}
//               </span>

//               <div className={`px-4 py-2 rounded-2xl text-sm font-black flex items-center gap-2 w-fit mb-2 ${
//                 isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
//               }`}>
//                 <span className="text-lg">{isPositive ? '▲' : '▼'}</span>
//                 <span>{priceChange} ({percentageChange}%)</span>
//               </div>
//             </div>

//             <div className={`w-full h-32 mb-12 opacity-40 transition-colors duration-700 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
//               <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
//                 <path 
//                   d={isPositive 
//                     ? "M0,18 C15,16 25,20 40,12 S70,5 100,2" 
//                     : "M0,2 C15,4 25,2 40,12 S70,18 100,19"} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   strokeWidth="1.2" 
//                   strokeLinecap="round" 
//                 />
//               </svg>
//             </div>

//             <div className="bg-[#fbf8f2]/80 rounded-[32px] p-6 sm:p-8 mb-10 border border-[#f1ede4]/60">
//               <div className="flex items-center gap-3 mb-5">
//                 <span className="px-3 py-1 bg-black text-white text-[9px] font-black rounded-lg uppercase tracking-wider">Şirkət Profili</span>
//                 <div className="h-[1px] flex-1 bg-gray-200/50"></div>
//               </div>
//               <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-medium italic tracking-tight">
//                 “{currentStock?.description || (isLoading ? "Məlumatlar analiz edilir..." : `Dünya birjasında ticarət edilən ${formatSymbol(selectedSymbol)} səhmi haqqında real-time məlumatlar.`)}”
//               </p>
//             </div>

//             <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4">
//               <button
//                 onClick={() => navigate(`/simulator?stock=${selectedSymbol}`)}
//                 className="group relative w-full sm:w-auto px-10 py-5 bg-black text-white rounded-[20px] text-[12px] font-black tracking-[2px] uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
//               >
//                 <span className="relative z-10">Zaman Maşınında Yoxla →</span>
//               </button>

//               <div className="flex flex-col sm:items-end text-right">
//                 <span className="text-[9px] font-black text-gray-300 uppercase tracking-[3px] mb-1">Məlumat Mənbəyi</span>
//                 <span className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
//                     Finnhub Real-Time
//                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
//                 </span>
//               </div>
//             </footer>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StockExplorer;

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStockDetails, getAllStocks } from '../services/stockService';
import toast from 'react-hot-toast';

// Tip təhlükəsizliyi üçün interfeyslər
interface StockData {
  name: string;
  currentPrice: number;
  previousClose: number;
  description?: string;
  symbol: string;
}

const StockExplorer = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // 1. Bütün səhmləri gətirən query
  const { data: allStocksRes } = useQuery({
    queryKey: ['allStocks'],
    queryFn: getAllStocks,
  });

  // 2. Seçilmiş səhmin detallarını gətirən query
  const { data: stockDetailsRes, isLoading, isError } = useQuery({
    queryKey: ['stockDetails', selectedSymbol],
    queryFn: () => getStockDetails(selectedSymbol),
    refetchInterval: 30000,
    retry: 1,
  });

  // Xətanı tutmaq üçün useEffect (TanStack Query v5 uyğunluğu)
  useEffect(() => {
    if (isError) {
      toast.error("Simvol tapılmadı və ya API limitinə çatıldı.");
    }
  }, [isError]);

  const currentStock = stockDetailsRes?.data as StockData | undefined;

  // Trend simvolların optimallaşdırılmış siyahısı
  const symbols = useMemo(() => {
    return allStocksRes?.data?.map((s: any) => s.symbol).slice(0, 8) || 
           ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'];
  }, [allStocksRes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSelectedSymbol(searchInput.toUpperCase());
      setSearchInput('');
    }
  };

  // Köməkçi funksiyalar
  const formatSymbol = (symbol: string) => symbol.includes(':') ? symbol.split(':').pop() : symbol;
  
  const truncateName = (name: string, limit: number = 22) => 
    name.length > limit ? name.substring(0, limit) + "..." : name;

  // Hesablamalar (NaN və undefined qoruması ilə)
  const currentPrice = currentStock?.currentPrice || 0;
  const prevClose = currentStock?.previousClose || 0;
  
  const isPositive = currentPrice >= prevClose;
  const priceChange = (currentPrice - prevClose).toFixed(2);
  const percentageChange = prevClose > 0 
    ? (((currentPrice - prevClose) / prevClose) * 100).toFixed(2) 
    : "0.00";

  return (
    <section className="w-full py-8 md:py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter antialiased min-h-[80vh]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
        
        {/* SOL TƏRƏF: SEÇİM VƏ AXTARIŞ PANELİ */}
        <div className="w-full lg:w-[340px] space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] opacity-70">
              Yeni Simvol Axtar
            </span>

            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 font-bold">$</div>
              <input
                type="text"
                placeholder="Məs: NVDA, BABA..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white border border-gray-100 py-4 pl-10 pr-20 rounded-2xl text-sm font-black shadow-sm outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white rounded-xl text-[10px] font-black hover:bg-gray-800 transition-colors"
              >
                ARA
              </button>
            </form>

            <div className="space-y-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] opacity-70">
                Trenddə olanlar
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {symbols.map((symbol: string) => (
                  <button
                    key={symbol}
                    onClick={() => setSelectedSymbol(symbol)}
                    className={`px-2 py-3 rounded-xl text-[10px] font-black transition-all border truncate whitespace-nowrap ${
                      selectedSymbol === symbol
                        ? 'bg-black border-black text-white shadow-lg'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                    }`}
                    title={symbol}
                  >
                    {formatSymbol(symbol)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ TƏRƏF: REAL MƏLUMAT KARTI */}
        <div className="w-full lg:flex-1 max-w-[760px]">
          <div className={`bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-white transition-all duration-500 ${isLoading ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-10">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[3px]">
                      ${formatSymbol(selectedSymbol)} • MARKET DATA
                    </span>
                    {isError && <span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Xəta</span>}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter break-words leading-tight" title={currentStock?.name}>
                  {currentStock?.name 
                    ? truncateName(currentStock.name) 
                    : (isLoading ? "Axtarılır..." : `${formatSymbol(selectedSymbol)} Korporasiyası`)}
                </h2>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm w-fit shrink-0">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                SİSTEM AKTİVDİR
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-10">
              <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-gray-900 leading-none">
                ${currentPrice > 0 ? currentPrice.toLocaleString() : "---"}
              </span>

              <div className={`px-4 py-2 rounded-2xl text-sm font-black flex items-center gap-2 w-fit mb-2 ${
                isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                <span className="text-lg">{isPositive ? '▲' : '▼'}</span>
                <span>{priceChange} ({percentageChange}%)</span>
              </div>
            </div>

            {/* Vizual Qrafik İllüstrasiyası */}
            <div className={`w-full h-32 mb-12 opacity-40 transition-colors duration-700 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                <path 
                  d={isPositive 
                    ? "M0,18 C15,16 25,20 40,12 S70,5 100,2" 
                    : "M0,2 C15,4 25,2 40,12 S70,18 100,19"} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            <div className="bg-[#fbf8f2]/80 rounded-[32px] p-6 sm:p-8 mb-10 border border-[#f1ede4]/60">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-black text-white text-[9px] font-black rounded-lg uppercase tracking-wider">Şirkət Profili</span>
                <div className="h-[1px] flex-1 bg-gray-200/50"></div>
              </div>
              <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-medium italic tracking-tight">
                “{currentStock?.description || (isLoading ? "Məlumatlar analiz edilir..." : `Dünya birjasında ticarət edilən ${formatSymbol(selectedSymbol)} səhmi haqqında real-time məlumatlar.`)}”
              </p>
            </div>

            <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4">
              <button
                onClick={() => navigate(`/simulator?stock=${selectedSymbol}`)}
                className="group relative w-full sm:w-auto px-10 py-5 bg-black text-white rounded-[20px] text-[12px] font-black tracking-[2px] uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span className="relative z-10">Zaman Maşınında Yoxla →</span>
              </button>

              <div className="flex flex-col sm:items-end text-right">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-[3px] mb-1">Məlumat Mənbəyi</span>
                <span className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
                    Finnhub Real-Time
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockExplorer;