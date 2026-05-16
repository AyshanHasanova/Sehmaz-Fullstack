import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sehmaz-fullstack.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log('FULL REQUEST URL:', config.baseURL + config.url);

    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
                                    
export default api;