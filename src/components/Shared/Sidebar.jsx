import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const Sidebar = () => {
  const { userRole } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-6">Menu</div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>

          {userRole === ROLES.SUPERADMIN && (
            <>
              <li>
                <Link to="/perusahaan" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Manajemen Perusahaan
                </Link>
              </li>
              <li>
                <Link to="/users" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Manajemen User Perusahaan
                </Link>
              </li>
            </>
          )}

          {userRole === ROLES.ADMIN_PERUSAHAAN && (
            <>
              <li>
                <Link to="/karyawan" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Manajemen Karyawan
                </Link>
              </li>
              <li>
                <Link to="/gaji" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Manajemen Gaji
                </Link>
              </li>
              <li>
                <Link to="/cuti" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Manajemen Cuti
                </Link>
              </li>
            </>
          )}

          {userRole === ROLES.KARYAWAN && (
            <>
              <li>
                <Link to="/my-gaji" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Gaji Saya
                </Link>
              </li>
              <li>
                <Link to="/my-cuti" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Cuti Saya
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* Footer sidebar, jika ada */}
    </aside>
  );
};

export default Sidebar;