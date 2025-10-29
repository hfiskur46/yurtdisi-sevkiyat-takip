import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpi = [
  { label: 'Toplam Sevkiyat', value: 412 },
  { label: 'Açık Faturalar', value: 34 },
  { label: 'Teslim Edilen', value: 378 },
  { label: 'Toplam Kâr (€)', value: 62230 }
];

const areaData = [
  { date: '01', profit: 2000 },
  { date: '05', profit: 7200 },
  { date: '10', profit: 4300 },
  { date: '15', profit: 7600 },
  { date: '20', profit: 13200 },
  { date: '25', profit: 10130 }
];

const pieData = [{ name: 'Karayolu', value: 180 }, { name: 'Denizyolu', value: 140 }, { name: 'Havayolu', value: 92 }];
const COLORS = ['#0fb7c3','#06b6d4','#f97316'];

export default function Dashboard(){
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpi.map((k,i)=>(
          <div key={i} className="kpi">
            <div className="text-sm text-slate-500">{k.label}</div>
            <div className="text-2xl font-bold">{k.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 card">
          <h3 className="font-semibold mb-2">Sevkiyat & Kâr (Aylık)</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0fb7c3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0fb7c3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="profit" stroke="#0fb7c3" fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Mod Dağılımı</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80}>
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Son Sevkiyatlar</h3>
        <table className="w-full table text-sm">
          <thead><tr className="text-slate-500"><th>No</th><th>Mod</th><th>Müşteri</th><th>Durum</th><th>Kâr (€)</th></tr></thead>
          <tbody>
            <tr><td className="p-2">TRK-412</td><td>Karayolu</td><td>ABC Lojistik</td><td><span className="badge">Yolda</span></td><td className="font-semibold">+1,200</td></tr>
            <tr><td className="p-2">TRK-411</td><td>Denizyolu</td><td>Global Dış Tic.</td><td><span className="badge">Gümrük</span></td><td className="font-semibold">+3,450</td></tr>
            <tr><td className="p-2">TRK-410</td><td>Havayolu</td><td>QuickAir</td><td><span className="badge">Teslim</span></td><td className="font-semibold">+980</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
