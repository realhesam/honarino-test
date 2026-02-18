import axios from 'axios';
const ACCESS_TOKEN_KEY = "access_token";

export const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

httpClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(err);
  }
);