import axios from 'axios';

// ─── Base Axios Instance ─────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request Interceptor: attach token ───────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: handle 401 + auto-refresh ─────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh for auth routes themselves
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/user/login') &&
      !originalRequest.url.includes('/user/register') &&
      !originalRequest.url.includes('/user/refresh-token')
    ) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = token;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = data.accessToken;
        localStorage.setItem('accessToken', newToken);
        API.defaults.headers.Authorization = newToken;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = newToken;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
