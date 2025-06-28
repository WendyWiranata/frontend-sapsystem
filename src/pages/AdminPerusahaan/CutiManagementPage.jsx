// src/pages/AdminPerusahaan/CutiManagementPage.jsx
import React, { useState, useEffect } from 'react';
import cutiService from '../../services/cuti.service';
import karyawanService from '../../services/karyawan.service'; // Untuk dropdown karyawan di form
import CutiTable from '../../components/Cuti/CutiTable';
import CutiForm from '../../components/Cuti/CutiForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const CutiManagementPage = () => {
  const { userRole } = useAuth();
  const [cutis, setCutis] = useState([]);
  const [karyawanList, setKaryawanList] = useState([]); // Untuk dropdown karyawan di form
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCuti, setEditingCuti] = useState(null);

  const fetchCuti = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await cutiService.getAllCuti();
      // Sortir data di frontend karena orderBy di Prisma dilarang
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCutis(sortedData);

      // Ambil daftar karyawan untuk form
      const allKaryawan = await karyawanService.getAllKaryawan();
      setKaryawanList(allKaryawan);
    } catch (err) {
      setError(err.error || 'Gagal memuat data cuti.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.ADMIN_PERUSAHAAN) {
      fetchCuti();
    }
  }, [userRole]);

  const handleCreateCuti = async (cutiData) => {
    try {
      await cutiService.createCuti(cutiData);
      setShowForm(false);
      fetchCuti();
    } catch (err) {
      setError(err.error || 'Gagal membuat pengajuan cuti.');
    }
  };

  const handleUpdateStatusCuti = async (id, status) => {
    try {
      await cutiService.updateStatusCuti(id, status);
      fetchCuti();
    } catch (err) {
      setError(err.error || 'Gagal memperbarui status cuti.');
    }
  };

  const handleDeleteCuti = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengajuan cuti ini?')) {
      try {
        await cutiService.deleteCuti(id);
        fetchCuti();
      } catch (err) {
        setError(err.error || 'Gagal menghapus pengajuan cuti.');
      }
    }
  };

  const startEdit = (cuti) => {
    // Untuk admin, edit hanya berarti mengubah status
    setEditingCuti(cuti);
    setShowForm(true); // Tampilkan form untuk ubah status
  };

  if (loading) {
    return <div className="p-6">Memuat data cuti...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Cuti</h1>
      <button
        onClick={() => {
          setEditingCuti(null); // Pastikan form dalam mode create
          setShowForm(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Buat Pengajuan Cuti
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">
            {editingCuti ? 'Perbarui Status Cuti' : 'Buat Pengajuan Cuti Baru'}
          </h2>
          <CutiForm
            initialData={editingCuti}
            karyawanList={karyawanList} // Teruskan daftar karyawan
            isUpdateStatusOnly={!!editingCuti} // Mode khusus untuk update status
            onSubmit={editingCuti ? handleUpdateStatusCuti : handleCreateCuti}
            onCancel={() => {
              setShowForm(false);
              setEditingCuti(null);
            }}
          />
        </div>
      )}

      <CutiTable
        cutis={cutis}
        onEdit={startEdit} // Admin bisa mengubah status cuti
        onDelete={handleDeleteCuti}
        showKaryawanInfo={true} // Tampilkan kolom karyawan
        isManagerView={true} // Aktifkan tombol status
      />
    </div>
  );
};

export default CutiManagementPage;
