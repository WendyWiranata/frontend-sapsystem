// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Import halaman manajemen
import CompanyManagementPage from './pages/SuperAdmin/CompanyManagementPage';
import UserManagementPage from './pages/SuperAdmin/UserManagementPage';
import KaryawanManagementPage from './pages/AdminPerusahaan/KaryawanManagementPage';
import GajiManagementPage from './pages/AdminPerusahaan/GajiManagementPage';
import CutiManagementPage from './pages/AdminPerusahaan/CutiManagementPage';
import MyGajiPage from './pages/Karyawan/MyGajiPage';
import MyCutiPage from './pages/Karyawan/MyCutiPage';

import { ROLES } from './utils/constants';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes - Menggunakan DashboardLayout */}
          <Route element={<ProtectedRoute roles={[ROLES.SUPERADMIN, ROLES.ADMIN_PERUSAHAAN, ROLES.KARYAWAN]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* SuperAdmin Routes */}
              <Route element={<ProtectedRoute roles={[ROLES.SUPERADMIN]} />}>
                <Route path="/perusahaan" element={<CompanyManagementPage />} />
                <Route path="/users" element={<UserManagementPage />} />
              </Route>

              {/* Admin Perusahaan Routes */}
              <Route element={<ProtectedRoute roles={[ROLES.ADMIN_PERUSAHAAN]} />}>
                <Route path="/karyawan" element={<KaryawanManagementPage />} />
                <Route path="/gaji" element={<GajiManagementPage />} />
                <Route path="/cuti" element={<CutiManagementPage />} />
              </Route>

              {/* Karyawan Routes */}
              <Route element={<ProtectedRoute roles={[ROLES.KARYAWAN]} />}>
                <Route path="/my-gaji" element={<MyGajiPage />} />
                <Route path="/my-cuti" element={<MyCutiPage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;