


// import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { simulateInvestment } from '../services/stockService';
// import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

// const Simulator = () => {
//   const [searchParams] = useSearchParams();
//   const initialStock = searchParams.get('stock') || 'AAPL';

//   const [selectedStock, setSelectedStock] = useState<string>(initialStock);
//   const [amount, setAmount] = useState<number>(1000);
//   const [startDate, setStartDate] = useState<string>('2024-01-02');

//   const { data: simRes, isLoading, isError, error } = useQuery({
//     queryKey: ['simulation', selectedStock, amount, startDate],
//     queryFn: () => simulateInvestment(selectedStock, amount, startDate),
//     enabled: !!startDate && !!selectedStock && !!amount,
//     retry: 1,
//   });

//   // ✅ FIX: correct data access
//   const result = simRes?.data;

//   // ✅ FIX: safe calculations
//   const investmentAmount = Number(result?.investmentAmount) || 0;
//   const profit = Number(result?.profit) || 0;
//   const percentage = Number(result?.profitPercentage) || 0;
//   const historicalPrice = Number(result?.historicalPrice) || 0;
//   const currentPrice = Number(result?.currentPrice) || 0;

//   const currentVal = investmentAmount + profit;
//   const shareCount = result?.stockCount || 0;

//   const isProfit = profit >= 0;

//   const symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'];

//   const chartData = [
//     { name: 'O vaxt', price: historicalPrice },
//     { name: 'Bugün', price: currentPrice }
//   ];

//   const errorMessage =
//     (error as any)?.response?.data?.message || 'Məlumat tapılmadı';

//   return (
//     <div className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 font-sans antialiased">
//       <div className="max-w-6xl mx-auto space-y-12">

//         {/* HEADER */}
//         <div className="space-y-4 text-left">
//           <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter">
//             Zaman Maşını <span className="text-emerald-500 italic">.</span>
//           </h1>
//           <p className="text-gray-500 text-lg md:text-xl max-w-2xl">
//             Keçmişdə investisiya etsəydiniz, bugün nə qədər qazanardınız?
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* LEFT PANEL */}
//           <div className="lg:col-span-4 bg-white rounded-[40px] p-8 border border-gray-100 space-y-10">

//             {/* STOCK SELECT */}
//             <div className="space-y-4">
//               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                 Səhm Seçimi
//               </span>

//               <div className="grid grid-cols-4 gap-2">
//                 {symbols.map((sym) => (
//                   <button
//                     key={sym}
//                     onClick={() => setSelectedStock(sym)}
//                     className={`py-3 rounded-2xl text-[11px] font-black ${
//                       selectedStock === sym
//                         ? 'bg-black text-white'
//                         : 'bg-gray-50 text-gray-400'
//                     }`}
//                   >
//                     {sym}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* AMOUNT */}
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="text-[10px] font-black text-gray-400 uppercase">
//                   İnvestisiya
//                 </span>
//                 <span className="text-2xl font-black">${amount}</span>
//               </div>

//               <input
//                 type="range"
//                 min="100"
//                 max="10000"
//                 step="100"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>

//             {/* DATE */}
//             <div className="space-y-4">
//               <span className="text-[10px] font-black text-gray-400 uppercase">
//                 Nə Zaman?
//               </span>

//               <input
//                 type="date"
//                 value={startDate}
//                 max={new Date().toISOString().split('T')[0]}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full p-4 bg-gray-50 rounded-2xl font-black"
//               />
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div
//             className={`lg:col-span-8 rounded-[48px] border-4 p-8 md:p-12 ${
//               isLoading
//                 ? 'bg-gray-50 border-gray-100'
//                 : isError
//                 ? 'bg-red-50 border-red-100'
//                 : isProfit
//                 ? 'bg-[#f2f9f5] border-emerald-100'
//                 : 'bg-red-50 border-red-100'
//             }`}
//           >
//             {/* LOADING */}
//             {isLoading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
//               </div>
//             ) : isError ? (
//               <div className="text-center space-y-6">
//                 <h2 className="text-2xl font-black text-red-700">
//                   Xəta baş verdi
//                 </h2>
//                 <p className="text-red-500">{errorMessage}</p>
//               </div>
//             ) : (
//               <>
//                 {/* TOP INFO */}
//                 <div className="flex justify-between mb-10">
//                   <div>
//                     <p className="text-xs font-black text-gray-500 uppercase">
//                       Portfel
//                     </p>
//                     <h1 className="text-5xl font-black">
//                       ${currentVal.toLocaleString()}
//                     </h1>
//                   </div>

//                   <div
//                     className={`text-xl font-black px-4 py-2 rounded-xl text-white ${
//                       isProfit ? 'bg-emerald-500' : 'bg-red-500'
//                     }`}
//                   >
//                     {isProfit ? '▲' : '▼'} {Math.abs(percentage)}%
//                   </div>
//                 </div>

//                 {/* GRID */}
//                 <div className="grid md:grid-cols-3 gap-6 mb-10">
//                   <div className="bg-white p-6 rounded-2xl">
//                     <p className="text-xs text-gray-400">Keçmiş qiymət</p>
//                     <p className="text-2xl font-black">${historicalPrice}</p>
//                   </div>

//                   <div className="bg-white p-6 rounded-2xl">
//                     <p className="text-xs text-gray-400">Səhm sayı</p>
//                     <p className="text-2xl font-black">{shareCount}</p>
//                   </div>

//                   <div className="bg-white p-6 rounded-2xl">
//                     <p className="text-xs text-gray-400">Gəlir</p>
//                     <p
//                       className={`text-2xl font-black ${
//                         isProfit ? 'text-emerald-600' : 'text-red-600'
//                       }`}
//                     >
//                       ${profit.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* CHART FIXED */}
//                 <div className="h-[220px] w-full">
//                   <ResponsiveContainer width="100%" height={220}>
//                     <AreaChart data={chartData}>
//                       <Tooltip />
//                       <Area
//                         type="monotone"
//                         dataKey="price"
//                         stroke={isProfit ? '#10b981' : '#ef4444'}
//                         fill={isProfit ? '#10b981' : '#ef4444'}
//                         fillOpacity={0.2}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Simulator;


import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { simulateInvestment } from '../services/stockService';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Simulator = () => {
  const [searchParams] = useSearchParams();
  const initialStock = searchParams.get('stock') || 'AAPL';

  const [selectedStock, setSelectedStock] = useState<string>(initialStock);
  const [amount, setAmount] = useState<number>(1000);
  const [startDate, setStartDate] = useState<string>('2024-01-02');

  const { data: simRes, isLoading, isError, error } = useQuery({
    queryKey: ['simulation', selectedStock, amount, startDate],
    queryFn: () => simulateInvestment(selectedStock, amount, startDate),
    enabled: !!startDate && !!selectedStock && !!amount,
    retry: 1,
  });

  const result = simRes?.data;
  const investmentAmount = Number(result?.investmentAmount) || 0;
  const profit = Number(result?.profit) || 0;
  const percentage = Number(result?.profitPercentage) || 0;
  const historicalPrice = Number(result?.historicalPrice) || 0;
  const currentPrice = Number(result?.currentPrice) || 0;

  const currentVal = investmentAmount + profit;
  const shareCount = result?.stockCount || 0;
  const isProfit = profit >= 0;

  const symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'];

  const chartData = [
    { name: 'O vaxt', price: historicalPrice },
    { name: 'Bugün', price: currentPrice }
  ];

  const errorMessage = (error as any)?.response?.data?.message || 'Məlumat tapılmadı';

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-12 px-4 sm:px-6 md:pt-24 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">

        {/* HEADER SECTION */}
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            Zaman <span className="text-emerald-500">Maşını</span>
          </h1>
          <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto md:mx-0">
            Keçmişdə investisiya etsəydiniz, bu gün nə qədər qazanardınız?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

          {/* CONTROL PANEL (LEFT) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8 order-2 lg:order-1">
            
            {/* STOCK SELECTOR */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                Səhm Seçimi
              </label>
              <div className="grid grid-cols-4 gap-2">
                {symbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setSelectedStock(sym)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                      selectedStock === sym
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* AMOUNT SLIDER */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">İnvestisiya</span>
                <span className="text-2xl font-black text-gray-900">${amount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* DATE PICKER */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Nə Zaman?</label>
              <input
                type="date"
                value={startDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* DISPLAY PANEL (RIGHT) */}
          <div
            className={`lg:col-span-8 rounded-[32px] md:rounded-[48px] border-b-8 p-6 md:p-12 transition-all duration-500 order-1 lg:order-2 ${
              isLoading ? 'bg-white border-gray-100' :
              isError || !isProfit ? 'bg-red-50/50 border-red-200' : 'bg-emerald-50/50 border-emerald-200'
            }`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
                <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-emerald-600 font-medium animate-pulse">Hesablanır...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl">⚠️</div>
                <h2 className="text-xl font-black text-red-700">Məlumat gətirilərkən xəta</h2>
                <p className="text-red-500 opacity-80">{errorMessage}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* PORTFOLIO SUMMARY */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Cari Dəyər</p>
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                      ${currentVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-lg ${
                    isProfit ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {isProfit ? '▲' : '▼'} {Math.abs(percentage).toFixed(2)}%
                  </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Alış Qiyməti</p>
                    <p className="text-xl font-black text-gray-800">${historicalPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Səhm Sayı</p>
                    <p className="text-xl font-black text-gray-800">{shareCount.toFixed(4)}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Xalis Gəlir</p>
                    <p className={`text-xl font-black ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isProfit ? '+' : ''}${profit.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* VISUAL CHART */}
                <div className="h-[250px] w-full pt-4 bg-white/40 rounded-3xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isProfit ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={isProfit ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={isProfit ? '#10b981' : '#ef4444'}
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
