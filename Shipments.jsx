import React, { useEffect, useState } from 'react';
export default function Shipments(){
  const [data,setData]=useState([
    {shipmentNo:'TRK-412',mode:'Karayolu',customer:'ABC Lojistik',rep:'Ayşe K.',status:'Yolda',profit:1200},
    {shipmentNo:'TRK-411',mode:'Denizyolu',customer:'Global Dış Tic.',rep:'Mehmet D.',status:'Gümrük',profit:3450},
    {shipmentNo:'TRK-410',mode:'Havayolu',customer:'QuickAir',rep:'Selin A.',status:'Teslim',profit:980},
  ]);
  const [q,setQ]=useState('');
  const filtered = data.filter(d=> d.shipmentNo.includes(q) || d.customer.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Sevkiyatlar</h2>
        <div className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ara: No veya müşteri" className="border p-2 rounded" />
          <button className="btn-fiori">Yeni Sevkiyat</button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-500"><tr><th className="p-2 text-left">No</th><th className="p-2 text-left">Mod</th><th className="p-2 text-left">Müşteri</th><th className="p-2 text-left">Temsilci</th><th className="p-2 text-left">Durum</th><th className="p-2 text-left">Kâr</th></tr></thead>
          <tbody>
            {filtered.map((it)=> (
              <tr key={it.shipmentNo} className="border-t"><td className="p-2">{it.shipmentNo}</td><td className="p-2">{it.mode}</td><td className="p-2">{it.customer}</td><td className="p-2">{it.rep}</td><td className="p-2">{it.status}</td><td className="p-2 font-semibold">{it.profit} €</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
