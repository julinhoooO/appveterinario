import axios from 'axios';
import config from '../config/api';

const api = axios.create({
  baseURL: config.apiUrl,
});

export default api;
