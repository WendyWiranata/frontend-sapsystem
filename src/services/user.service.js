// src/services/user.service.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth.service';

const API_URL = `${API_BASE_URL}/users`;

// Fungsi untuk mendapatkan header otorisasi (token JWT)
const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mengambil semua user (hanya SuperAdmin)
const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Mengambil user berdasarkan ID (hanya SuperAdmin)
const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Membuat user baru (hanya SuperAdmin)
const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Memperbarui user (hanya SuperAdmin)
const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Menghapus user (hanya SuperAdmin)
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
