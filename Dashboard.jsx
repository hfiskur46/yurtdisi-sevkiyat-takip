import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Genel Durum</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Toplam Sevkiyat</h3>
          <p className="text-2xl font-bold">124</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Devam Eden</h3>
          <p className="text-2xl font-bold">47</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Tamamlanan</h3>
          <p className="text-2xl font-bold">77</p>
        </div>
      </div>
    </div>
  );
}
