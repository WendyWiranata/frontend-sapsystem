// src/components/Cuti/CutiForm.jsx
import React, { useState, useEffect } from 'react';

const CutiForm = ({ initialData, karyawanList, onSubmit, onCancel, isUpdateStatusOnly = false }) => {
  const [karyawanId, setKaryawanId] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [alasan, setAlasan] = useState('');
  const [status, setStatus] = useState('PENDING'); // Default status

  useEffect(() => {
    if (initialData) {
      setKaryawanId(initialData.karyawanId || '');
      setTanggalMulai(initialData.tanggalMulai ? new Date(initialData.tanggalMulai).toISOString().split('T')[0] : '');
      setTanggalSelesai(initialData.tanggalSelesai ? new Date(initialData.tanggalSelesai).toISOString().split('T')[0] : '');
      setAlasan(initialData.alasan || '');
      setStatus(initialData.status || 'PENDING');
    } else {
      setKaryawanId(karyawanList.length > 0 ? karyawanList[0].id : ''); // Default karyawan pertama
      setTanggalMulai('');
      setTanggalSelesai('');
      setAlasan('');
      setStatus('PENDING');
    }
  }, [initialData, karyawanList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateStatusOnly) {
      onSubmit(initialData.id, status); // Hanya kirim ID dan status untuk update status
    } else {
      const data = {
        karyawanId: parseInt(karyawanId),
        tanggalMulai,
        tanggalSelesai,
        alasan,
        status: 'PENDING', // Cuti baru selalu PENDING
      };
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isUpdateStatusOnly && ( // Tampilkan ini hanya saat membuat cuti baru
        <div>
          <label htmlFor="karyawanId" className="block text-sm font-medium text-gray-700">Karyawan</label>
          <select
            id="karyawanId"
            value={karyawanId}
            onChange={(e) => setKaryawanId(e.target.value)}
            required
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
      )}

      {isUpdateStatusOnly ? ( // Jika hanya update status, tampilkan info cuti dan pilihan status
        <>
          <p className="text-gray-700">Pengajuan cuti oleh: <strong>{initialData.karyawan?.user?.username || 'N/A'}</strong></p>
          <p className="text-gray-700">Periode: <strong>{new Date(initialData.tanggalMulai).toLocaleDateString()} - {new Date(initialData.tanggalSelesai).toLocaleDateString()}</strong></p>
          <p className="text-gray-700">Alasan: <strong>{initialData.alasan}</strong></p>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status Cuti</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </>
      ) : ( // Jika membuat cuti baru, tampilkan form lengkap
        <>
          <div>
            <label htmlFor="tanggalMulai" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
            <input
              type="date"
              id="tanggalMulai"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="tanggalSelesai" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
            <input
              type="date"
              id="tanggalSelesai"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="alasan" className="block text-sm font-medium text-gray-700">Alasan Cuti</label>
            <textarea
              id="alasan"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              required
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
        </>
      )}

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
          {isUpdateStatusOnly ? 'Update Status' : 'Ajukan Cuti'}
        </button>
      </div>
    </form>
  );
};

export default CutiForm;
