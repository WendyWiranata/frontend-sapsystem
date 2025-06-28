import React, { useState, useEffect } from 'react';
import perusahaanService from '../../services/perusahaan.service';
import CompanyTable from '../../components/Company/CompanyTable';
import CompanyForm from '../../components/Company/CompanyForm';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const CompanyManagementPage = () => {
  const { userRole } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await perusahaanService.getAllPerusahaan();
      setCompanies(data);
    } catch (err) {
      setError(err.error || 'Gagal memuat data perusahaan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === ROLES.SUPERADMIN) {
      fetchCompanies();
    }
  }, [userRole]);

  const handleCreateCompany = async (companyData) => {
    try {
      await perusahaanService.createPerusahaan(companyData);
      setShowForm(false);
      fetchCompanies();
    } catch (err) {
      setError(err.error || 'Gagal membuat perusahaan.');
    }
  };

  const handleUpdateCompany = async (id, companyData) => {
    try {
      await perusahaanService.updatePerusahaan(id, companyData);
      setShowForm(false);
      setEditingCompany(null);
      fetchCompanies();
    } catch (err) {
      setError(err.error || 'Gagal memperbarui perusahaan.');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus perusahaan ini?')) {
      try {
        await perusahaanService.deletePerusahaan(id);
        fetchCompanies();
      } catch (err) {
        setError(err.error || 'Gagal menghapus perusahaan.');
      }
    }
  };

  const startEdit = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6">Memuat data perusahaan...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Perusahaan</h1>
      <button
        onClick={() => {
          setEditingCompany(null);
          setShowForm(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Tambah Perusahaan
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">
            {editingCompany ? 'Edit Perusahaan' : 'Tambah Perusahaan Baru'}
          </h2>
          <CompanyForm
            initialData={editingCompany}
            onSubmit={editingCompany ? handleUpdateCompany : handleCreateCompany}
            onCancel={() => {
              setShowForm(false);
              setEditingCompany(null);
            }}
          />
        </div>
      )}

      <CompanyTable companies={companies} onEdit={startEdit} onDelete={handleDeleteCompany} />
    </div>
  );
};

export default CompanyManagementPage;