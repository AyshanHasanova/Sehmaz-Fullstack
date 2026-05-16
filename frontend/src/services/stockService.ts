import api from './api'; // YAXŞI OLMAQ ÜÇÜN CHECK ET

const BASE = '/stocks';

// export const getAllStocks = async () => {
//     const res = await api.get(BASE);
//     return res.data;
// };



export const getAllStocks = async () => {
    console.log("🔥 STOCK SERVICE IS USED");

    const res = await api.get('/stocks');
    return res.data;
};
export const getStockDetails = async (symbol: string) => {
    const res = await api.get(`${BASE}/${symbol}`);
    return res.data;
};

export const getStockCandles = async (symbol: string) => {
    const res = await api.get(`${BASE}/${symbol}/candles`);
    return res.data;
};

export const getStockNews = async (symbol: string) => {
    const res = await api.get(`${BASE}/${symbol}/news`);
    return res.data;
};

export const searchStocks = async (query: string) => {
    const res = await api.get(`${BASE}/search?q=${query}`);
    return res.data;
};

export const simulateInvestment = async (symbol: string, amount: number, date: string) => {
    const res = await api.post(`${BASE}/simulate`, {
        symbol: symbol.toUpperCase().trim(),
        amount,
        date
    });
    return res.data;
};