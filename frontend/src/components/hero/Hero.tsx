// import React from 'react';
// import { Link } from 'react-router-dom';

// const Hero: React.FC = () => {
//   return (
//     <section className="bg-[#FBF8F2] min-h-screen font-sans">
//       {/* Navbar artıq ayrıca komponent olduğu üçün buradan silindi. 
//          App.tsx-də Hero-dan yuxarıda yerləşdirməyiniz kifayətdir. 
//       */}

//       <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
//         <div className="max-w-3xl">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#059669] text-xs font-bold mb-6">
//             <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
//             AI İLƏ ÖYRƏN
//           </div>

//           {/* Başlıq */}
//           <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
//             İnvestisiya — <br />
//             <span className="text-[#10B981]">sadə dildə.</span>
//           </h1>

//           {/* Alt mətn */}
//           <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
//             Səhmləri adi sözlərlə öyrənin və real bazar məlumatları ilə tanış olun. 
//             Heç bir maliyyə dərəcəsi tələb etmir.
//           </p>

//           {/* Düymələr */}
//           <div className="mt-10 flex flex-wrap gap-4">
//             {/* Narıncı buton -> Öyrən səhifəsinə */}
//             <Link 
//               to="/learn" 
//               className="flex items-center gap-2 bg-[#B45309] text-white px-8 py-4 rounded-full font-medium hover:bg-[#92400E] transition-all group"
//             >
//               Səhm nədir?
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
            
//             {/* Ağ buton -> Kəşf et səhifəsinə */}
//             <Link 
//               to="/explore" 
//               className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all text-center"
//             >
//               Səhmləri kəşf et
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#FBF8F2] min-h-screen font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#059669] text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            AI İLƏ ÖYRƏN
          </div>

          {/* Başlıq - Sənin ilkin ölçülərin, sadəcə hərflər bir az daha sıx */}
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tighter">
            İnvestisiya — <br />
            <span className="text-[#10B981]">sadə dildə.</span>
          </h1>

          {/* Alt mətn */}
          <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
            Səhmləri adi sözlərlə öyrənin və real bazar məlumatları ilə tanış olun. 
            Heç bir maliyyə dərəcəsi tələb etmir.
          </p>

          {/* Düymələr */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link 
              to="/learn" 
              className="flex items-center gap-2 bg-[#B45309] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#92400E] transition-all group shadow-sm"
            >
              Səhm nədir?
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              to="/explore" 
              className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm text-center"
            >
              Səhmləri kəşf et
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
