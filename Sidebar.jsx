import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Sidebar(){
  const loc = useLocation();
  const items = [
    {to:'/',label:'Dashboard'},
    {to:'/shipments',label:'Sevkiyatlar'},
    {to:'/finance',label:'Finans'},
    {to:'/users',label:'Kullanıcılar'}
  ];
  return (
    <aside className="w-72 bg-white border-r hidden md:block">
      <div className="p-6 border-b">
        <div className="text-xl font-bold text-slate-700">Yurtdışı Sevkiyat</div>
        <div className="text-sm text-slate-400">Operasyon & Finans Paneli</div>
      </div>
      <nav className="p-4 space-y-1">
        {items.map(i=> (
          <Link key={i.to} to={i.to} className={'block p-3 rounded '+(loc.pathname===i.to? 'bg-slate-100 font-medium':'text-slate-600 hover:bg-slate-50')}>
            {i.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 text-sm text-slate-500">© 2025</div>
    </aside>
  );
}
