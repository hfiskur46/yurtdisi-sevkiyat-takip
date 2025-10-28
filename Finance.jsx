import React from 'react';
export default function Finance(){
  const items=[
    {id:'TRK-300',income:5200,expenses:4000},
    {id:'TRK-299',income:7000,expenses:3550},
    {id:'TRK-298',income:2500,expenses:1520},
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Finansal Raporlar</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Toplam Gelir</h4>
          <div className="text-2xl font-bold">14,700 €</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Toplam Gider</h4>
          <div className="text-2xl font-bold">9,070 €</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Toplam Kâr</h4>
          <div className="text-2xl font-bold">5,630 €</div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mt-4">
        <h3 className="font-semibold mb-2">Detaylı Sevkiyat Kârlılığı</h3>
        <table className="w-full text-sm">
          <thead className="text-slate-500 bg-slate-50"><tr><th className="p-2 text-left">No</th><th className="p-2">Gelir</th><th className="p-2">Gider</th><th className="p-2">Kâr</th></tr></thead>
          <tbody>
            {items.map(it=>(<tr key={it.id} className="border-t"><td className="p-2">{it.id}</td><td className="p-2">{it.income} €</td><td className="p-2">{it.expenses} €</td><td className="p-2 font-semibold">{it.income-it.expenses} €</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
