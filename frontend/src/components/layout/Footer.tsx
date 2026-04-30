// import { useEffect, useState } from "react";

// export default function Footer() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setVisible(true);
//   }, []);

//   return (
//     <footer
//       className={`w-full bg-[#fbf8f2] border-t border-gray-200 transition-all duration-700 ease-in-out ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
//         {/* Left side */}
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
//             <h1 className="text-lg font-semibold tracking-wide text-gray-800">
//               SEHMAZ
//             </h1>
//           </div>

//           <p className="text-xs text-gray-500 max-w-md leading-relaxed">
//             Məlumatlar yalnız təlim məqsədlidir. Maliyyə məsləhəti deyil.
//             Səhmlərə investisiya — risklə bağlıdır.
//           </p>
//         </div>

//         {/* Right side */}
//         <div className="text-xs text-gray-500 md:text-right">
//           © 2026 · Bakı, Azərbaycan
//         </div>
//       </div>
//     </footer>
//   );
// }


import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <footer
      className={`w-full bg-[#fbf8f2] border-t border-gray-200 transition-all duration-700 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        {/* Left side */}
        <div className="flex flex-col gap-3">

          {/* LOGO */}
          <div className="flex items-center">
            <img
              src="logo.png"
              alt="SEHMAZ"
              className="h-8 w-auto object-contain"
            />
            <p className="text-black font-bold ml-2">SEHMAZ</p>
          </div>

          <p className="text-xs text-gray-500 max-w-md leading-relaxed">
            Məlumatlar yalnız təlim məqsədlidir. Maliyyə məsləhəti deyil.
            Səhmlərə investisiya — risklə bağlıdır.
          </p>
        </div>

        {/* Right side */}
        <div className="text-xs text-gray-500 md:text-right">
          © 2026 · Bakı, Azərbaycan
        </div>

      </div>
    </footer>
  );
}