// src/pages/SuperAdmin/UserManagementPage.jsx
import React, { useState, useEffect } from 'react';
import userService from '../../services/user.service';
import UserTable from '../../components/User/UserTable';
import UserForm from '../../components/User/UserForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import perusahaanService from '../../services/perusahaan.service'; // Untuk dropdown perusahaan di form user

const UserManagementPage = () => {
  const { userRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [perusahaanList, setPerusahaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fungsi untuk mengambil data user
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.error || 'Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil daftar perusahaan (dibutuhkan untuk form user)
  const fetchPerusahaanList = async () => {
    try {
      const data = await perusahaanService.getAllPerusahaan(); // Pastikan SuperAdmin bisa akses endpoint ini
      setPerusahaanList(data);
    } catch (err) {
      console.error("Gagal memuat daftar perusahaan:", err);
      //setError(err.error || 'Gagal memuat daftar perusahaan untuk form.'); // Tampilkan error jika perlu
    }
  };

  useEffect(() => {
    if (userRole === ROLES.SUPERADMIN) {
      fetchUsers();
      fetchPerusahaanList(); // Ambil daftar perusahaan saat komponen dimuat
    }
  }, [userRole]);

  // Handler untuk membuat user baru
  const handleCreateUser = async (userData) => {
    try {
      await userService.createUser(userData);
      setShowForm(false);
      fetchUsers(); // Refresh daftar user
    } catch (err) {
      setError(err.error || 'Gagal membuat pengguna.');
    }
  };

  // Handler untuk memperbarui user
  const handleUpdateUser = async (id, userData) => {
    try {
      await userService.updateUser(id, userData);
      setShowForm(false);
      setEditingUser(null);
      fetchUsers(); // Refresh daftar user
    } catch (err) {
      setError(err.error || 'Gagal memperbarui pengguna.');
    }
  };

  // Handler untuk menghapus user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers(); // Refresh daftar user
      } catch (err) {
        setError(err.error || 'Gagal menghapus pengguna.');
      }
    }
  };

  // Memulai mode edit
  const startEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6">Memuat data pengguna...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Pengguna</h1>
      <button
        onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Tambah Pengguna Baru
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
          </h2>
          <UserForm
            initialData={editingUser}
            perusahaanList={perusahaanList} // Teruskan daftar perusahaan ke form
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
          />
        </div>
      )}

      <UserTable users={users} onEdit={startEdit} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserManagementPage;
