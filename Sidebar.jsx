import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Truck, FileText, Users } from 'lucide-react';

export default function Sidebar(){
  const loc = useLocation();
  const items = [
    {to:'/',label:'Dashboard', icon: <Home size={16}/>},
    {to:'/shipments',label:'Sevkiyatlar', icon: <Truck size={16}/>},
    {to:'/invoices',label:'Faturalar', icon: <FileText size={16}/>},
    {to:'/users',label:'Kullanıcılar', icon: <Users size={16}/>},
  ];
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="p-4 border-b">
        <div className="text-sm text-slate-500">Merkez</div>
        <div className="text-lg font-semibold">Yurtdışı Sevkiyat</div>
      </div>
      <nav className="p-4 space-y-1 flex-1">
        {items.map(i=> (
          <Link key={i.to} to={i.to} className={'flex items-center gap-3 p-3 rounded '+(loc.pathname===i.to? 'bg-slate-100 font-medium':'text-slate-600 hover:bg-slate-50')}>
            <span className="text-slate-500">{i.icon}</span>
            <span>{i.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 text-sm text-slate-400">© 2025</div>
    </aside>
  );
}
