


import axios from 'axios';
import WebSocket from 'ws';
import dotenv from 'dotenv';
dotenv.config({ path: "config/config.env" });

// Finnhub və TwelveData API konfiqurasiyaları
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = process.env.FINNHUB_KEY || process.env.FINNHUB_API_KEY;// Hər iki ehtimalı qoruyuruq  

const finnhubClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
  params: { token: API_KEY },
});

// ==========================================
// 1. REST API FUNKSİYALARI
// ==========================================

/**
 * Səhmin cari detallarını gətirir
 */
export const getStockDetails = async (symbol) => {
  try {
    const response = await finnhubClient.get('/quote', {
      params: { symbol: symbol.toUpperCase() },
    });

    return {
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        currentPrice: response.data.c,
        openPrice: response.data.o,
        highPrice: response.data.h,
        lowPrice: response.data.l,
        previousClose: response.data.pc,
      },
    };
  } catch (error) {
    console.error(`${symbol} detalları gətirilərkən xəta:`, error.message);
    throw error;
  }
};

/**
 * Qrafik üçün səhmin şam (candle) datalarını gətirir (Finnhub versiyası)
 */
export const getStockCandles = async (symbol, resolution = 'D') => {
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - 30 * 24 * 60 * 60; 

    const response = await finnhubClient.get('/stock/candle', {
      params: { symbol: symbol.toUpperCase(), resolution, from, to },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`${symbol} qrafik datası gətirilərkən xəta:`, error.message);
    throw error;
  }
};

/**
 * Səhmlər üzrə şirkət xəbərlərini gətirir (stockController.js tərəfindən tələb olunur)
 */
export const getCompanyNews = async (symbol) => {
  try {
    const to = new Date().toISOString().split('T')[0];
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7); // Son 7 günün xəbərləri
    const from = fromDate.toISOString().split('T')[0];

    const response = await finnhubClient.get('/company-news', {
      params: { symbol: symbol.toUpperCase(), from, to },
    });

    return response.data;
  } catch (error) {
    console.error(`${symbol} xəbərləri gətirilərkən xəta:`, error.message);
    return [];
  }
};

/**
 * TwelveData API vasitəsilə qrafik datalarını çəkir (stockController.js tərəfindən tələb olunur)
 */
export const getTwelveDataCandles = async (symbol) => {
  try {
    const response = await axios.get('https://api.twelvedata.com/time_series', {
      params: {
        symbol: symbol.toUpperCase(),
        interval: '1day',
        outputsize: 30,
        apikey: process.env.TWELVE_DATA_KEY,
      },
    });

    if (response.data.status === 'error' || !response.data.values) {
      return { s: 'no_data' };
    }

    // Finnhub-un data strukturuna (c, h, l, o, t, s) uyğunlaşdırırıq sxemi
    const values = response.data.values.reverse(); // Tarixi sıraya salmaq üçün
    return {
      c: values.map((v) => parseFloat(v.close)),
      h: values.map((v) => parseFloat(v.high)),
      l: values.map((v) => parseFloat(v.low)),
      o: values.map((v) => parseFloat(v.open)),
      t: values.map((v) => Math.floor(new Date(v.datetime).getTime() / 1000)),
      s: 'ok',
    };
  } catch (error) {
    console.error(`${symbol} TwelveData şamları çəkilərkən xəta:`, error.message);
    return { s: 'error' };
  }
};

/**
 * Finnhub üzərindən simvol axtarışını təmin edir (stockController.js tərəfindən tələb olunur)
 */
export const searchSymbols = async (query) => {
  try {
    const response = await finnhubClient.get('/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error(`Simvol axtarışı zamanı xəta (${query}):`, error.message);
    return { count: 0, result: [] };
  }
};

// ==========================================
// 2. WEBSOCKET FUNKSİYASI (Canlı Qiymətlər)
// ==========================================

/**
 * Finnhub WebSocket bağlantısını başladır və anlıq ticarət datalarını Socket.io-ya ötürür
 */
export const initFinnhubWebSocket = (io) => {
  if (!API_KEY) {
    console.error("Finnhub API Key tapılmadı! Canlı WebSocket başladıla bilməz.");
    return;
  }

  const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;
  let ws = null;

  function connect() {
    ws = new WebSocket(FINNHUB_WS_URL);

    ws.on('open', () => {
      console.log('Finnhub WebSocket-ə uğurlu bağlantı quruldu! 🚀');
      
      const trackedStocks = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'TSLA'];
      trackedStocks.forEach(symbol => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    });

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'trade') {
          const stockData = message.data[0];
          
          io.emit('stockPriceUpdate', {
            symbol: stockData.s,
            price: stockData.p,
            time: stockData.t,
          });
        }
      } catch (error) {
        console.error("Finnhub canlı mesajı oxunarkən xəta:", error.message);
      }
    });

    ws.on('error', (err) => {
      console.error('Finnhub WS Xətası:', err.message);
    });

    ws.on('close', () => {
      console.log('Finnhub WS bağlantısı kəsildi. 5 saniyə sonra yenidən cəhd edilir...');
      setTimeout(connect, 5000);
    });
  }

  connect();
};