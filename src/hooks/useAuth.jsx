// src/hooks/useAuth.jsx (KODE DIPERBAIKI)
import { useState, useEffect, createContext, useContext } from 'react';
import authService from '../services/auth.service';
import jwtDecode from 'jwt-decode'; // DIKOREKSI: Menggunakan default import

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [token, setToken] = useState(authService.getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!user && !!token);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // DIKOREKSI: Menambahkan useState()

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    const storedToken = authService.getToken();

    if (storedUser && storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken); // Gunakan jwtDecode
        // Cek apakah token masih berlaku
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(storedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
          setUserRole(storedUser.role);
        } else {
          // Token expired
          authService.logout();
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        // Token invalid
        console.error("Invalid token:", error);
        authService.logout();
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setToken(response.token);
      setIsAuthenticated(true);
      setUserRole(response.user.role);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (username, email, password, role, perusahaanId) => {
    try {
      const response = await authService.register(username, email, password, role, perusahaanId);
      return response;
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    userRole,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};