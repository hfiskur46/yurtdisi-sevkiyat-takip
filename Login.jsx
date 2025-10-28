import React, {useState} from 'react';
export default function Login() {
  const [username,setUsername]=useState('admin');
  const [password,setPassword]=useState('admin123');
  const submit = async ()=> {
    try{
      const res = await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({username,password})});
      if(!res.ok) throw new Error('Giriş başarısız');
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
    }catch(e){ alert('Giriş başarısız: ' + e.message) }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Kullanıcı adı" className="border w-full p-2 mb-3 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Şifre" className="border w-full p-2 mb-4 rounded" />
        <button onClick={submit} className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Giriş</button>
      </div>
    </div>
  );
}
