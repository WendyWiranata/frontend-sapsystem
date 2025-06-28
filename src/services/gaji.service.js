// src/services/gaji.service.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth.service';

const API_URL = `${API_BASE_URL}/gaji`;

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Membuat data gaji (Admin Perusahaan)
const createGaji = async (gajiData) => {
  try {
    const response = await axios.post(API_URL, gajiData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Mengambil gaji berdasarkan ID Karyawan (Admin Perusahaan / Karyawan)
const getGajiByKaryawan = async (karyawanId) => {
  try {
    const response = await axios.get(`${API_URL}/karyawan/${karyawanId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Mengambil gaji milik sendiri (Karyawan)
const getMyGaji = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Memperbarui gaji (Admin Perusahaan)
const updateGaji = async (id, gajiData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, gajiData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Menghapus gaji (Admin Perusahaan)
const deleteGaji = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const gajiService = {
  createGaji,
  getGajiByKaryawan,
  getMyGaji,
  updateGaji,
  deleteGaji,
};

export default gajiService;
