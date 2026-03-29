import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiCredentials } from '@/types/api';
import { getCredentials, clearCredentials } from '@/services/storage/secureStorage';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.umbler.com/talk/v1';
const TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT ?? 10000);

let currentCredentials: ApiCredentials | null = null;

export function setApiCredentials(creds: ApiCredentials): void {
  currentCredentials = creds;
}

export function clearApiCredentials(): void {
  currentCredentials = null;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let creds = currentCredentials;

    if (!creds) {
      creds = await getCredentials();
    }

    if (creds) {
      config.headers['Authorization'] = `Bearer ${creds.apiKey}`;
      config.headers['X-Organization-Id'] = creds.organizationId;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearApiCredentials();
      await clearCredentials();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
