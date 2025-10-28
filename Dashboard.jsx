import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpi = [
  {label:'Toplam Sevkiyat', value: 312},
  {label:'Devam Eden', value: 84},
  {label:'Teslim', value: 228},
  {label:'Toplam Kâr (€)', value: 45230},
];

const areaData = [
  {date:'01 Oct', shipments:12, profit:4000},
  {date:'05 Oct', shipments:30, profit:9200},
  {date:'10 Oct', shipments:18, profit:4300},
  {date:'15 Oct', shipments:25, profit:7600},
  {date:'20 Oct', shipments:40, profit:13200},
  {date:'25 Oct', shipments:35, profit:10130},
];

const pieData=[{name:'Karayolu',value:120},{name:'Denizyolu',value:100},{name:'Havayolu',value:92}];
const COLORS=['#06b6d4','#0ea5a1','#f97316'];

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
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Sevkiyat & Kâr (Ekim)</h3>
          <div style={{width:'100%', height:260}}>
            <ResponsiveContainer>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="profit" stroke="#06b6d4" fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Mod Dağılımı</h3>
          <div style={{width:'100%', height:260}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Son Sevkiyatlar</h3>
        <table className="w-full table">
          <thead><tr className="text-sm text-slate-500"><th>No</th><th>Mod</th><th>Müşteri</th><th>Durum</th><th>Kâr (€)</th></tr></thead>
          <tbody>
            <tr><td className="p-2">TRK-300</td><td className="p-2">Karayolu</td><td className="p-2">ABC Lojistik</td><td className="p-2">Yolda</td><td className="p-2 font-medium">+1,200</td></tr>
            <tr><td className="p-2">TRK-299</td><td className="p-2">Denizyolu</td><td className="p-2">Global Dış Tic.</td><td className="p-2">Gümrük</td><td className="p-2 font-medium">+3,450</td></tr>
            <tr><td className="p-2">TRK-298</td><td className="p-2">Havayolu</td><td className="p-2">QuickAir</td><td className="p-2">Teslim</td><td className="p-2 font-medium">+980</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
