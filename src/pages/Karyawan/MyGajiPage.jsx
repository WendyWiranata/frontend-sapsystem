// src/pages/Karyawan/MyGajiPage.jsx
import React, { useState, useEffect } from 'react';
import gajiService from '../../services/gaji.service';
import GajiTable from '../../components/Gaji/GajiTable';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const MyGajiPage = () => {
  const { userRole, user } = useAuth();
  const [myGajis, setMyGajis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyGajis = async () => {
    setLoading(true);
    setError('');
    try {
      if (user && user.karyawan) { // Pastikan user adalah karyawan
        const data = await gajiService.getMyGaji();
        // Sortir data di frontend karena orderBy di Prisma dilarang
        const sortedData = data.sort((a, b) => {
          if (b.tahun !== a.tahun) {
            return b.tahun - a.tahun;
          }
          return b.bulan - a.bulan;
        });
        setMyGajis(sortedData);
      } else {
        setError("Anda bukan karyawan atau data karyawan tidak tersedia.");
      }
    } catch (err) {
      setError(err.error || 'Gagal memuat data gaji Anda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.KARYAWAN) {
      fetchMyGajis();
    }
  }, [userRole, user]); // Tambahkan user sebagai dependency

  if (loading) {
    return <div className="p-6">Memuat data gaji Anda...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gaji Saya</h1>
      <GajiTable gajis={myGajis} showKaryawanInfo={false} /> {/* Sembunyikan kolom karyawan untuk halaman ini */}
    </div>
  );
};

export default MyGajiPage;
