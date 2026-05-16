// import express from 'express';
// import cors from 'cors';
// import { 
//     getStockDetails, 
//     getCandleDetails, 
//     getStockNews ,
//     searchStocks,
//     getAllStocks ,
 
//     simulateInvestment
// } from '../controllers/stockController.js';

// const router = express.Router();

// // 1. Statik və xüsusi yollar hər zaman yuxarıda olmalıdır
// router.get('/', getAllStocks);
// router.get('/search', searchStocks);
// router.all('/debug', (req, res) => res.send("Debug işləyir!"));

// // --- BU SƏTRİ YUXARI QALDIRIN ---
// router.options('/simulate', cors());
// router.post('/simulate', (req,res,next)=>{
//     console.log("SIMULATE ROUTE HIT");
//     next();
//  }, simulateInvestment);
// // -------------------------------

// router.get('/details/:symbol', getStockDetails);
// router.get('/:symbol/news', getStockNews);
// router.get('/:symbol/candles', getCandleDetails);

// // 2. Ən ümumi/dinamik yol (həmişə ən sonda)
// router.get('/:symbol', getStockDetails);

// export default router;


import express from 'express';
import cors from 'cors';
import {
    getStockDetails,
    getCandleDetails,
    getStockNews,              
    searchStocks,
    getAllStocks,
    simulateInvestment
} from '../controllers/stockController.js';

const router = express.Router();

/**
 * =========================
 * STATIC ROUTES (ƏN YUXARI)
 * =========================
 */

// Bütün səhmlər
router.get('/', getAllStocks);

// Axtarış
router.get('/search', searchStocks);

// Simulyasiya
router.post('/simulate', cors(), simulateInvestment);

/**
 * =========================
 * DYNAMIC ROUTES
 * =========================
 * IMPORTANT: həmişə ən axırda olmalıdır
 */

// Səhmin detalları
router.get('/:symbol', getStockDetails);

// Qrafik dataları
router.get('/:symbol/candles', getCandleDetails);

// Xəbərlər
router.get('/:symbol/news', getStockNews);

export default router;