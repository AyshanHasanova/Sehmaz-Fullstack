import Stock from '../models/Stock.js';
import Candle from '../models/Candle.js';
import axios from 'axios';
import { 
    getStockQuote, 
    getCompanyNews, 
    getTwelveDataCandles, 
    searchSymbols 
} from '../services/finnhubService.js';

/**
 * 1. Cari Qiymət və Detallar (Cache məntiqi ilə)
 * Finnhub-dan anlıq qiyməti çəkir və 5 dəqiqəlik MongoDB cache tətbiq edir.
 */
export const getStockDetails = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        let stock = await Stock.findOne({ symbol });
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        // Əgər bazada varsa və yenidirsə, bazadan qaytar
        if (stock && stock.lastUpdated > fiveMinutesAgo) {
            return res.status(200).json({ success: true, source: "database", data: stock });
        }

        // Finnhub-dan yeni qiyməti al
        const finnhubData = await getStockQuote(symbol);

        if (!finnhubData || !finnhubData.c) {
            return res.status(404).json({ success: false, message: "Qiymət məlumatı tapılmadı" });
        }

        // Bazada yenilə və ya yoxdursa yarat
        stock = await Stock.findOneAndUpdate(
            { symbol },
            {
                currentPrice: finnhubData.c,
                highPrice: finnhubData.h,
                lowPrice: finnhubData.l,
                openPrice: finnhubData.o,
                previousClose: finnhubData.pc,
                lastUpdated: new Date()
            },
            { returnDocument: 'after', upsert: true } // 'new: true' yerinə müasir standart
        );

        res.status(200).json({ success: true, source: "finnhub", data: stock });
    } catch (error) {
        console.error("STOK DETALI XƏTASI:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Səhm məlumatı alınmadı", 
            error: error.message 
        });
    }
};

/**
 * 2. Qrafik Dataları (Candles)
 * Səhmlər (Twelve Data) və Kripto (Binance) üçün 24 saatlıq cache ilə qrafik datası.
 */
export const getCandleDetails = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        
        // Cache yoxlanışı (24 saat)
        let candles = await Candle.findOne({ symbol });
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        if (candles && candles.lastUpdated > oneDayAgo) {
            return res.status(200).json({ success: true, source: "database", data: candles.data });
        }

        let candleData;
        const isCrypto = symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('USDT') || symbol.includes('BINANCE:');

        if (isCrypto) {
            const cleanSymbol = symbol.replace('BINANCE:', '').replace('/', '').replace('-', '');
            const binanceRes = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${cleanSymbol}&interval=1d&limit=30`);
            
            candleData = {
                c: binanceRes.data.map(k => parseFloat(k[4])),
                h: binanceRes.data.map(k => parseFloat(k[2])),
                l: binanceRes.data.map(k => parseFloat(k[3])),
                o: binanceRes.data.map(k => parseFloat(k[1])),
                t: binanceRes.data.map(k => Math.floor(k[0] / 1000)),
                s: "ok"
            };
        } else {
            candleData = await getTwelveDataCandles(symbol);
        }

        if (!candleData || candleData.s !== "ok") {
            return res.status(200).json({ success: false, message: "API-dan data alınmadı", data: [] });
        }

        const updatedCandles = await Candle.findOneAndUpdate(
            { symbol },
            { 
                data: candleData, 
                lastUpdated: new Date() 
            },
            { returnDocument: 'after', upsert: true } // 'new: true' yerinə müasir standart
        );

        res.status(200).json({ success: true, source: "external_api", data: updatedCandles.data });

    } catch (error) {
        console.error("CANDLE ERROR:", error.message);
        res.status(500).json({ success: false, message: "Server xətası", details: error.message });
    }
};

/**
 * 3. Şirkət Xəbərləri
 */
export const getStockNews = async (req, res) => {
    try {
        const { symbol } = req.params;
        const news = await getCompanyNews(symbol.toUpperCase());
        
        if (!news || news.length === 0) {
            return res.status(200).json({ success: true, message: "Xəbər tapılmadı", data: [] });
        }

        res.status(200).json({ success: true, data: news.slice(0, 10) }); 
    } catch (error) {
        console.error("XƏBƏR XƏTASI:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Xəbərlər alınmadı", 
            error: error.message 
        });
    }
};

/**
 * 4. Simvol Axtarışı
 */
export const searchStocks = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, message: "Axtarış sözü daxil edilməyib" });
        }

        const results = await searchSymbols(q);
        
        res.status(200).json({ 
            success: true, 
            count: results.count, 
            data: results.result.slice(0, 10) 
        });
    } catch (error) {
        console.error("SEARCH ERROR:", error.message);
        res.status(500).json({ success: false, message: "Axtarış zamanı xəta baş verdi" });
    }
};