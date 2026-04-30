import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../data/stock';

const Explore:React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('A-Z');

  // Bütün səhmləri massiv halına salırıq
  const allStocks = Object.values(stockData);

  // Filterləmə və Axtarış məntiqi
  const filteredStocks = useMemo(() => {
    let result = allStocks.filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sağ tərəfdəki düymələrə görə sıralama
    if (activeFilter === 'Ən çox qalxan') {
      result.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
    } else if (activeFilter === 'Ən çox enən') {
      result.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));
    } else if (activeFilter === 'A-Z') {
      result.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    return result;
  }, [searchTerm, activeFilter, allStocks]);

  return (
    <main className="min-h-screen bg-[#fbf8f2] pt-24 pb-20 px-4 sm:px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-12">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[4px] mb-4 block">
            Kəşf et
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
            Səhmləri kəşf et
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium">
            {allStocks.length} məşhur ABŞ şirkəti. Birinə toxunun və daha çox öyrənin.
          </p>
        </header>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          {/* Axtarış Inputu */}
          <div className="relative flex-1">
            <svg 
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text"
              placeholder="Şirkət və ya simvol axtarın"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 py-4 pl-14 pr-6 rounded-[20px] text-sm font-bold shadow-sm outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Filter Düymələri */}
          <div className="flex bg-white p-1.5 rounded-[20px] border border-gray-100 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
            {['Populyar', 'Ən çox qalxan', 'Ən çox enən', 'A-Z'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-[15px] text-xs font-black transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#fbf8f2] text-gray-900 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* STOCKS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => navigate(`/learn?stock=${stock.symbol}`)}
              className="group bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[12px] font-black text-gray-900 block mb-1 tracking-wider">${stock.symbol}</span>
                  <h3 className="text-gray-400 text-[13px] font-medium leading-tight">{stock.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${
                  stock.status === 'Yüksək' ? 'bg-red-50 text-red-500' : 
                  stock.status === 'Stabil' ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                   {stock.status}
                </span>
              </div>

              {/* Balaca Qrafik */}
              <div className="h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={`w-full h-full ${stock.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  <path 
                    d={stock.isPositive ? "M0,15 Q20,18 40,12 T70,8 T100,2" : "M0,5 Q20,2 40,8 T70,12 T100,18"} 
                    fill="none" stroke="currentColor" strokeWidth="2" 
                  />
                </svg>
              </div>

              <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                <div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Cari Qiymət</span>
                  <span className="text-2xl font-black text-gray-900">${stock.price}</span>
                </div>
                <div className={`font-black text-sm ${stock.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stock.isPositive ? '▲' : '▼'} {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO RESULTS */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">Axtarışa uyğun nəticə tapılmadı.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Explore;