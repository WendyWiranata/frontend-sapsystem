import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* --- PERBAIKAN DI SINI --- */}
        <main className="flex-1 flex justify-center items-start p-6 bg-gray-200 overflow-y-auto">
          {/* Kita bungkus Outlet dengan div untuk mengontrol lebar konten */}
          <div className="w-full max-w-7xl"> {/* Lebar maksimum konten, bisa disesuaikan */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;