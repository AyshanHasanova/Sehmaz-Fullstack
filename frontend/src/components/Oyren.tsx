

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { stockData } from '../data/stock';

const Learn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stockSymbol = searchParams.get('stock');
  const [investment, setInvestment] = useState(250);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stockSymbol]);

  const StockAnalysis = ({ symbol }: { symbol: string }) => {
    const currentStock = stockData[symbol as keyof typeof stockData];
    if (!currentStock) return <GeneralArticle />;

    return (
      <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">

        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px]"
        >
          ← Mövzulara qayıt
        </button>

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[3px] text-gray-400">
              <span>${currentStock.symbol}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>Texnologiya</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black tracking-tight leading-[0.9] text-gray-900">
              {currentStock.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-end gap-4 pt-2">
              <span className="text-5xl sm:text-6xl font-black text-gray-900">
                ${currentStock.price}
              </span>

              <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100 w-fit">
                <span className="text-emerald-600 font-black text-sm">
                  ▲ +1.93%
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/simulator')}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-black text-sm hover:scale-105 transition-all"
            >
              Simulyatoru aç
            </button>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white rounded-[28px] md:rounded-[50px] p-5 sm:p-8 md:p-10 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">
              Bazar Trendi (60 gün)
            </span>

            <div className="flex gap-1 bg-[#fbf8f2] p-1 rounded-2xl border border-gray-100 w-fit">
              {['1H', '1A', '6A', '1İ'].map((t) => (
                <button
                  key={t}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black ${
                    t === '1A'
                      ? 'bg-white shadow text-black'
                      : 'text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-48 sm:h-60 md:h-72 bg-gradient-to-t from-emerald-50/40 rounded-[28px] overflow-hidden">
            <svg
              className="w-full h-full text-emerald-400"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,20 L0,15 Q20,18 40,12 T70,8 T100,2 L100,20 Z"
                fill="currentColor"
                fillOpacity="0.05"
              />
              <path
                d="M0,15 Q20,18 40,12 T70,8 T100,2"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          <div className="bg-white rounded-[28px] md:rounded-[40px] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <span className="inline-flex px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
              AI İzah
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-gray-900">
              Bu şirkət nə edir?
            </h3>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {currentStock.description}
            </p>
          </div>

          <div className="bg-white rounded-[28px] md:rounded-[40px] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-2xl md:text-4xl font-black text-gray-900">
              Qısa məlumat
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Sektor', val: 'Texnologiya' },
                { label: 'Bazar dəyəri', val: '3.46T' },
                { label: 'Dividend', val: '0.62%' },
                { label: 'Risk', val: 'Aşağı' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-gray-50 pb-3"
                >
                  <span className="text-xs uppercase text-gray-400 font-bold">
                    {item.label}
                  </span>
                  <span className="font-black text-gray-900">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-[28px] md:rounded-[40px] p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-[3px]">
              Zaman Maşını
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
              Keçmişdə investisiya etsəydiniz indi nə qədər qazanardınız?
            </h3>
          </div>

          <button
            onClick={() => navigate('/simulator')}
            className="w-full sm:w-auto px-10 py-4 bg-[#d46a3c] text-white rounded-full font-black"
          >
            Hesabla →
          </button>
        </div>
      </div>
    );
  };

//   const GeneralArticle = () => (
//     <div className="max-w-4xl mx-auto py-6 md:py-10">

//       <div className="text-center space-y-6 mb-14">
//         <div className="text-[10px] font-black uppercase tracking-[4px] text-emerald-500">
//           01. Əsaslar • 4 dəqiqə
//         </div>

//         <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900">
//           Səhm nədir?
//         </h1>
//       </div>

//       <div className="space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed">
//         <p>
//           Bir səhm — bir şirkətin kiçik hissəsidir.
//           Səhm almaq həmin şirkətə ortaq olmaq deməkdir.
//         </p>

//         <div className="bg-white p-6 md:p-10 rounded-[28px] border border-emerald-100">
//           <p className="italic text-gray-800">
//             Dostunuz pizza dükanı açır və sənə 1% pay təklif edir...
//             dükan böyüyür və payın dəyəri artır.
//           </p>
//         </div>

//         <p>
//           Apple, Tesla və Microsoft kimi şirkətlərdə də eyni məntiq işləyir.
//         </p>
//       </div>

//       {/* SLIDER */}
//       <div className="mt-14 bg-black rounded-[28px] md:rounded-[50px] p-6 md:p-10 text-white space-y-8">
//         <div className="flex justify-between items-center">
//           <h3 className="text-xl md:text-3xl font-black text-emerald-400">
//             Gəlir Simulyatoru
//           </h3>
//         </div>

//         <div className="text-3xl md:text-5xl font-black flex justify-between">
//           <span>${investment}</span>
//           <span className="text-emerald-400">
//             → ${(investment * 1.45).toFixed(0)}
//           </span>
//         </div>

//         <input
//           type="range"
//           min="100"
//           max="10000"
//           step="100"
//           value={investment}
//           onChange={(e) => setInvestment(parseInt(e.target.value))}
//           className="w-full accent-emerald-500"
//         />
//       </div>
//     </div>
//   );


{/* GENERAL ARTICLE hissəsi — məzmun qısalmadan, responsive və səliqəli */}

const GeneralArticle = () => (
    <div className="max-w-4xl mx-auto py-8 md:py-12 animate-in fade-in duration-1000">
  
      {/* HEADER */}
      <div className="space-y-6 md:space-y-8 mb-14 md:mb-20 text-center">
        <div className="flex justify-center items-center gap-3 md:gap-4 text-[10px] font-black tracking-[4px] uppercase text-emerald-500">
          <span>01. Əsaslar</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span>4 dəqiqə</span>
        </div>
  
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-black text-gray-900 tracking-tight leading-[0.85]">
          Səhm nədir?
        </h1>
      </div>
  
      {/* CONTENT */}
      <div className="space-y-10 md:space-y-14 text-lg sm:text-xl md:text-[22px] text-gray-600 leading-[1.7] font-medium">
  
        <p>
          Bir səhm — sadə dildə desək, bir şirkətin kiçik bir parçasıdır.
          <span className="text-black font-black underline decoration-emerald-300 decoration-8 underline-offset-[-2px]">
            {' '}Səhm almaq, həmin şirkətə ortaq olmaq deməkdir.
          </span>
        </p>
  
        {/* Pizza Kartı */}
        <div className="bg-white border-2 border-emerald-100 p-6 sm:p-8 md:p-12 rounded-[28px] md:rounded-[48px] shadow-sm relative my-10 md:my-16">
  
          <span className="absolute -top-4 md:-top-5 left-6 md:left-10 bg-emerald-500 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest">
            Nümunə
          </span>
  
          <p className="italic text-gray-800 text-lg sm:text-xl md:text-2xl leading-relaxed">
            "Təsəvvür edin ki, dostunuz möhtəşəm bir pizza dükanı açır.
            Onun pulu çatmır və sizə deyir:
            <span className="text-emerald-600 font-black">
              {' '}$100 ver, dükanın 1%-i sənin olsun.
            </span>
            İllər keçir, dükan böyüyür və bütün şəhərə yayılır.
            Sizin o 1%-lik payınız artıq $100 yox, $10,000 dəyərindədir.
            Budur səhm investisiyası!"
          </p>
        </div>
  
        <p>
          Səhm bazarı eynilə bu pizza dükanı kimidir, sadəcə burada Apple,
          Tesla və Microsoft kimi dünya nəhəngləri var. Siz bir kliklə onların
          həm mənfəətinə, həm də gələcəyinə ortaq olursunuz.
        </p>
  
        <div className="space-y-5 md:space-y-6 pt-6 md:pt-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Niyə qiymət dəyişir?
          </h2>
  
          <p>
            Bu, tələb və təklif oyunudur. Əgər bir şirkət yaxşı işləyirsə,
            hamı onun ortağı olmaq istəyir.
            <span className="text-emerald-500 font-black italic">
              {' '}Alıcı çoxaldıqca qiymət qalxır.
            </span>
            Əgər kimsə şirkətin gələcəyinə inanmırsa, öz payını satır və qiymət enir.
          </p>
        </div>

        <div className="space-y-5 md:space-y-6 pt-6 md:pt-10">

  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
    Pul necə qazanılır?
  </h2>

  <p>
    İki əsas yol var:
    <span className="text-black font-black">
      {' '}(1) ucuz alıb baha satmaq
    </span>
    <br />
    və
    <span className="text-black font-black">
      {' '} (2) dividend qazanmaq
    </span>.
  </p>

  <p>
    Dividend o deməkdir ki, şirkət qazandığı pulun bir hissəsini
    səhmdarlara paylayır. Yəni səhm sahibi olmaq, bəzən “kirayə gəliri”
    kimi passiv pul qazandırır — sanki pizza dükanından müntəzəm pay almaq kimidir.
  </p>

</div>
      </div>
  
      {/* SIMULATOR */}
      <div className="mt-16 md:mt-24 bg-black rounded-[28px] md:rounded-[60px] p-6 sm:p-8 md:p-14 shadow-2xl space-y-8 md:space-y-12 text-white">
  
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight italic text-emerald-400">
            Gəlir Simulyatoru
          </h3>
  
          <span className="text-[10px] font-black uppercase tracking-[3px] opacity-40">
            Dəyəri tənzimlə
          </span>
        </div>
  
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
            <span>${investment}</span>
            <span className="text-emerald-400">
              → ${(investment * 1.45).toFixed(0)}
            </span>
          </div>
  
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={investment}
            onChange={(e) => setInvestment(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
  
        <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest">
          Bu, 1 illik orta texnologiya artımı ilə hesablanmışdır.
        </p>
      </div>
    </div>
  );
  return (
    <main className="min-h-screen bg-[#fbf8f2] pt-24 md:pt-28 pb-20 px-4 sm:px-6 font-inter">
      <div className="max-w-6xl mx-auto">

        {stockSymbol ? (
          <StockAnalysis symbol={stockSymbol} />
        ) : (
          <GeneralArticle />
        )}

        {/* FOOTER */}
        <div className="mt-20 pt-14 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-10">
            <h4 className="text-3xl md:text-5xl font-black text-gray-900">
              Səhmləri kəşf et
            </h4>

            <Link
              to="/explore"
              className="text-sm text-gray-400 hover:text-black underline"
            >
              Hamısına bax
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(stockData).slice(0, 2).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/learn?stock=${stock.symbol}`)}
                className="bg-white p-6 md:p-10 rounded-[28px] border border-gray-100 cursor-pointer hover:border-black"
              >
                <span className="text-[10px] text-gray-300 font-black uppercase">
                  ${stock.symbol}
                </span>

                <h5 className="text-2xl md:text-3xl font-black mt-4 mb-4">
                  {stock.name}
                </h5>

                <p className="text-gray-500">
                  {stock.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Learn;