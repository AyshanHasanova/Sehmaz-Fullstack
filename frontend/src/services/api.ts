import axios from 'axios';

// 1. Axios instance yaradılır
const api = axios.create({
  // Sonuna birbaşa /api əlavə etdik ki, servislərdə bir də yazmayaq
  baseURL: import.meta.env.PROD 
    ? 'https://sehmaz-fullstack.onrender.com/api' 
    : 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// 2. Interceptor (İstək öncəsi hazırlıq)
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

// 3. Response Interceptor (Xətaların mərkəzi idarəsi)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Giriş icazəsi yoxdur və ya vaxtı bitib.");
    }
    return Promise.reject(error);
  }
);

export default api;