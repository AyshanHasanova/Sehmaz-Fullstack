import axios from 'axios';
import Bottleneck from 'bottleneck';
import dotenv from 'dotenv';

dotenv.config({ path: "config/config.env" }); 

const limiter = new Bottleneck({
    minTime: 1000, 
});

const finnhubClient = axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token:process.env.FINNHUB_KEY // Düzəldildi
    }
});

export const getStockQuote = limiter.wrap(async (symbol) => {
    try {
        const response = await finnhubClient.get('/quote', {
            params: { symbol: symbol.toUpperCase() }
        });
        return response.data;
    } catch (error) {
        console.error(`Finnhub Quote Error (${symbol}):`, error.message);
        return null;
    }
});

export const getStockCandles = limiter.wrap(async (symbol, resolution, from, to) => {
    try {
        const response = await finnhubClient.get('/stock/candle', {
            params: {
                symbol: symbol.toUpperCase(),
                resolution,
                from,
                to
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Finnhub Candle Error (${symbol}):`, error.message);
        return { s: "error" };
    }
});

export const getCompanyNews = limiter.wrap(async (symbol) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const response = await finnhubClient.get('/company-news', {
            params: {
                symbol: symbol.toUpperCase(),
                from: oneMonthAgo,
                to: today
            }
        });
        return response.data;
    } catch (error) {
        console.error(`News Error (${symbol}):`, error.message);
        return [];
    }
});

export const getTwelveDataCandles = limiter.wrap(async (symbol) => {
    try {
        const response = await axios.get('https://api.twelvedata.com/time_series', {
            params: {
                symbol: symbol.toUpperCase(),
                interval: '1day',
                outputsize: 30,
                apikey:process.env.TWELVE_DATA_KEY// Düzəldildi
            }
        });

        if (response.data.status !== "ok" || !response.data.values) {
            console.warn(`Twelve Data Warning (${symbol}):`, response.data.message);
            return { s: "no_data" };
        }

        const values = response.data.values;
        
        return {
            c: values.map(v => parseFloat(v.close)).reverse(),
            h: values.map(v => parseFloat(v.high)).reverse(),
            l: values.map(v => parseFloat(v.low)).reverse(),
            o: values.map(v => parseFloat(v.open)).reverse(),
            t: values.map(v => Math.floor(new Date(v.datetime).getTime() / 1000)).reverse(),
            s: "ok"
        };
    } catch (error) {
        console.error(`Twelve Data Error (${symbol}):`, error.message);
        return { s: "error" };
    }
});

export const searchSymbols = limiter.wrap(async (query) => {
    const response = await finnhubClient.get('/search', {
        params: { q: query }
    });
    return response.data;
});