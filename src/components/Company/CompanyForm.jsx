import React, { useState, useEffect } from 'react';

const CompanyForm = ({ initialData, onSubmit, onCancel }) => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama || '');
      setAlamat(initialData.alamat || '');
      setTelepon(initialData.telepon || '');
      setEmail(initialData.email || '');
    } else {
      setNama('');
      setAlamat('');
      setTelepon('');
      setEmail('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nama, alamat, telepon, email };
    if (initialData) {
      onSubmit(initialData.id, data); // Untuk update, kirim ID
    } else {
      onSubmit(data); // Untuk create
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
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
        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
        <input
          type="text"
          id="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">Telepon</label>
        <input
          type="text"
          id="telepon"
          value={telepon}
          onChange={(e) => setTelepon(e.target.value)}
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

export default CompanyForm;