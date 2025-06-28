import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500">Anda tidak login.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil Pengguna</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <div className="mb-4">
          <p className="text-gray-600">Username:</p>
          <p className="text-lg font-semibold">{user.username}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Email:</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Peran:</p>
          <p className="text-lg font-semibold">{user.role}</p>
        </div>
        {user.perusahaan && (
          <div className="mb-4">
            <p className="text-gray-600">Perusahaan:</p>
            <p className="text-lg font-semibold">{user.perusahaan.nama}</p>
          </div>
        )}
        {user.karyawan && (
          <>
            <div className="mb-4">
              <p className="text-gray-600">Jabatan:</p>
              <p className="text-lg font-semibold">{user.karyawan.jabatan}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Departemen:</p>
              <p className="text-lg font-semibold">{user.karyawan.departemen}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;