import express from 'express';
import { 
    getStockDetails, 
    getCandleDetails, 
    getStockNews ,
    searchStocks
} from '../controllers/stockController.js';

const router = express.Router();

router.get('/search', searchStocks);

// 1. Şirkət xəbərləri (/:symbol/news)
router.get('/:symbol/news', getStockNews);

// 2. Qrafik datası (/:symbol/candles)
router.get('/:symbol/candles', getCandleDetails);

// 3. Əsas səhm məlumatı (/:symbol)
// QEYD: Bu ən sonda olmalıdır ki, digər yolları "udmasın"
router.get('/:symbol', getStockDetails);
// Axtarış marşrutu (Vacib: bunu /:symbol-dan yuxarıda yaz!)


export default router;
