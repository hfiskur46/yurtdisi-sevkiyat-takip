import React from 'react';
export default function Navbar(){
  const logout = ()=> { localStorage.removeItem('user'); window.location.href='/login'; };
  const u = typeof window!=='undefined' ? JSON.parse(localStorage.getItem('user')||'null') : null;
  return (
    <header className="bg-slate-50 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 bg-white rounded">☰</button>
          <div className="text-sm text-slate-500">Hoşgeldin, <span className="font-medium text-slate-700">{u?.name||'Kullanıcı'}</span></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white px-3 py-2 rounded shadow-sm text-sm">Bildirimler</button>
          <button onClick={logout} className="bg-red-600 text-white px-3 py-2 rounded text-sm">Çıkış</button>
        </div>
      </div>
    </header>
  );
}
