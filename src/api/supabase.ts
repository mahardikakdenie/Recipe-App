// src/api/apiClient.ts
import axios, { AxiosRequestConfig } from 'axios';
// import { API_BASE_URL } from '../utils/constant';

interface ApiClientParams {
  [key: string]: string | number | boolean | undefined | null;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
  method?: HttpMethod;
  params?: ApiClientParams;        // for GET query params
  data?: any;                      // for POST/PUT body
  headers?: Record<string, string>;
  timeout?: number;
}

const apiClient = async <T = any>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const {
    method = 'GET',
    params = {},
    data = undefined,
    headers = {},
    timeout = 10000,
  } = options;

  const cleanEndpoint = endpoint.replace(/^\/+/, '');
//   const url = `${API_BASE_URL}/${cleanEndpoint}`;
  const url = `${cleanEndpoint}`;
  console.log("🚀 ~ apiClient ~ url:", url)

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout,
    validateStatus: () => true, // biarkan kita handle status manual
  };

  if (method === 'GET') {
    config.params = params;
  } else {
    config.data = data;
  }

  try {
    const response = await axios(config);

    if (response.status < 200 || response.status >= 300) {
    const error = new Error(`HTTP ${response.status}`);
      (error as any).status = response.status;
      throw error;
    }

    // Attempt to parse JSON only if response exists and is not empty
    if (response.data === '' || response.data == null) {
      return undefined as T;
    }

    if (typeof response.data === 'object') {
      return response.data as T;
    }

    try {
      const json = JSON.parse(response.data);
      return json as T;
    } catch (parseError) {
      console.log("🚀 ~ apiClient ~ parseError:", parseError)
      console.warn('⚠️ Failed to parse JSON:', response.data);
      throw new Error('Invalid JSON response');
    }
  } catch (error: any) {
    throw error;
  }
};

// Convenience wrappers
export const get = <T = any>(endpoint: string, params?: ApiClientParams) =>
  apiClient<T>(endpoint, { method: 'GET', params });

export const post = <T = any>(endpoint: string, data?: any, headers?: Record<string, string>) =>
  apiClient<T>(endpoint, { method: 'POST', data, headers });

export const put = <T = any>(endpoint: string, data?: any, headers?: Record<string, string>) =>
  apiClient<T>(endpoint, { method: 'PUT', data, headers });

export const del = <T = any>(endpoint: string, params?: ApiClientParams) =>
  apiClient<T>(endpoint, { method: 'DELETE', params });

export default apiClient;
