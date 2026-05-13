import axios from 'axios';

// 1. Axios instance yaradılır
const api = axios.create({
  // Backend ünvanı .env faylından oxunur 
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 saniyədən çox çəkən istəklər ləğv edilir
});

// 2. Interceptor (İstək öncəsi hazırlıq) [cite: 98]
// Bu hissə gələcəkdə (Faza 3-də) hər istəyə avtomatik JWT token əlavə etmək üçün lazım olacaq [cite: 135]
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Xətaların mərkəzi idarəsi) [cite: 98, 105]
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Məsələn: Əgər tokenin vaxtı bitibsə (401), istifadəçini login-ə göndər [cite: 98]
    if (error.response && error.response.status === 401) {
      console.error("Giriş icazəsi yoxdur və ya vaxtı bitib.");
    }
    return Promise.reject(error);
  }
);

export default api;