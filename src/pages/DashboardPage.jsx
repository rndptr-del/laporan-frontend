import React from "react";

export default function DashboardPremium() {
  const summary = {
    pending: 12,
    approved: 32,
    total: 44,
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Pengembalian Benang
        </h1>
        <p className="text-gray-600 text-sm">
          User: <span className="font-semibold">Admin Gudang</span>
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{summary.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{summary.approved}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Data</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{summary.total}</p>
        </div>
      </div>

      {/* QUICK MENU */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">Menu Akses Cepat</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a className="p-5 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition shadow cursor-pointer">
            <p className="font-semibold text-green-700">✔ Validasi Pengembalian</p>
          </a>

          <a className="p-5 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition shadow cursor-pointer">
            <p className="font-semibold text-blue-700">📥 Input Pengembalian</p>
          </a>

          <a className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition shadow cursor-pointer">
            <p className="font-semibold text-yellow-700">📄 Laporan Pengembalian</p>
          </a>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-400 text-xs mt-10 text-center">
        © 2025 Sistem Validasi Pabrik — dibuat oleh Randi.
      </p>
    </div>
  );
}
