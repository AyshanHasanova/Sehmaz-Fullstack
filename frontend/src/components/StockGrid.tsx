// import { useNavigate } from 'react-router-dom';
// import { stockData } from '../data/stock';

// const StockGrid = () => {
//   const navigate = useNavigate();

//   // Şəkildəki ardıcıllıqla simvolları massivə yığırıq
//   const trendingSymbols = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'NFLX'];

//   return (
//     <section className="w-full py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter">
//       <div className="max-w-7xl mx-auto">
//         {/* Başlıq hissəsi */}
//         <div className="flex justify-between items-end mb-8">
//           <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
//             Bu gün hərəkətdə
//           </h2>
//           <button className="text-sm font-bold text-gray-400 hover:text-black transition-colors">
//             Hamısı →
//           </button>
//         </div>

//         {/* Kartlar Grid-i */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           {trendingSymbols.map((symbol) => {
//             const stock = stockData[symbol];
//             if (!stock) return null;

//             return (
//               <div
//                 key={symbol}
//                 onClick={() => navigate(`/learn?stock=${symbol}`)}
//                 className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
//               >
//                 {/* Kartın Üstü: Simvol və Faiz */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="space-y-1">
//                     <span className="text-[12px] font-black text-gray-900">${stock.symbol}</span>
//                     <p className="text-[10px] text-gray-400 font-medium">
//                       {/* Sektor məlumatı stockData-da yoxdursa default bir şey yaza bilərsən */}
//                       {stock.sector || "Texnologiya"}
//                     </p>
//                   </div>
                  
//                   <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${
//                     stock.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
//                   }`}>
//                     {stock.isPositive ? '▲' : '▼'} {stock.change}
//                   </div>
//                 </div>

//                 {/* Qiymət və Balaca Qrafik */}
//                 <div className="flex justify-between items-end">
//                   <span className="text-2xl font-black text-gray-900 tracking-tight">
//                     ${stock.price}
//                   </span>

//                   {/* SVG Sparkline (Mini Qrafik) */}
//                   <div className="w-16 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
//                     <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={`w-full h-full ${
//                       stock.isPositive ? 'text-emerald-400' : 'text-red-400'
//                     }`}>
//                       <path 
//                         d={stock.isPositive 
//                           ? "M0,15 Q20,18 40,12 T70,8 T100,2" 
//                           : "M0,5 Q20,2 40,8 T70,12 T100,18"} 
//                         fill="none" 
//                         stroke="currentColor" 
//                         strokeWidth="2" 
//                         strokeLinecap="round" 
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StockGrid;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../data/stock';

const StockGrid:React.FC = () => {
  const navigate = useNavigate();

  // Şəkildəki ardıcıllıqla göstəriləcək simvollar
  const trendingSymbols = [
    'AAPL', 'TSLA', 'MSFT', 'NVDA', 
    'GOOGL', 'AMZN', 'META', 'NFLX'
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 bg-[#fbf8f2] font-inter antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Üst Başlıq Hissəsi */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Bu gün hərəkətdə
          </h2>
          <button 
            onClick={() => navigate('/explore')}
            className="text-sm font-bold text-gray-400 hover:text-black transition-colors duration-300"
          >
            Hamısı →
          </button>
        </div>

        {/* Kartlar Grid-i */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {trendingSymbols.map((symbol) => {
            const stock = stockData[symbol];
            
            // Əgər data/stock.js-də bu simvol yoxdursa, boş qaytar
            if (!stock) return null;

            return (
              <div
                key={symbol}
                onClick={() => navigate(`/learn?stock=${symbol}`)}
                className="group bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Kartın Üstü: Simvol və Faiz */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="text-[13px] font-black text-gray-900 tracking-wide">
                      ${stock.symbol}
                    </span>
                    <p className="text-[11px] text-gray-400 font-medium tracking-tight">
                      {stock.sector}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black ${
                    stock.isPositive 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {stock.isPositive ? '▲' : '▼'} {stock.change}
                  </div>
                </div>

                {/* Qiymət və Balaca Qrafik */}
                <div className="flex justify-between items-end mt-auto">
                  <span className="text-3xl font-black text-gray-900 tracking-tighter">
                    ${stock.price}
                  </span>

                  {/* SVG Sparkline (Şəkildəki kimi dinamik dalğa) */}
                  <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    <svg 
                      viewBox="0 0 100 30" 
                      preserveAspectRatio="none" 
                      className={`w-full h-full ${stock.isPositive ? 'text-emerald-400' : 'text-red-400'}`}
                    >
                      <path 
                        d={stock.isPositive 
                          ? "M0,25 Q15,28 30,20 T60,15 T100,5" 
                          : "M0,5 Q20,2 40,15 T70,20 T100,28"} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
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