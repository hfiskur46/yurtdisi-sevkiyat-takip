import React from 'react';

export default function Finance() {
  const reports = [
    { id: 'TRK-001', income: 3500, expense: 2300 },
    { id: 'TRK-002', income: 2200, expense: 2500 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Finansal Raporlar</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">No</th>
            <th className="p-2">Gelir (€)</th>
            <th className="p-2">Gider (€)</th>
            <th className="p-2">Kâr/Zarar (€)</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.income}</td>
              <td className="p-2">{r.expense}</td>
              <td className="p-2 font-bold">{r.income - r.expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
