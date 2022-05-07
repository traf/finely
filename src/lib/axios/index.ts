import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create();

const requestDefaults = {
  timeout: 10000, // 10sec
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

api.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    return {
      baseURL: '/api',
      ...requestDefaults,
      ...config
    };
  },
  (error) => Promise.reject(error)
);

export { api };
