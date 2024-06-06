import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/fetch-all-products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
