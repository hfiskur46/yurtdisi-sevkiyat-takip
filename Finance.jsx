import React, {useEffect, useState} from 'react';
export default function Finance() {
  const [reports, setReports] = useState([]);
  useEffect(()=>{ fetch('/api/shipments').then(r=>r.json()).then(data=>{
    setReports(data.map(s=>({id:s.id,income:s.income||s.profit||0,expense:s.expense||0})));
  }); },[]);
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
