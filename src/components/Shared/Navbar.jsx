import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">SAP System</div>
      <nav>
        <ul className="flex items-center space-x-4">
          {user && (
            <li>
              <span className="text-gray-700">Halo, {user.username} ({user.role})</span>
            </li>
          )}
          <li>
            <button
              onClick={() => navigate('/profile')}
              className="text-blue-600 hover:underline"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;