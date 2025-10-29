import React, { useState } from 'react';
export default function Invoices(){
  const [inv, setInv] = useState([
    {invoiceNo:'INV-1001', shipment:'TRK-412', amount:1200, currency:'EUR', status:'Beklemede'},
    {invoiceNo:'INV-1000', shipment:'TRK-411', amount:3450, currency:'EUR', status:'Ödendi'}
  ]);
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Faturalar</h2>
        <div className="flex gap-2">
          <button className="btn-fiori">Yeni Fatura</button>
          <button className="border px-3 rounded">Muhasebe Dışa Aktar</button>
        </div>
      </div>

      <div className="card">
        <table className="w-full text-sm">
          <thead className="text-slate-500 bg-slate-50"><tr><th className="p-2">Fatura No</th><th className="p-2">Sevkiyat</th><th className="p-2">Tutar</th><th className="p-2">Durum</th></tr></thead>
          <tbody>
            {inv.map(i=>(<tr key={i.invoiceNo} className="border-t"><td className="p-2">{i.invoiceNo}</td><td className="p-2">{i.shipment}</td><td className="p-2">{i.amount} {i.currency}</td><td className="p-2">{i.status}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
