import axios, { type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';
import { ENV } from '@/config/env';

const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

const AUTH_TOKEN_HEADER = 'Authorization' as const;
const BEARER_PREFIX = 'Bearer ' as const;

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getToken();
    if (token && config.headers) {
      config.headers[AUTH_TOKEN_HEADER] = `${BEARER_PREFIX}${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: RetryConfig }) => {
    const { config, response } = error;

    if (!config || config._retry) {
      return Promise.reject(error);
    }

    const shouldRetry =
      !response &&
      (error.code === 'ECONNABORTED' ||
        error.code === 'ERR_NETWORK' ||
        error.message.includes('Network Error'));

    if (shouldRetry && (config._retryCount ?? 0) < MAX_RETRIES) {
      config._retry = true;
      config._retryCount = (config._retryCount ?? 0) + 1;

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * config._retryCount!));
      return api(config);
    }

    if (response?.status === 401) {
      await storage.clearAuth();
    }

    return Promise.reject(error);
  }
);

export default api;