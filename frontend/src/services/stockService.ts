// import api from './api';

// /**
//  * Bütün səhmlərin siyahısını gətirir
//  */
// export const getAllStocks = async () => {
//     try {
//         const response = await api.get('/stocks');
//         return response.data;
//     } catch (error) {
//         console.error("Səhmləri yükləyərkən xəta:", error);
//         throw error;
//     }
// };

// /**
//  * Bir səhmin detallarını gətirir
//  */
// export const getStockDetails = async (symbol: string) => {
//     try {
//         // Əgər /api/stocks/:symbol 404 verərsə, buranı `/stocks/details/${symbol}` ilə yoxla
//         const response = await api.get(`/stocks/${symbol}`);
//         return response.data;
//     } catch (error) {
//         console.error(`${symbol} məlumatları yüklənmədi:`, error);
//         throw error;
//     }
// };

// /**
//  * Qrafik datalarını gətirir
//  */
// export const getStockCandles = async (symbol: string) => {
//     try {
//         const response = await api.get(`/stocks/${symbol}/candles`);
//         return response.data;
//     } catch (error) {
//         console.error(`${symbol} qrafik datası alınmadı:`, error);
//         throw error;
//     }
// };

// /**
//  * Səhm xəbərlərini gətirir
//  */
// export const getStockNews = async (symbol: string) => {
//     try {
//         const response = await api.get(`/stocks/${symbol}/news`);
//         return response.data;
//     } catch (error) {
//         console.error(`${symbol} xəbərləri alınmadı:`, error);
//         throw error;
//     }
// };

// /**
//  * Axtarış funksiyası
//  */
// export const searchStocks = async (query: string) => {
//     try {
//         // Backend-də search /api/stocks/search altındadırsa:
//         const response = await api.get(`/stocks/search?q=${query}`);
//         return response.data;
//     } catch (error) {
//         console.error("Axtarış xətası:", error);
//         throw error;
//     }
// };

// /**
//  * Səhm Simulyasiyası (Kritik Düzəliş)
//  */
// export const simulateInvestment = async (symbol: string, amount: number, date: string) => {
//     try {
//         const response = await api.post('/stocks/simulate', { 
//             symbol: symbol.toUpperCase().trim(), 
//             amount: Number(amount), 
//             date: date 
//         });
//         return response.data; 
//     } catch (error: any) {
//         const errorMsg = error.response?.data?.message || "Simulyasiya xətası!";
//         throw new Error(errorMsg);
//     }
// };


import api from './api';

/**
 * Bütün səhmlərin siyahısını gətirir
 */
export const getAllStocks = async () => {
    try {
        const response = await api.get('/api/stocks');
        return response.data;
    } catch (error) {
        console.error("Səhmləri yükləyərkən xəta:", error);
        throw error;
    }
};

/**
 * Bir səhmin detallarını gətirir
 */
export const getStockDetails = async (symbol: string) => {
    try {
        const response = await api.get(`/api/stocks/${symbol}`);
        return response.data;
    } catch (error) {
        console.error(`${symbol} məlumatları yüklənmədi:`, error);
        throw error;
    }
};

/**
 * Qrafik datalarını gətirir
 */
export const getStockCandles = async (symbol: string) => {
    try {
        const response = await api.get(`/api/stocks/${symbol}/candles`);
        return response.data;
    } catch (error) {
        console.error(`${symbol} qrafik datası alınmadı:`, error);
        throw error;
    }
};

/**
 * Səhm xəbərlərini gətirir
 */
export const getStockNews = async (symbol: string) => {
    try {
        const response = await api.get(`/api/stocks/${symbol}/news`);
        return response.data;
    } catch (error) {
        console.error(`${symbol} xəbərləri alınmadı:`, error);
        throw error;
    }
};

/**
 * Axtarış funksiyası
 */
export const searchStocks = async (query: string) => {
    try {
        const response = await api.get(`/api/stocks/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Axtarış xətası:", error);
        throw error;
    }
};

/**
 * Səhm Simulyasiyası (Kritik Düzəliş)
 */
export const simulateInvestment = async (symbol: string, amount: number, date: string) => {
    try {
        const response = await api.post('/api/stocks/simulate', { 
            symbol: symbol.toUpperCase().trim(), 
            amount: Number(amount), 
            date: date 
        });
        return response.data; 
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || "Simulyasiya xətası!";
        throw new Error(errorMsg);
    }
};