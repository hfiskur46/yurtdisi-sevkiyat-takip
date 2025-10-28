import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-blue-500">
        Yurtdışı Sevkiyat
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/" className="block hover:bg-blue-600 p-2 rounded">Dashboard</Link>
        <Link to="/shipments" className="block hover:bg-blue-600 p-2 rounded">Sevkiyatlar</Link>
        <Link to="/finance" className="block hover:bg-blue-600 p-2 rounded">Finans</Link>
        <Link to="/users" className="block hover:bg-blue-600 p-2 rounded">Kullanıcılar</Link>
      </nav>
    </div>
  );
}
