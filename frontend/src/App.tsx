// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';

// // Səhifə komponentlərini burada import etdiyini fərz edirik
// // import Home from './pages/Home';
// // import Explore from './pages/Explore';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main>
//           <Routes>
        
//             <Route path="/" element={<div className="p-10 text-center">Ana Səhifə</div>} />
//             <Route path="/explore" element={<div className="p-10 text-center">Səhmlər Səhifəsi</div>} />
//             <Route path="/learn" element={<div className="p-10 text-center">Öyrən Bölməsi</div>} />
//             <Route path="/simulator" element={<div className="p-10 text-center">Simulyator</div>} />
//             {/* 404 Səhifəsi */}
//             <Route path="*" element={<div className="p-10 text-center text-red-500">Səhifə tapılmadı!</div>} />
//           </Routes>
//         </main>
//         <Footer/>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home'; // Home səhifəsini import edin
import Learn from './pages/Learn/Learn';
import Kesf from './pages/Explore/Kesf';
import Simulator from './components/Simulator';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            {/* Burada div əvəzinə Home komponentini yazın */}
            <Route path="/" element={<Home />} />
            
            <Route path="/explore" element={<Kesf/>} />
            <Route path="/learn" element={<Learn/>} />
            <Route path="/learn/:slug" element={<ArticleDetail />} />
            <Route path="/simulator" element={<Simulator/>} />
            <Route path="*" element={<div className="p-10 text-center text-red-500">Səhifə tapılmadı!</div>} />

          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;




