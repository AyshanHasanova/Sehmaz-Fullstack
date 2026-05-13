import dotenv from 'dotenv'; // 1. Bura əlavə edildi
import axios from 'axios';
import Stock from '../models/Stock.js';
import Candle from '../models/Candle.js';

// Konfiqurasiya
dotenv.config({ path: "config/config.env" }); 

import { 
    getCompanyNews, 
    getTwelveDataCandles, 
    searchSymbols 
} from '../services/finnhubService.js';

/**
 * 1. Bütün Səhmlərin Siyahısı
 */
export const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({}).sort({ lastUpdated: -1 });
        res.status(200).json({ success: true, count: stocks.length, data: stocks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Siyahı alınarkən xəta baş verdi" });
    }
};

/**
 * 2. Cari Qiymət və Detallar
 */
export const getStockDetails = async (req, res) => {
    try {
        const { symbol } = req.params;
        const symbolUpper = symbol.toUpperCase();
        const stock = await Stock.findOne({ symbol: symbolUpper });
        
        const profile = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbolUpper}&token=${process.env.FINNHUB_KEY}`);

        res.json({
            success: true,
            data: {
                ...stock?._doc,
                name: profile.data.name || symbolUpper,
                description: profile.data.ticker ? `${profile.data.name} is a leader in ${profile.data.finnhubIndustry} sector.` : "Məlumat tapılmadı"
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 3. Qrafik Dataları (Candles)
 */
export const getCandleDetails = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        let candles = await Candle.findOne({ symbol });
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        if (candles && candles.lastUpdated > oneDayAgo) {
            return res.status(200).json({ success: true, source: "database", data: candles.data });
        }

        let candleData;
        const isCrypto = symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('USDT');

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
            { data: candleData, lastUpdated: new Date() },
            { returnDocument: 'after', upsert: true }
        );

        res.status(200).json({ success: true, source: "external_api", data: updatedCandles.data });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası baş verdi" });
    }
};

/**
 * 4. Şirkət Xəbərləri
 */
export const getStockNews = async (req, res) => {
    try {
        const { symbol } = req.params;
        const news = await getCompanyNews(symbol.toUpperCase());
        res.status(200).json({ success: true, data: news ? news.slice(0, 10) : [] }); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Xəbərlər alınarkən xəta baş verdi" });
    }
};

/**
 * 5. Simvol Axtarışı
 */
export const searchStocks = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ success: false, message: "Axtarış sözü daxil edin" });

        const results = await searchSymbols(q);
        res.status(200).json({ 
            success: true, 
            count: results.count, 
            data: results.result.slice(0, 10) 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Axtarış xətası baş verdi" });
    }
};

/**
 * 6. Simulyator (Zaman Maşını)
 */
/**
 * Simulyator (Zaman Maşını) - Finnhub API vasitəsilə
 */
// stockController.js daxilində simulateInvestment funksiyasını bununla əvəz et:

export const simulateInvestment = async (req, res) => {    
    try {
        const { symbol, amount, date } = req.body;
        const symbolUpper = symbol.toUpperCase().trim();
        const invAmount = parseFloat(amount);

        // 1. DB Yoxlaması
        const stockInfo = await Stock.findOne({ symbol: symbolUpper });
        if (!stockInfo) {
            return res.status(404).json({ success: false, message: "Bu səhm bazada tapılmadı." });
        }

        const TWELVE_DATA_KEY = process.env.TWELVE_DATA_KEY;
        
        // 2. TwelveData Sorğusu (Təkmilləşdirilmiş)
        const response = await axios.get(`https://api.twelvedata.com/time_series`, {
            params: {
                symbol: symbolUpper,
                interval: '1day',
                start_date: `${date} 09:30:00`,
                end_date: `${date} 16:00:00`,
                apikey: TWELVE_DATA_KEY,
                dp: 2 // Ondalıq hissəni dəqiqləşdirir
            }
        });
        console.log(response.data);

        const data = response.data;

        // Xəta yoxlaması
        if (data.status === 'error' || !data.values || data.values.length === 0) {
             return res.status(404).json({ 
                success: false, 
                message: "Tarixi qiymət alınmadı. Tarixi və ya simvolu yoxlayın." 
            });
        }

        // 3. Hesablamalar
        const historicalPrice = parseFloat(data.values[0].close);
        const currentPrice = stockInfo.currentPrice; // Bazadakı qiymət

        const stockCount = invAmount / historicalPrice;
        const currentValue = stockCount * currentPrice;
        const profit = currentValue - invAmount;

        return res.status(200).json({
            success: true,
            data: {
                symbol: symbolUpper,
                name: stockInfo.name || symbolUpper,
                investmentAmount: invAmount,
                historicalPrice: historicalPrice.toFixed(2),
                currentPrice: currentPrice.toFixed(2),
                profit: profit.toFixed(2),
                profitPercentage: ((profit / invAmount) * 100).toFixed(2),
                isProfit: profit >= 0
            }
        });

    } catch (error) {
        console.error("SIMULATION ERROR:", error.message);
        return res.status(500).json({ success: false, message: "Server daxili xətası." });
    }
};




