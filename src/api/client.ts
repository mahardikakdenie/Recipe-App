// src/api/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/constant';

interface ApiClientParams {
  [key: string]: string | number | boolean | undefined | null;
}

const apiClient = async (endpoint: string, params: ApiClientParams = {}) => {
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  const url = `${API_BASE_URL}/${cleanEndpoint}`;
  try {
    const response = await axios.get(url, {
      params,
      responseType: 'text',
      timeout: 10000,
      validateStatus: () => true,
    });

    console.log('⬅️ Status:', response.status);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status}`);
    }

    try {
      const json = JSON.parse(response.data);
      return json;
    } catch (parseError) {
      console.log("🚀 ~ apiClient ~ parseError:", parseError)
      console.error('⚠️ Failed to parse JSON:', response.data);
      throw new Error('Invalid JSON response');
    }
  } catch (error: any) {
    throw error;
  }
};

export default apiClient;
