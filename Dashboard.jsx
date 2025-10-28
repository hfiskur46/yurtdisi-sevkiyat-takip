import React, {useEffect, useState} from 'react';
export default function Dashboard() {
  const [stats, setStats] = useState({total:0,ongoing:0,done:0});
  useEffect(()=>{
    fetch('/api/shipments').then(r=>r.json()).then(data=>{
      setStats({total:data.length, ongoing:data.filter(s=>s.status!=='Teslim').length, done:data.filter(s=>s.status==='Teslim').length});
    });
  },[]);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Genel Durum</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Toplam Sevkiyat</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Devam Eden</h3>
          <p className="text-2xl font-bold">{stats.ongoing}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Tamamlanan</h3>
          <p className="text-2xl font-bold">{stats.done}</p>
        </div>
      </div>
    </div>
  );
}
