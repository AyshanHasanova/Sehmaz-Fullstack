



// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate, Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getStockDetails, getStockCandles } from '../services/stockService';
// import { getAllArticles } from '../services/articleService';
// import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
// import { io } from 'socket.io-client'; // Socket bağlantısı üçün əlavə edildi

// const Learn: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const stockSymbol = searchParams.get('stock');
//   const [investment, setInvestment] = useState<number>(250);
  
//   // Canlı qiyməti saxlamaq üçün yeni state
//   const [livePrice, setLivePrice] = useState<number | null>(null);

//   // Səhm simvolu dəyişəndə həm səhifəni yuxarı qaldırırıq, həm də köhnə canlı qiyməti sıfırlayırıq
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setLivePrice(null); 
//   }, [stockSymbol]);

//   // WebSocket Dinləyicisi (Yalnız səhm analizi açıq olduqda işə düşür)
//   useEffect(() => {
//     if (!stockSymbol) return;

//     // Backend serverimizə qoşuluruq
//     const socket = io('http://localhost:3000');

//     // Serverdən gələn anlıq qiymətləri qəbul edirik
//     socket.on('stockPriceUpdate', (data: { symbol: string; price: number }) => {
//       // Əgər gələn data hazırda ekranda baxdığımız səhmə aiddirsə, qiyməti yeniləyirik
//       if (data.symbol === stockSymbol.toUpperCase()) {
//         setLivePrice(data.price);
//       }
//     });

//     // İstifadəçi səhifədən çıxanda və ya başqa səhmə keçəndə köhnə bağlantını qatır
//     return () => {
//       socket.disconnect();
//     };
//   }, [stockSymbol]);

//   // 1. Səhm detalları
//   const { data: stockRes, isLoading: detailsLoading } = useQuery({
//     queryKey: ['stockDetails', stockSymbol],
//     queryFn: () => getStockDetails(stockSymbol!),
//     enabled: !!stockSymbol,
//   });

//   // 2. Qrafik datası
//   const { data: candleRes, isLoading: candlesLoading } = useQuery({
//     queryKey: ['stockCandles', stockSymbol],
//     queryFn: () => getStockCandles(stockSymbol!),
//     enabled: !!stockSymbol,
//   });

//   // 3. MongoDB-dən məqalələri çəkən yeni sorğu
//   const { data: articlesRes, isLoading: articlesLoading } = useQuery({
//     queryKey: ['articles'],
//     queryFn: getAllArticles,
//     enabled: !stockSymbol,
//   });

//   const stock = stockRes?.data;
//   const articles = articlesRes?.data || [];

//   const chartData = candleRes?.data?.t.map((time: number, index: number) => ({
//     date: new Date(time * 1000).toLocaleDateString(),
//     price: candleRes.data.c[index]
//   })) || [];

//   const StockAnalysis = () => {
//     if (detailsLoading || candlesLoading) return (
//       <div className="flex flex-col items-center justify-center py-40 space-y-4">
//         <div className="w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full animate-spin"></div>
//         <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Data analiz edilir...</p>
//       </div>
//     );

//     if (!stock) return <GeneralArticle />;

//     // EKRANDA GÖSTƏRİLƏCƏK QIYMƏT: Əgər soketdən canlı məlumat gəlibsə onu, yoxdursa API-dan gələn ilkin qiyməti götürürük
//     const currentDisplayPrice = livePrice !== null ? livePrice : stock.currentPrice;

//     const isPositive = currentDisplayPrice >= stock.previousClose;
//     const priceChange = (currentDisplayPrice - stock.previousClose).toFixed(2);

//     return (
//       <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
//         <button
//           onClick={() => navigate('/explore')}
//           className="group flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px] transition-all"
//         >
//           <span className="group-hover:-translate-x-1 transition-transform">←</span> Bazara qayıt
//         </button>

//         <div className="flex flex-col xl:flex-row justify-between gap-8">
//           <div className="space-y-4">
//             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[3px] text-gray-400">
//               <span>${stock.symbol}</span>
//               {/* Canlı döyünən yaşıl nöqtə effekti */}
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span>Canlı Analiz</span>
//             </div>
//             <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900">{stock.symbol}</h1>
//             <div className="flex items-end gap-4">
//               {/* Qiymət bura bağlanıb və anlıq dəyişəcək */}
//               <span className="text-5xl font-black text-gray-900">${currentDisplayPrice.toFixed(2)}</span>
//               <div className={`px-4 py-2 rounded-2xl border font-black text-sm transition-colors duration-300 ${isPositive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
//                 {isPositive ? '▲' : '▼'} {Math.abs(Number(priceChange))}
//               </div>
//             </div>
//           </div>
//           <button onClick={() => navigate('/simulator')} className="h-fit px-10 py-5 bg-black text-white rounded-full font-black hover:scale-105 transition-all shadow-xl">
//             Simulyatorda yoxla
//           </button>
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-[40px] p-6 md:p-10 border border-gray-100 shadow-sm">
//           <div className="h-64 md:h-[400px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.2}/>
//                     <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <YAxis hide domain={['auto', 'auto']} />
//                 <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
//                 <Area type="monotone" dataKey="price" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth={4} fill="url(#colorPrice)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white rounded-[40px] p-8 border border-gray-100 space-y-6">
//             <h3 className="text-3xl font-black text-gray-900">Bazar Statistikası</h3>
//             <div className="space-y-4">
//               {[
//                 { label: 'Açılış', val: `$${stock.openPrice}` },
//                 { label: 'Günün Ən Yüksəyi', val: `$${stock.highPrice}` },
//                 { label: 'Günün Ən Aşağısı', val: `$${stock.lowPrice}` },
//                 { label: 'Əvvəlki Bağlanış', val: `$${stock.previousClose}` },
//               ].map((item) => (
//                 <div key={item.label} className="flex justify-between border-b border-gray-50 pb-3">
//                   <span className="text-xs uppercase text-gray-400 font-bold">{item.label}</span>
//                   <span className="font-black text-gray-900">{item.val}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bg-[#1a1a1a] rounded-[40px] p-8 text-white flex flex-col justify-between">
//              <div className="space-y-2">
//                 <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Məsləhət</span>
//                 <h3 className="text-3xl font-black">Bu səhmi necə dəyərləndirməli?</h3>
//                 <p className="text-gray-400 text-sm leading-relaxed mt-4">
//                   Qiymətlərin dəyişməsi normaldır. Əgər uzunmüddətli hədəfin varsa, günlük dalğalanmalara yox, şirkətin fundamental böyüməsinə fokuslanmalısan.
//                 </p>
//              </div>
//              <button onClick={() => navigate('/explore')} className="w-full py-4 bg-white text-black rounded-2xl font-black mt-8 hover:bg-emerald-400 transition-colors">Daha çoxunu kəşf et</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const GeneralArticle = () => (
//     <div className="max-w-4xl mx-auto py-12 animate-in fade-in duration-1000">
//       <div className="text-center space-y-6 mb-16">
//         <div className="text-[10px] font-black uppercase tracking-[4px] text-emerald-500">TƏLİM MƏRKƏZİ</div>
//         <h1 className="text-6xl md:text-[80px] font-black text-gray-900 tracking-tighter leading-none">Bilik Portfeli</h1>
//         <p className="text-gray-500 font-medium">Maliyyə və investisiya dünyasını addım-addım öyrənin.</p>
//       </div>

//       <div className="grid gap-4 mb-16">
//         {articlesLoading ? (
//           <div className="text-center py-10 font-black text-gray-300 uppercase tracking-widest text-xs">
//             Dərslər yüklənir...
//           </div>
//         ) : (
//           articles.map((article: any) => (
//             <Link 
//               key={article._id} 
//               to={`/learn/${article.slug}`}
//               className="group p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex justify-between items-center"
//             >
//               <div>
//                 <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
//                   {article.category}
//                 </span>
//                 <h3 className="text-xl font-black text-gray-900 mt-2">{article.title}</h3>
//               </div>
//               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-xl">
//                 →
//               </div>
//             </Link>
//           ))
//         )}
//       </div>

//       <div className="bg-black rounded-[60px] p-10 md:p-14 text-white space-y-10">
//         <div className="flex justify-between items-center">
//           <h3 className="text-3xl font-black italic text-emerald-400">Gəlir Simulyatoru</h3>
//           <span className="text-[10px] opacity-40 font-black uppercase tracking-widest">Məbləği sürüşdür</span>
//         </div>
//         <div className="flex justify-between text-5xl font-black tracking-tighter">
//           <span>${investment}</span>
//           <span className="text-emerald-400">→ ${(investment * 1.45).toFixed(0)}</span>
//         </div>
//         <input 
//           type="range" min="100" max="10000" step="100" value={investment}
//           onChange={(e) => setInvestment(parseInt(e.target.value))}
//           className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
//         />
//         <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center">İllik ortaq texnologiya indeksi (45%) əsasında hesablanıb.</p>
//       </div>
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 sm:px-6 font-inter antialiased">
//       <div className="max-w-6xl mx-auto">
//         {stockSymbol ? <StockAnalysis /> : <GeneralArticle />}
//       </div>
//     </main>
//   );
// };

// export default Learn;


import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link, useParams } from 'react-router-dom'; // useParams əlavə olundu
import { useQuery } from '@tanstack/react-query';
import { getStockDetails, getStockCandles } from '../services/stockService';
import { getAllArticles } from '../services/articleService';
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { io } from 'socket.io-client';

const Learn: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>(); // URL-dən məqalə slug-ını tuturuq
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stockSymbol = searchParams.get('stock');
  const [investment, setInvestment] = useState<number>(250);
  const [livePrice, setLivePrice] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLivePrice(null); 
  }, [stockSymbol, slug]);

  // WebSocket Dinləyicisi
  useEffect(() => {
    if (!stockSymbol) return;

    const socket = io('http://localhost:3000');
    socket.on('stockPriceUpdate', (data: { symbol: string; price: number }) => {
      if (data.symbol === stockSymbol.toUpperCase()) {
        setLivePrice(data.price);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [stockSymbol]);

  // 1. Səhm detalları
  const { data: stockRes, isLoading: detailsLoading } = useQuery({
    queryKey: ['stockDetails', stockSymbol],
    queryFn: () => getStockDetails(stockSymbol!),
    enabled: !!stockSymbol,
  });

  // 2. Qrafik datası
  const { data: candleRes, isLoading: candlesLoading } = useQuery({
    queryKey: ['stockCandles', stockSymbol],
    queryFn: () => getStockCandles(stockSymbol!),
    enabled: !!stockSymbol,
  });

  // 3. Bütün məqalələri çəkən sorğu
  const { data: articlesRes, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles,
  });

  const stock = stockRes?.data;
  const articles = articlesRes?.data || [];

  // Əgər URL-də slug varsa, həmin məqaləni massivdən tapırıq
  const currentArticle = articles.find((art: any) => art.slug === slug);

  const chartData = candleRes?.data?.t.map((time: number, index: number) => ({
    date: new Date(time * 1000).toLocaleDateString(),
    price: candleRes.data.c[index]
  })) || [];

  // ------------------------------------------
  // KOMPONENT 1: SƏHM ANALİZİ
  // ------------------------------------------
  const StockAnalysis = () => {
    if (detailsLoading || candlesLoading) return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4">
        <div className="w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Data analiz edilir...</p>
      </div>
    );

    if (!stock) return <GeneralArticle />;

    const currentDisplayPrice = livePrice !== null ? livePrice : stock.currentPrice;
    const isPositive = currentDisplayPrice >= stock.previousClose;
    const priceChange = (currentDisplayPrice - stock.previousClose).toFixed(2);

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button
          onClick={() => navigate('/learn')}
          className="group flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px] transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Təlim Mərkəzinə Qayıt
        </button>

        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[3px] text-gray-400">
              <span>${stock.symbol}</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Canlı Analiz</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900">{stock.symbol}</h1>
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-gray-900">${currentDisplayPrice.toFixed(2)}</span>
              <div className={`px-4 py-2 rounded-2xl border font-black text-sm transition-colors duration-300 ${isPositive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                {isPositive ? '▲' : '▼'} {Math.abs(Number(priceChange))}
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/simulator')} className="h-fit px-10 py-5 bg-black text-white rounded-full font-black hover:scale-105 transition-all shadow-xl">
            Simulyatorda yoxla
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[40px] p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="h-64 md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="price" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth={4} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 space-y-6">
            <h3 className="text-3xl font-black text-gray-900">Bazar Statistikası</h3>
            <div className="space-y-4">
              {[
                { label: 'Açılış', val: `$${stock.openPrice}` },
                { label: 'Günün Ən Yüksəyi', val: `$${stock.highPrice}` },
                { label: 'Günün Ən Aşağısı', val: `$${stock.lowPrice}` },
                { label: 'Əvvəlki Bağlanış', val: `$${stock.previousClose}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="text-xs uppercase text-gray-400 font-bold">{item.label}</span>
                  <span className="font-black text-gray-900">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-[40px] p-8 text-white flex flex-col justify-between">
             <div className="space-y-2">
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Məsləhət</span>
                <h3 className="text-3xl font-black">Bu səhmi necə dəyərləndirməli?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-4">
                  Qiymətlərin dəyişməsi normaldır. Əgər uzunmüddətli hədəfin varsa, günlük dalğalanmalara yox, şirkətin fundamental böyüməsinə fokuslanmalısan.
                </p>
             </div>
             <button onClick={() => navigate('/explore')} className="w-full py-4 bg-white text-black rounded-2xl font-black mt-8 hover:bg-emerald-400 transition-colors">Daha çoxunu kəşf et</button>
          </div>
        </div>
      </div>
    );
  };

  // ------------------------------------------
  // KOMPONENT 2: TƏK MƏQALƏNİN DETALI (Bərpa Olundu)
  // ------------------------------------------
  const ArticleDetail = () => {
    if (!currentArticle) {
      return (
        <div className="text-center py-20 font-black text-gray-400 uppercase tracking-widest text-xs">
          Məqalə tapılmadı. <Link to="/learn" className="text-emerald-500 underline">Geri qayıt</Link>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto py-12 space-y-8 animate-in fade-in duration-700">
        <button
          onClick={() => navigate('/learn')}
          className="group flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px] transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Bütün dərslərə qayıt
        </button>

        <div className="space-y-4">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentArticle.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
            {currentArticle.title}
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Yaradılma tarixi: {new Date(currentArticle.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Məqalə mətni bura basılır */}
        <div className="text-gray-800 text-lg leading-relaxed space-y-6 font-medium whitespace-pre-line">
          {currentArticle.content}
        </div>
      </div>
    );
  };

  // ------------------------------------------
  // KOMPONENT 3: ÜMUMİ MƏQALƏ SİYAHISI və SİMULYATOR
  // ------------------------------------------
  const GeneralArticle = () => (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-6 mb-16">
        <div className="text-[10px] font-black uppercase tracking-[4px] text-emerald-500">TƏLİM MƏRKƏZİ</div>
        <h1 className="text-6xl md:text-[80px] font-black text-gray-900 tracking-tighter leading-none">Bilik Portfeli</h1>
        <p className="text-gray-500 font-medium">Maliyyə və investisiya dünyasını addım-addım öyrənin.</p>
      </div>

      <div className="grid gap-4 mb-16">
        {articlesLoading ? (
          <div className="text-center py-10 font-black text-gray-300 uppercase tracking-widest text-xs">
            Dərslər yüklənir...
          </div>
        ) : (
          articles.map((article: any) => (
            <Link 
              key={article._id} 
              to={`/learn/${article.slug}`}
              className="group p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex justify-between items-center"
            >
              <div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">{article.title}</h3>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-xl">
                →
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Simulyator */}
      <div className="bg-black rounded-[60px] p-10 md:p-14 text-white space-y-10">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-black italic text-emerald-400">Gəlir Simulyatoru</h3>
          <span className="text-[10px] opacity-40 font-black uppercase tracking-widest">Məbləği sürüşdür</span>
        </div>
        <div className="flex justify-between text-5xl font-black tracking-tighter">
          <span>${investment}</span>
          <span className="text-emerald-400">→ ${(investment * 1.45).toFixed(0)}</span>
        </div>
        <input 
          type="range" min="100" max="10000" step="100" value={investment}
          onChange={(e) => setInvestment(parseInt(e.target.value))}
          className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center">İllik ortaq texnologiya indeksi (45%) əsasında hesablanıb.</p>
      </div>
    </div>
  );

  // ------------------------------------------
  // ASAS RENDERING MƏNTİQİ
  // ------------------------------------------
  return (
    <main className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 sm:px-6 font-inter antialiased">
      <div className="max-w-6xl mx-auto">
        {/* Əgər stock query-si varsa, analizi göstər. Əgər yox, URL-də slug varsa məqaləni aç. Heç biri yoxdursa ana siyahını göstər. */}
        {stockSymbol ? <StockAnalysis /> : slug ? <ArticleDetail /> : <GeneralArticle />}
      </div>
    </main>
  );
};

export default Learn;


