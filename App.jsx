import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Shipments from './Shipments.jsx';
import Finance from './Finance.jsx';
import Users from './Users.jsx';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function App() {
  const isLoggedIn = true; // mock auth

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
