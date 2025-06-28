import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const API_URL = `${API_BASE_URL}/auth`;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const register = async (username, email, password, role, perusahaanId) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
      perusahaanId: role === "SUPERADMIN" ? null : perusahaanId, // Perhatikan logic perusahaanId sesuai backend
    });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  return localStorage.getItem('token');
}

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
};

export default authService;