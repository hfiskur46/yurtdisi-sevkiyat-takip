import React from 'react';

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
        <input type="text" placeholder="Kullanıcı adı" className="border w-full p-2 mb-3 rounded" />
        <input type="password" placeholder="Şifre" className="border w-full p-2 mb-4 rounded" />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Giriş</button>
      </div>
    </div>
  );
}
