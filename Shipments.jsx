import React, {useEffect, useState} from 'react';
export default function Shipments() {
  const [data, setData] = useState([]);
  useEffect(()=>{ fetch('/api/shipments').then(r=>r.json()).then(setData); },[]);
  const add = async ()=>{
    const body = { mode:'Karayolu', customer:'Yeni Müşteri', representative:'Ali', sales:'pazarlama', status:'Yolda', profit:0 };
    const res = await fetch('/api/shipments',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
    if(res.ok){ const n = await res.json(); setData(prev=>[...prev,n]); }
  };
  const updateStatus = async (id, status)=>{
    const res = await fetch('/api/shipments/'+id,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({status})});
    if(res.ok){ const updated = await res.json(); setData(prev=>prev.map(p=>p.id===id?updated:p)); }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sevkiyatlar</h2>
        <div className="space-x-2">
          <button onClick={add} className="bg-green-600 text-white px-3 py-1 rounded">Yeni Sevkiyat</button>
        </div>
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">No</th>
            <th className="p-2">Mod</th>
            <th className="p-2">Müşteri</th>
            <th className="p-2">Temsilci</th>
            <th className="p-2">Durum</th>
            <th className="p-2">Kâr</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.mode}</td>
              <td className="p-2">{item.customer}</td>
              <td className="p-2">{item.representative}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.profit} €</td>
              <td className="p-2">
                <button onClick={()=>updateStatus(item.id,'Teslim')} className="text-sm bg-blue-600 text-white px-2 py-1 rounded">Teslim</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
