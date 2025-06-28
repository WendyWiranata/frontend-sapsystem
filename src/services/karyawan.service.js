// src/services/karyawan.service.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth.service';

const API_URL = `${API_BASE_URL}/karyawan`;

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mengambil semua karyawan (Admin Perusahaan)
const getAllKaryawan = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Mengambil karyawan berdasarkan ID (Admin Perusahaan)
const getKaryawanById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Membuat karyawan baru (Admin Perusahaan)
// Backend secara otomatis mengaitkan dengan perusahaan admin yang login
const createKaryawan = async (karyawanData) => {
  try {
    const response = await axios.post(API_URL, karyawanData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Memperbarui karyawan (Admin Perusahaan)
const updateKaryawan = async (id, karyawanData) => {
  try {
    // PerusahaanId dikirim untuk validasi di backend, pastikan diambil dari user yang login
    const user = authService.getCurrentUser();
    const dataToSend = { ...karyawanData, perusahaanId: user.perusahaan.id };
    const response = await axios.put(`${API_URL}/${id}`, dataToSend, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Menghapus karyawan (Admin Perusahaan)
const deleteKaryawan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const karyawanService = {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
};

export default karyawanService;
