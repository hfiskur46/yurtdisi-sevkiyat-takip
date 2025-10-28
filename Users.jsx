import React, {useEffect, useState} from 'react';
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{ fetch('/users.json').then(r=>r.json()).then(setUsers); },[]);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kullanıcılar</h2>
      <ul className="space-y-2">
        {users.map((u, i) => (
          <li key={i} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{u.name} ({u.username})</span>
            <span className="text-gray-500">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
