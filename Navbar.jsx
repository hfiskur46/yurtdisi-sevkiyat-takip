import React from 'react';

export default function Navbar() {
  return (
    <div className="bg-white shadow p-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Yönetim Paneli</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Admin</span>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Çıkış</button>
      </div>
    </div>
  );
}
