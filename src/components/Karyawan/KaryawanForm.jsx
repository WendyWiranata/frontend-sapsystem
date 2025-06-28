// src/components/Karyawan/KaryawanForm.jsx
import React, { useState, useEffect } from 'react';

const KaryawanForm = ({ initialData, onSubmit, onCancel }) => {
  const [nama, setNama] = useState(''); // Ini akan menjadi username
  const [email, setEmail] = useState(''); // Ini akan menjadi email user
  const [password, setPassword] = useState(''); // Password untuk user baru
  const [jabatan, setJabatan] = useState('');
  const [departemen, setDepartemen] = useState('');

  useEffect(() => {
    if (initialData) {
      setNama(initialData.user?.username || '');
      setEmail(initialData.user?.email || '');
      setPassword(''); // Password tidak diisi ulang saat edit untuk keamanan
      setJabatan(initialData.jabatan || '');
      setDepartemen(initialData.departemen || '');
    } else {
      setNama('');
      setEmail('');
      setPassword('');
      setJabatan('');
      setDepartemen('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama,
      email,
      password: password || undefined, // Hanya kirim password jika diisi
      jabatan,
      departemen,
    };

    if (initialData) {
      onSubmit(initialData.id, data); // Untuk update, kirim ID karyawan
    } else {
      onSubmit(data); // Untuk create
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama (Username)</label>
        <input
          type="text"
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password {initialData ? '(Kosongkan jika tidak diubah)' : '*'}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!initialData} // Wajib diisi hanya saat membuat baru
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="jabatan" className="block text-sm font-medium text-gray-700">Jabatan</label>
        <input
          type="text"
          id="jabatan"
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="departemen" className="block text-sm font-medium text-gray-700">Departemen</label>
        <input
          type="text"
          id="departemen"
          value={departemen}
          onChange={(e) => setDepartemen(e.target.value)}
          required
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

export default KaryawanForm;
