// src/pages/AdminPerusahaan/GajiManagementPage.jsx
import React, { useState, useEffect } from 'react';
import gajiService from '../../services/gaji.service';
import karyawanService from '../../services/karyawan.service'; // Untuk dropdown karyawan
import GajiTable from '../../components/Gaji/GajiTable';
import GajiForm from '../../components/Gaji/GajiForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const GajiManagementPage = () => {
  const { userRole } = useAuth();
  const [gajis, setGajis] = useState([]);
  const [karyawanList, setKaryawanList] = useState([]); // Untuk dropdown karyawan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingGaji, setEditingGaji] = useState(null);

  const fetchGajis = async () => {
    setLoading(true);
    setError('');
    try {

      const allKaryawan = await karyawanService.getAllKaryawan();
      const allGajis = [];
      for (const karyawan of allKaryawan) {
        try {
          const gajiKaryawan = await gajiService.getGajiByKaryawan(karyawan.id);
          // Tambahkan info karyawan ke setiap item gaji
          const gajiWithKaryawanInfo = gajiKaryawan.map(g => ({
            ...g,
            karyawan: {
              ...g.karyawan, // Ambil info karyawan yang sudah ada dari backend
              id: karyawan.id,
              username: karyawan.user.username,
              email: karyawan.user.email,
              jabatan: karyawan.jabatan,
              departemen: karyawan.departemen
            }
          }));
          allGajis.push(...gajiWithKaryawanInfo);
        } catch (gajiErr) {
          console.warn(`Gagal memuat gaji untuk karyawan ID ${karyawan.id}:`, gajiErr);
        }
      }
      // Urutkan berdasarkan tahun dan bulan secara menurun
      const sortedGajis = allGajis.sort((a, b) => {
        if (b.tahun !== a.tahun) {
          return b.tahun - a.tahun;
        }
        return b.bulan - a.bulan;
      });

      setGajis(sortedGajis);
      setKaryawanList(allKaryawan); // Simpan daftar karyawan untuk dropdown
    } catch (err) {
      setError(err.error || 'Gagal memuat data gaji atau daftar karyawan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.ADMIN_PERUSAHAAN) {
      fetchGajis();
    }
  }, [userRole]);

  const handleCreateGaji = async (gajiData) => {
    try {
      await gajiService.createGaji(gajiData);
      setShowForm(false);
      fetchGajis();
    } catch (err) {
      setError(err.error || 'Gagal membuat data gaji.');
    }
  };

  const handleUpdateGaji = async (id, gajiData) => {
    try {
      await gajiService.updateGaji(id, gajiData);
      setShowForm(false);
      setEditingGaji(null);
      fetchGajis();
    } catch (err) {
      setError(err.error || 'Gagal memperbarui data gaji.');
    }
  };

  const handleDeleteGaji = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data gaji ini?')) {
      try {
        await gajiService.deleteGaji(id);
        fetchGajis();
      } catch (err) {
        setError(err.error || 'Gagal menghapus data gaji.');
      }
    }
  };

  const startEdit = (gaji) => {
    setEditingGaji(gaji);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6">Memuat data gaji...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Gaji</h1>
      <button
        onClick={() => {
          setEditingGaji(null);
          setShowForm(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-black
         font-bold py-2 px-4 rounded mb-4"
      >
        Tambah Data Gaji
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">
            {editingGaji ? 'Edit Data Gaji' : 'Tambah Data Gaji Baru'}
          </h2>
          <GajiForm
            initialData={editingGaji}
            karyawanList={karyawanList} // Teruskan daftar karyawan
            onSubmit={editingGaji ? handleUpdateGaji : handleCreateGaji}
            onCancel={() => {
              setShowForm(false);
              setEditingGaji(null);
            }}
          />
        </div>
      )}

      <GajiTable gajis={gajis} onEdit={startEdit} onDelete={handleDeleteGaji} />
    </div>
  );
};

export default GajiManagementPage;
