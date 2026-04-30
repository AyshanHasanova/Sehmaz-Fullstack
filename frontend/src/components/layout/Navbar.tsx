

// import React, { useState } from 'react';
// import { NavLink, Link } from 'react-router-dom';

// interface NavLinkItem {
//   label: string;
//   href: string;
//   svgPath: React.ReactNode;
// }

// const navLinks: NavLinkItem[] = [
//   { 
//     label: 'Ana Səhifə', 
//     href: '/', 
//     svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//   },
//   { 
//     label: 'Kəşf et', 
//     href: '/explore', 
//     svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//   },
//   { 
//     label: 'Öyrən', 
//     href: '/learn', 
//     svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
//   },
//   { 
//     label: 'Simulyator', 
//     href: '/simulator', 
//     svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
//   },
// ];

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-[#fbf8f2]/95 backdrop-blur-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//   <img 
//     src="/logo.png" 
//     alt="Sehmaz Logo" 
//     className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
//   />
//   <span className="text-xl font-black tracking-tighter text-gray-900">
//     SEHMA<span className="text-[#0a0a0a]">Z</span>
//   </span>
// </Link>

//           {/* Desktop Links */}
//           <div className="hidden lg:flex items-center bg-gray-200/50 rounded-full p-1.5 gap-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.label}
//                 to={link.href}
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-5 py-2 text-sm font-bold transition-all rounded-full ${
//                     isActive
//                       ? 'bg-white text-black shadow-sm ring-1 ring-black/5' 
//                       : 'text-gray-600 hover:text-black hover:bg-white/40'
//                   }`
//                 }
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                   {link.svgPath}
//                 </svg>
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Desktop Action Buttons */}
//           <div className="hidden md:flex items-center gap-3">
//             <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 border-2 border-gray-200 rounded-full hover:border-black hover:text-black transition-all active:scale-95">
//               Daxil ol
//             </button>
//             <button className="px-6 py-2.5 text-sm font-bold text-white bg-black border-2 border-black rounded-full hover:bg-gray-800 transition-all active:scale-95">
//               Qeydiyyat
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
//               {isOpen ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Content */}
//       <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen bg-[#fbf8f2] border-b' : 'max-h-0'}`}>
//         <div className="px-6 py-6 space-y-3">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.label}
//               to={link.href}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold ${
//                   isActive ? 'bg-black text-white' : 'text-gray-600'
//                 }`
//               }
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//                 {link.svgPath}
//               </svg>
//               {link.label}
//             </NavLink>
//           ))}
//           <div className="pt-4 flex flex-col gap-3">
//             <button className="w-full py-4 font-bold text-gray-700 border-2 border-gray-200 rounded-2xl">
//               Daxil ol
//             </button>
//             <button className="w-full py-4 font-bold text-white bg-black rounded-2xl">
//               Qeydiyyat
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface NavLinkItem {
  label: string;
  href: string;
  svgPath: React.ReactNode;
}

const navLinks: NavLinkItem[] = [
  { 
    label: 'Ana Səhifə', 
    href: '/', 
    svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  },
  { 
    label: 'Kəşf et', 
    href: '/explore', 
    svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  },
  { 
    label: 'Öyrən', 
    href: '/learn', 
    svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
  },
  { 
    label: 'Simulyator', 
    href: '/simulator', 
    svgPath: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fbf8f2]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Sehmaz Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="text-xl font-black tracking-tighter text-gray-900">
              SEHMA<span className="text-[#0a0a0a]">Z</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center bg-gray-200/50 rounded-full p-1.5 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2 text-sm font-bold transition-all rounded-full ${
                    isActive
                      ? 'bg-white text-black shadow-sm ring-1 ring-black/5' 
                      : 'text-gray-600 hover:text-black hover:bg-white/40'
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  {link.svgPath}
                </svg>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen bg-[#fbf8f2] border-b' : 'max-h-0'}`}>
        <div className="px-6 py-6 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold ${
                  isActive ? 'bg-black text-white' : 'text-gray-600'
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                {link.svgPath}
              </svg>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




