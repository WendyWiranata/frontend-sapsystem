import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth.service';

const API_URL = `${API_BASE_URL}/perusahaan`;

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllPerusahaan = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const getPerusahaanById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const createPerusahaan = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const updatePerusahaan = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const deletePerusahaan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const perusahaanService = {
  getAllPerusahaan,
  getPerusahaanById,
  createPerusahaan,
  updatePerusahaan,
  deletePerusahaan,
};

export default perusahaanService;