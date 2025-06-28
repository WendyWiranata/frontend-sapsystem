// src/components/Gaji/GajiTable.jsx
import React from 'react';

const GajiTable = ({ gajis, onEdit, onDelete, showKaryawanInfo = true }) => {
  if (!gajis || gajis.length === 0) {
    return <p>Tidak ada data gaji.</p>;
  }

  // Helper untuk format bulan
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Bulan di Date object adalah 0-11
    return date.toLocaleString('id-ID', { month: 'long' });
  };

  // Helper untuk format jumlah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
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
              Bulan/Tahun
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Jumlah
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {gajis.map((gaji) => (
            <tr key={gaji.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {gaji.id}
              </td>
              {showKaryawanInfo && (
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {gaji.karyawan?.user?.username || 'N/A'} ({gaji.karyawan?.jabatan || 'N/A'})
                </td>
              )}
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {getMonthName(gaji.bulan)} {gaji.tahun}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {formatCurrency(gaji.jumlah)}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {onEdit && ( // Tampilkan tombol edit hanya jika onEdit disediakan
                  <button
                    onClick={() => onEdit(gaji)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                )}
                {onDelete && ( // Tampilkan tombol delete hanya jika onDelete disediakan
                  <button
                    onClick={() => onDelete(gaji.id)}
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

export default GajiTable;
