// src/services/cuti.service.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth.service';

const API_URL = `${API_BASE_URL}/cuti`;

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mengambil semua data cuti (Admin Perusahaan / Karyawan)
const getAllCuti = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Membuat pengajuan cuti (Admin Perusahaan / Karyawan)
const createCuti = async (cutiData) => {
  try {
    const response = await axios.post(API_URL, cutiData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Memperbarui status cuti (Admin Perusahaan)
const updateStatusCuti = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Menghapus pengajuan cuti (Admin Perusahaan / Karyawan)
const deleteCuti = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const cutiService = {
  getAllCuti,
  createCuti,
  updateStatusCuti,
  deleteCuti,
};

export default cutiService;
