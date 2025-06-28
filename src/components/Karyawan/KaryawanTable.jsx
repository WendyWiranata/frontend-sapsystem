// src/components/Karyawan/KaryawanTable.jsx
import React from 'react';

const KaryawanTable = ({ karyawans, onEdit, onDelete }) => {
  if (!karyawans || karyawans.length === 0) {
    return <p>Tidak ada data karyawan.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Jabatan
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Departemen
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {karyawans.map((karyawan) => (
            <tr key={karyawan.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {karyawan.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {karyawan.user?.username || 'N/A'}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {karyawan.user?.email || 'N/A'}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {karyawan.jabatan}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {karyawan.departemen}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  onClick={() => onEdit(karyawan)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(karyawan.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KaryawanTable;
