import React from 'react';

const CompanyTable = ({ companies, onEdit, onDelete }) => {
  if (!companies || companies.length === 0) {
    return <p>Tidak ada data perusahaan.</p>;
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
              Nama
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Telepon
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Alamat
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {company.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {company.nama}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {company.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {company.telepon}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {company.alamat}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  onClick={() => onEdit(company)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(company.id)}
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

export default CompanyTable;