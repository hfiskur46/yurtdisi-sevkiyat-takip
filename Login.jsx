import React, {useState} from 'react';
export default function Login(){
  const [u,setU]=useState('admin'), [p,setP]=useState('admin123');
  const submit = ()=> {
    // mock auth
    if((u==='admin'&&p==='admin123')||(u==='lojistik'&&p==='lojistik123')||(u==='pazarlama'&&p==='pazarlama123')){
      const role = u==='admin'?'admin':(u==='lojistik'?'logistics':'sales');
      localStorage.setItem('user', JSON.stringify({name:u, role}));
      window.location.href='/';
    } else alert('Giriş bilgileri hatalı');
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sisteme Giriş</h2>
        <input value={u} onChange={e=>setU(e.target.value)} className="w-full p-3 border rounded mb-3" placeholder="Kullanıcı adı"/>
        <input value={p} onChange={e=>setP(e.target.value)} type="password" className="w-full p-3 border rounded mb-4" placeholder="Şifre"/>
        <div className="flex gap-2">
          <button onClick={submit} className="flex-1 bg-brand-500 text-white py-2 rounded">Giriş</button>
          <button onClick={()=>{setU('admin'); setP('admin123')}} className="bg-slate-100 px-3 rounded">Demo</button>
        </div>
      </div>
    </div>
  );
}
