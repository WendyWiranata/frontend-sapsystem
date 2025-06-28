import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL, ROLES } from '../../utils/constants'; // Import API_BASE_URL dan ROLES
import axios from 'axios'; // Import axios untuk fetch daftar perusahaan

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.KARYAWAN); // Default role
  const [perusahaanId, setPerusahaanId] = useState('');
  const [perusahaanList, setPerusahaanList] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Fetch daftar perusahaan jika role yang dipilih bukan SUPERADMIN
  useEffect(() => {
    const fetchPerusahaan = async () => {
      if (role !== ROLES.SUPERADMIN) {
        try {
          // Endpoint untuk mendapatkan daftar perusahaan
          // Karena ini pendaftaran awal, asumsikan endpoint ini public atau tidak memerlukan auth
          // Jika backend Anda melindungi ini, Anda perlu penyesuaian atau data perusahaan dummy.
          // Berdasarkan `perusahaanRoutes.js` Anda, `getAllPerusahaan` memerlukan authenticate dan role SUPERADMIN.
          // Untuk registrasi ini, kita akan asumsikan ada endpoint public yang memberikan daftar perusahaan atau ini diisi manual/dipilih dari daftar yang terbatas.
          // Untuk demo, kita akan simulasikan atau Anda perlu membuat endpoint khusus di backend untuk daftar perusahaan public.
          // ATAU, jika ADMIN_PERUSAHAAN mendaftarkan KARYAWAN, maka perusahaanId diambil dari admin yang login.
          // Untuk kesederhanaan, kita akan asumsikan SUPERADMIN mendaftarkan semua role atau ada daftar perusahaan yang bisa diambil.
          // Jika `getAllPerusahaan` butuh Auth, ini perlu disesuaikan. Kita akan pakai dummy data atau Anda harus membuat endpoint public.

          // Untuk tujuan registrasi, asumsikan endpoint ini bisa diakses tanpa otorisasi
          // atau data perusahaan diberikan secara statis/melalui cara lain
          // Contoh: Jika Anda memiliki endpoint public untuk daftar perusahaan
          const response = await axios.get(`${API_BASE_URL}/perusahaan`, {
            headers: {
              // Untuk saat ini, kita bisa melewati autentikasi jika endpoint /api/perusahaan diubah menjadi public untuk pendaftaran,
              // atau admin perusahaan yang login akan mendaftarkan karyawan
              // Untuk kasus register umum, ini mungkin butuh endpoint public untuk daftar perusahaan.
              // Untuk sementara, jika Anda hanya SUPERADMIN yang daftar, ini bisa dummy.
              // Jika ini akan digunakan oleh SUPERADMIN, maka SUPERADMIN harus login dulu untuk mendapatkan token.
              // Alternatif, jika register hanya untuk karyawan oleh ADMIN_PERUSAHAAN, maka perusahaanId akan otomatis diambil dari admin_perusahaan di backend.
              // Melihat kode `authController.js`, `register` menerima `perusahaanId` dari body.
              // Jadi, frontend harus menyediakan daftar perusahaan.
              // Karena endpoint `/api/perusahaan` dilindungi, kita akan simulasikan atau Anda harus menambahkan endpoint public.
            }
          });
          setPerusahaanList(response.data);
          if (response.data.length > 0) {
            setPerusahaanId(response.data[0].id); // Pilih yang pertama sebagai default
          }
        } catch (err) {
          console.error("Error fetching companies:", err);
          setError("Gagal memuat daftar perusahaan. Silakan coba lagi.");
          setPerusahaanList([]);
        }
      } else {
        setPerusahaanId(null); // SUPERADMIN tidak punya perusahaanId
        setPerusahaanList([]);
      }
    };

    fetchPerusahaan();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const dataToSend = {
        username,
        email,
        password,
        role,
        perusahaanId: role === ROLES.SUPERADMIN ? null : parseInt(perusahaanId),
      };
      await register(dataToSend.username, dataToSend.email, dataToSend.password, dataToSend.role, dataToSend.perusahaanId);
      setSuccessMessage('Pendaftaran berhasil! Silakan login.');
      // Optional: redirect ke login setelah beberapa detik
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.error || 'Pendaftaran gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Daftar Akun Baru
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Peran
            </label>
            <select
              id="role"
              name="role"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {Object.values(ROLES).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          {/* Perusahaan ID (hanya untuk ADMIN_PERUSAHAAN dan KARYAWAN) */}
          {role !== ROLES.SUPERADMIN && (
            <div>
              <label htmlFor="perusahaanId" className="block text-sm font-medium text-gray-700">
                Perusahaan
              </label>
              <select
                id="perusahaanId"
                name="perusahaanId"
                required={role !== ROLES.SUPERADMIN}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={perusahaanId}
                onChange={(e) => setPerusahaanId(e.target.value)}
                disabled={perusahaanList.length === 0}
              >
                {perusahaanList.length === 0 ? (
                  <option value="">Loading perusahaan...</option>
                ) : (
                  perusahaanList.map((perusahaan) => (
                    <option key={perusahaan.id} value={perusahaan.id}>
                      {perusahaan.nama}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Daftar
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;