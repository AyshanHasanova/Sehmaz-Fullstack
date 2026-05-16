import api from './api';

/**
 * Bütün səhmlər
 */
export const getAllStocks = async () => {
    const response = await api.get('/api/stocks');
    return response.data;
};

/**
 * Detallar
 */
export const getStockDetails = async (symbol: string) => {
    const response = await api.get(`/api/stocks/${symbol}`);
    return response.data;
};

/**
 * Candles
 */
export const getStockCandles = async (symbol: string) => {
    const response = await api.get(`/api/stocks/${symbol}/candles`);
    return response.data;
};

/**
 * News
 */
export const getStockNews = async (symbol: string) => {
    const response = await api.get(`/api/stocks/${symbol}/news`);
    return response.data;
};

/**
 * Search
 */
export const searchStocks = async (query: string) => {
    const response = await api.get(`/api/stocks/search?q=${query}`);
    return response.data;
};

/**
 * Simulate
 */
export const simulateInvestment = async (symbol: string, amount: number, date: string) => {
    const response = await api.post('/api/stocks/simulate', {
        symbol: symbol.toUpperCase().trim(),
        amount: Number(amount),
        date,
    });

    return response.data;
};