import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Topbar(){
  const userRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userRaw ? JSON.parse(userRaw) : {name: 'Yönetici'};
  return (
    <header className="bg-white header-shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold text-slate-700">Yurtdışı Sevkiyat Takip</div>
          <div className="text-sm text-slate-500">Operasyon & Finans Paneli</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-slate-50"><Bell size={18} /></button>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-slate-50">
            <User size={18} />
            <div className="text-sm">{user.name}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
