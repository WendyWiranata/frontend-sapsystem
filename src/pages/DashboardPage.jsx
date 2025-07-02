// src/pages/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // <-- PATH DIPERBAIKI

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Selamat Datang di Dashboard</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg text-gray-700">
            Anda login sebagai: <span className="font-semibold">{user.username}</span>
          </p>
          <p className="text-lg text-gray-700">
            Peran Anda: <span className="font-semibold">{user.role}</span>
          </p>
          {user.perusahaan && (
            <p className="text-lg text-gray-700">
              Perusahaan: <span className="font-semibold">{user.perusahaan.nama}</span>
            </p>
          )}
        </div>
      )}
      <p className="mt-4 text-gray-600">
        Gunakan sidebar di kiri untuk menavigasi sesuai dengan hak akses Anda.
      </p>
    </div>
  );
};

export default DashboardPage;