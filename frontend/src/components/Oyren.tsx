import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStockDetails, getStockCandles } from '../services/stockService';
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

const Learn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stockSymbol = searchParams.get('stock');
  const [investment, setInvestment] = useState(250);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const stock = stockRes?.data;
  const chartData = candleRes?.data?.t.map((time: number, index: number) => ({
    date: new Date(time * 1000).toLocaleDateString(),
    price: candleRes.data.c[index]
  })) || [];

  const StockAnalysis = () => {
    if (detailsLoading || candlesLoading) return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4">
        <div className="w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Data analiz edilir...</p>
      </div>
    );

    if (!stock) return <GeneralArticle />;

    const isPositive = stock.currentPrice >= stock.previousClose;
    const priceChange = (stock.currentPrice - stock.previousClose).toFixed(2);

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button
          onClick={() => navigate('/explore')}
          className="group flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px] transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Bazara qayıt
        </button>

        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[3px] text-gray-400">
              <span>${stock.symbol}</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>Canlı Analiz</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900">{stock.symbol}</h1>
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-gray-900">${stock.currentPrice.toFixed(2)}</span>
              <div className={`px-4 py-2 rounded-2xl border font-black text-sm ${isPositive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                {isPositive ? '▲' : '▼'} {Math.abs(Number(priceChange))}
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/simulator')} className="h-fit px-10 py-5 bg-black text-white rounded-full font-black hover:scale-105 transition-all shadow-xl">
            Simulyatorda yoxla
          </button>
        </div>

        {/* Chart Section */}
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

        {/* Stats Grid */}
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

  const GeneralArticle = () => (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-6 mb-20">
        <div className="text-[10px] font-black uppercase tracking-[4px] text-emerald-500">01. Əsaslar • 4 dəqiqə</div>
        <h1 className="text-6xl md:text-[100px] font-black text-gray-900 tracking-tighter leading-none">Səhm nədir?</h1>
      </div>

      <div className="space-y-12 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
        <p>Bir səhm — şirkətin kiçik bir <span className="text-black font-black underline decoration-emerald-300 decoration-8 underline-offset-[-2px]">parçasıdır</span>. Onu alarkən sən həmin nəhəng şirkətə ortaq olursan.</p>
        
        <div className="bg-white border-2 border-emerald-100 p-10 rounded-[48px] relative my-16 shadow-sm">
          <span className="absolute -top-5 left-10 bg-emerald-500 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">Nümunə</span>
          <p className="italic text-gray-800 text-2xl">"Dostunun pizza dükanından 1% pay almaq kimi düşün. Dükan məşhurlaşdıqca sənin o 1%-in daha çox dəyər qazanır."</p>
        </div>

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
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 sm:px-6 font-inter antialiased">
      <div className="max-w-6xl mx-auto">
        {stockSymbol ? <StockAnalysis /> : <GeneralArticle />}
      </div>
    </main>
  );
};

export default Learn;
