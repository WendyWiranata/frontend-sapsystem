// src/components/Cuti/CutiTable.jsx
import React from 'react';

const CutiTable = ({ cutis, onEdit, onDelete, showKaryawanInfo = false, isManagerView = false }) => {
  if (!cutis || cutis.length === 0) {
    return <p>Tidak ada data cuti.</p>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="overflow-x-auto bg-white text-black rounded-lg shadow">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            {showKaryawanInfo && (
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Karyawan
              </th>
            )}
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tanggal Mulai
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tanggal Selesai
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Alasan
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {cutis.map((cuti) => (
            <tr key={cuti.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {cuti.id}
              </td>
              {showKaryawanInfo && (
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {cuti.karyawan?.user?.username || 'N/A'}
                </td>
              )}
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {formatDate(cuti.tanggalMulai)}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {formatDate(cuti.tanggalSelesai)}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {cuti.alasan}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    cuti.status === 'APPROVED' ? 'text-green-900' :
                    cuti.status === 'REJECTED' ? 'text-red-900' :
                    'text-yellow-900'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 opacity-50 rounded-full ${
                      cuti.status === 'APPROVED' ? 'bg-green-200' :
                      cuti.status === 'REJECTED' ? 'bg-red-200' :
                      'bg-yellow-200'
                    }`}
                  ></span>
                  <span className="relative">{cuti.status}</span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {isManagerView && cuti.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => onEdit(cuti)} // Membuka form untuk mengubah status
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full text-xs mr-2"
                    >
                      Ubah Status
                    </button>
                  </>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(cuti.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CutiTable;
