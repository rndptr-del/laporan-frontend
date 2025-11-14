import React from "react";
import { Calendar, User, FileDown, Grid } from "lucide-react";

export default function FilterBox({
  selectedDate,
  onDateChange,
  selectedPIC,
  onPICChange,
  onExport,
}) {
  return (
    <div className="bg-gray-50 border rounded-xl p-4 shadow-inner mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* Filter Tanggal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal
          </label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
            <Calendar size={18} className="text-green-600" />
            <input
              type="date"
              className="w-full outline-none"
              value={selectedDate}
              onChange={(e) => {
                onDateChange(e.target.value);
                localStorage.setItem("selectedDate", e.target.value);
              }}
            />
          </div>
        </div>

        {/* Filter PIC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PIC Timbang
          </label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
            <User size={18} className="text-green-600" />
            <input
              type="text"
              placeholder="Masukkan nama PIC"
              className="w-full outline-none"
              value={selectedPIC}
              onChange={(e) => onPICChange(e.target.value)}
            />
          </div>
        </div>

        {/* Tombol Export */}
        <div className="flex justify-center md:justify-start lg:justify-end">
          <button
            onClick={onExport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FileDown size={18} />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
