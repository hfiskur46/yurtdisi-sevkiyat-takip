import React from 'react';

export default function Shipments() {
  const data = [
    { id: 'TRK-001', mode: 'Karayolu', customer: 'ABC Lojistik', status: 'Yolda', profit: '+1200 €' },
    { id: 'TRK-002', mode: 'Denizyolu', customer: 'XYZ Dış Tic.', status: 'Teslim', profit: '-350 €' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sevkiyatlar</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">No</th>
            <th className="p-2">Mod</th>
            <th className="p-2">Müşteri</th>
            <th className="p-2">Durum</th>
            <th className="p-2">Kâr/Zarar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.mode}</td>
              <td className="p-2">{item.customer}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
