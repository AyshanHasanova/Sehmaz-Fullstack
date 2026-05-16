import axios from 'axios';

const api = axios.create({
  // Bura diqqət: .env-i sildik, birbaşa canlı backend linkini yazdıq
  baseURL: 'https://sehmaz-fullstack.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;