// src/pages/AdminPerusahaan/KaryawanManagementPage.jsx
import React, { useState, useEffect } from 'react';
import karyawanService from '../../services/karyawan.service';
import KaryawanTable from '../../components/Karyawan/KaryawanTable';
import KaryawanForm from '../../components/Karyawan/KaryawanForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const KaryawanManagementPage = () => {
  const { userRole } = useAuth();
  const [karyawans, setKaryawans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingKaryawan, setEditingKaryawan] = useState(null);

  const fetchKaryawans = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await karyawanService.getAllKaryawan();
      setKaryawans(data);
    } catch (err) {
      setError(err.error || 'Gagal memuat data karyawan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.ADMIN_PERUSAHAAN) {
      fetchKaryawans();
    }
  }, [userRole]);

  const handleCreateKaryawan = async (karyawanData) => {
    try {
      await karyawanService.createKaryawan(karyawanData);
      setShowForm(false);
      fetchKaryawans();
    } catch (err) {
      setError(err.error || 'Gagal membuat karyawan.');
    }
  };

  const handleUpdateKaryawan = async (id, karyawanData) => {
    try {
      await karyawanService.updateKaryawan(id, karyawanData);
      setShowForm(false);
      setEditingKaryawan(null);
      fetchKaryawans();
    } catch (err) {
      setError(err.error || 'Gagal memperbarui karyawan.');
    }
  };

  const handleDeleteKaryawan = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus karyawan ini? (Ini juga akan menghapus data gaji dan cuti terkait)')) {
      try {
        await karyawanService.deleteKaryawan(id);
        fetchKaryawans();
      } catch (err) {
        setError(err.error || 'Gagal menghapus karyawan.');
      }
    }
  };

  const startEdit = (karyawan) => {
    setEditingKaryawan(karyawan);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6">Memuat data karyawan...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Karyawan</h1>
      <button
        onClick={() => {
          setEditingKaryawan(null);
          setShowForm(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Tambah Karyawan Baru
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">
            {editingKaryawan ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}
          </h2>
          <KaryawanForm
            initialData={editingKaryawan}
            onSubmit={editingKaryawan ? handleUpdateKaryawan : handleCreateKaryawan}
            onCancel={() => {
              setShowForm(false);
              setEditingKaryawan(null);
            }}
          />
        </div>
      )}

      <KaryawanTable karyawans={karyawans} onEdit={startEdit} onDelete={handleDeleteKaryawan} />
    </div>
  );
};

export default KaryawanManagementPage;
