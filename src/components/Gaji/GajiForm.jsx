// src/components/Gaji/GajiForm.jsx
import React, { useState, useEffect } from 'react';

const GajiForm = ({ initialData, karyawanList, onSubmit, onCancel }) => {
  const [karyawanId, setKaryawanId] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [bulan, setBulan] = useState(new Date().getMonth() + 1); // Default bulan sekarang
  const [tahun, setTahun] = useState(new Date().getFullYear()); // Default tahun sekarang

  useEffect(() => {
    if (initialData) {
      setKaryawanId(initialData.karyawanId || '');
      setJumlah(initialData.jumlah || '');
      setBulan(initialData.bulan || new Date().getMonth() + 1);
      setTahun(initialData.tahun || new Date().getFullYear());
    } else {
      setKaryawanId(karyawanList.length > 0 ? karyawanList[0].id : ''); // Default karyawan pertama
      setJumlah('');
      setBulan(new Date().getMonth() + 1);
      setTahun(new Date().getFullYear());
    }
  }, [initialData, karyawanList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      karyawanId: parseInt(karyawanId),
      jumlah: parseFloat(jumlah),
      bulan: parseInt(bulan),
      tahun: parseInt(tahun),
    };

    if (initialData) {
      onSubmit(initialData.id, data);
    } else {
      onSubmit(data);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(0, i).toLocaleString('id-ID', { month: 'long' }),
  }));

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i); // 2 tahun lalu sampai 2 tahun ke depan

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="karyawanId" className="block text-sm font-medium text-gray-700">Karyawan</label>
        <select
          id="karyawanId"
          value={karyawanId}
          onChange={(e) => setKaryawanId(e.target.value)}
          required
          disabled={!!initialData} // Tidak bisa mengubah karyawan saat edit
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Pilih Karyawan</option>
          {karyawanList.map((karyawan) => (
            <option key={karyawan.id} value={karyawan.id}>
              {karyawan.user?.username || `Karyawan ID ${karyawan.id}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bulan" className="block text-sm font-medium text-gray-700">Bulan</label>
        <select
          id="bulan"
          value={bulan}
          onChange={(e) => setBulan(e.target.value)}
          required
          disabled={!!initialData} // Tidak bisa mengubah bulan saat edit
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tahun" className="block text-sm font-medium text-gray-700">Tahun</label>
        <select
          id="tahun"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          required
          disabled={!!initialData} // Tidak bisa mengubah tahun saat edit
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">Jumlah Gaji</label>
        <input
          type="number"
          id="jumlah"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {initialData ? 'Update' : 'Simpan'}
        </button>
      </div>
    </form>
  );
};

export default GajiForm;
