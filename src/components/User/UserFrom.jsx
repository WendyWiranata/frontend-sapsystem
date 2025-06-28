// src/components/User/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { ROLES } from '../../utils/constants';

const UserForm = ({ initialData, perusahaanList, onSubmit, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.KARYAWAN); // Default role
  const [perusahaanId, setPerusahaanId] = useState('');

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username || '');
      setEmail(initialData.email || '');
      // Password tidak diisi ulang saat edit untuk keamanan, biarkan kosong
      setPassword('');
      setRole(initialData.role || ROLES.KARYAWAN);
      setPerusahaanId(initialData.perusahaanId || '');
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setRole(ROLES.KARYAWAN);
      setPerusahaanId(perusahaanList.length > 0 ? perusahaanList[0].id : ''); // Set default jika ada
    }
  }, [initialData, perusahaanList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password: password || undefined, // Hanya kirim password jika diisi (untuk update)
      role,
      perusahaanId: role === ROLES.SUPERADMIN ? null : (perusahaanId ? parseInt(perusahaanId) : null),
    };

    if (initialData) {
      onSubmit(initialData.id, data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {Object.values(ROLES).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      {role !== ROLES.SUPERADMIN && (
        <div>
          <label htmlFor="perusahaanId" className="block text-sm font-medium text-gray-700">Perusahaan</label>
          <select
            id="perusahaanId"
            value={perusahaanId}
            onChange={(e) => setPerusahaanId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required={role !== ROLES.SUPERADMIN}
            disabled={perusahaanList.length === 0}
          >
            <option value="">Pilih Perusahaan</option>
            {perusahaanList.map((perusahaan) => (
              <option key={perusahaan.id} value={perusahaan.id}>{perusahaan.nama}</option>
            ))}
          </select>
        </div>
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
          {initialData ? 'Update' : 'Simpan'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
