// src/api/RestaurantClient.ts
import axios from 'axios';
import { API_BASE_RESTAURANT_URL } from '../utils/constant';

interface RestaurantClientParams {
  [key: string]: string | number | boolean | undefined | null;
}

const RestaurantClient = async (endpoint: string, params: RestaurantClientParams = {}) => {
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  const url = `${API_BASE_RESTAURANT_URL}/${cleanEndpoint}`;
  try {
    const response = await axios.get(url, {
      params,
      responseType: 'text',
      timeout: 10000,
      validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status}`);
    }

    try {
      const json = JSON.parse(response.data);
      return json;
    } catch (parseError) {
      console.log("🚀 ~ RestaurantClient ~ parseError:", parseError)
      console.error('⚠️ Failed to parse JSON:', response.data);
      throw new Error('Invalid JSON response');
    }
  } catch (error: any) {
    throw error;
  }
};

export default RestaurantClient;
