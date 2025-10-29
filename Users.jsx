import React from 'react';
export default function Users(){
  const users=[
    {name:'Ali Yılmaz', role:'Lojistik', email:'ali@yurt.com'},
    {name:'Ayşe Kaya', role:'Pazarlama', email:'ayse@yurt.com'},
    {name:'Mehmet Demir', role:'Admin', email:'mehmet@yurt.com'}
  ];
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Kullanıcılar</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {users.map((u,i)=>(
          <div key={i} className="card">
            <div className="font-semibold">{u.name}</div>
            <div className="text-sm text-slate-500">{u.role}</div>
            <div className="text-sm mt-2">{u.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
