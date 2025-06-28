// src/pages/Karyawan/MyCutiPage.jsx
import React, { useState, useEffect } from 'react';
import cutiService from '../../services/cuti.service';
import CutiTable from '../../components/Cuti/CutiTable';
import CutiForm from '../../components/Cuti/CutiForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const MyCutiPage = () => {
  const { userRole, user } = useAuth();
  const [myCutis, setMyCutis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchMyCutis = async () => {
    setLoading(true);
    setError('');
    try {
      if (user && user.karyawan) {
        const data = await cutiService.getAllCuti(); // Karyawan akan mendapatkan cuti mereka sendiri dari backend (berdasarkan middleware)
        // Filter di frontend jika backend getAllCuti mengembalikan semua cuti (meskipun middleware harusnya sudah membatasi)
        const filteredData = data.filter(cuti => cuti.karyawanId === user.karyawan.id);
        // Sortir data di frontend karena orderBy di Prisma dilarang
        const sortedData = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setMyCutis(sortedData);
      } else {
        setError("Anda bukan karyawan atau data karyawan tidak tersedia.");
      }
    } catch (err) {
      setError(err.error || 'Gagal memuat data cuti Anda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.KARYAWAN) {
      fetchMyCutis();
    }
  }, [userRole, user]); // Tambahkan user sebagai dependency

  const handleCreateCuti = async (cutiData) => {
    try {
      // Untuk karyawan, karyawanId otomatis diambil dari user yang login di backend
      // Jadi, di frontend kita hanya perlu kirim tanggal dan alasan
      const dataToSend = {
        tanggalMulai: cutiData.tanggalMulai,
        tanggalSelesai: cutiData.tanggalSelesai,
        alasan: cutiData.alasan,
        karyawanId: user.karyawan.id, // Pastikan karyawanId dikirim dari frontend untuk createCuti
      };
      await cutiService.createCuti(dataToSend);
      setShowForm(false);
      fetchMyCutis();
    } catch (err) {
      setError(err.error || 'Gagal mengajukan cuti.');
    }
  };

  const handleDeleteCuti = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengajuan cuti ini? Anda hanya bisa menghapus yang PENDING.')) {
      try {
        await cutiService.deleteCuti(id);
        fetchMyCutis();
      } catch (err) {
        setError(err.error || 'Gagal menghapus pengajuan cuti. Pastikan statusnya PENDING.');
      }
    }
  };

  if (loading) {
    return <div className="p-6">Memuat data cuti Anda...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cuti Saya</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Ajukan Cuti Baru
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Ajukan Cuti Baru</h2>
          <CutiForm
            onSubmit={handleCreateCuti}
            onCancel={() => setShowForm(false)}
            karyawanList={[{ id: user.karyawan.id, user: { username: user.username } }]} // Hanya kirim info karyawan yang sedang login
            isUpdateStatusOnly={false} // Selalu false untuk pengajuan cuti
          />
        </div>
      )}

      <CutiTable
        cutis={myCutis}
        onDelete={handleDeleteCuti}
        showKaryawanInfo={false} // Sembunyikan kolom karyawan untuk halaman ini
        isManagerView={false} // Matikan fitur ubah status
      />
    </div>
  );
};

export default MyCutiPage;
