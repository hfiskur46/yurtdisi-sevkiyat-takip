import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Shipments from './Shipments.jsx';
import Finance from './Finance.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

function RequireAuth({ children }) {
  const u = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  return u ? children : <Navigate to='/login' />;
}

export default function App(){
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/shipments" element={<RequireAuth><Shipments /></RequireAuth>} />
            <Route path="/finance" element={<RequireAuth><Finance /></RequireAuth>} />
            <Route path="/users" element={<RequireAuth><Users /></RequireAuth>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
