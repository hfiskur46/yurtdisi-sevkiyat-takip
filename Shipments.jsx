import React, {useEffect, useState} from 'react';
export default function Shipments(){
  const [data,setData]=useState([
    {id:'TRK-300',mode:'Karayolu',customer:'ABC Lojistik',rep:'Ayşe K.',status:'Yolda',profit:1200},
    {id:'TRK-299',mode:'Denizyolu',customer:'Global Dış Tic.',rep:'Mehmet D.',status:'Gümrük',profit:3450},
    {id:'TRK-298',mode:'Havayolu',customer:'QuickAir',rep:'Selin A.',status:'Teslim',profit:980},
  ]);
  const [q,setQ]=useState('');
  const filtered = data.filter(d=> d.id.includes(q) || d.customer.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Sevkiyatlar</h2>
        <div className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ara: No veya müşteri" className="border p-2 rounded" />
          <button className="bg-brand-500 text-white px-3 py-2 rounded">Yeni Sevkiyat</button>
        </div>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr><th className="p-3 text-left">No</th><th className="p-3 text-left">Mod</th><th className="p-3 text-left">Müşteri</th><th className="p-3 text-left">Temsilci</th><th className="p-3 text-left">Durum</th><th className="p-3 text-left">Kâr</th></tr>
          </thead>
          <tbody>
            {filtered.map(it=>(
              <tr key={it.id} className="border-t">
                <td className="p-3">{it.id}</td>
                <td className="p-3">{it.mode}</td>
                <td className="p-3">{it.customer}</td>
                <td className="p-3">{it.rep}</td>
                <td className="p-3">{it.status}</td>
                <td className="p-3 font-semibold">{it.profit} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
