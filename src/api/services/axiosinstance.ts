import axios from 'axios';
 export const API_URL = 'http://localhost:8000';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
