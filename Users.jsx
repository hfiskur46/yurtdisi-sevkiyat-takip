import React from 'react';

export default function Users() {
  const users = [
    { name: 'Ali Yılmaz', role: 'Lojistik' },
    { name: 'Ayşe Kaya', role: 'Pazarlama' },
    { name: 'Mehmet Demir', role: 'Admin' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kullanıcılar</h2>
      <ul className="space-y-2">
        {users.map((u, i) => (
          <li key={i} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{u.name}</span>
            <span className="text-gray-500">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
