import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ToggleButton({ status, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("all")}
        className={`px-3 py-1 rounded-full text-sm font-semibold border transition ${
          status === "all"
            ? "bg-yellow-100 border-yellow-400 text-yellow-700"
            : "border-gray-300 text-gray-400 hover:border-yellow-300 hover:text-yellow-500"
        }`}
      >
        Semua
      </button>
      {/* Tombol Pending */}
      <button
        onClick={() => onChange("pending")}
        className={`px-3 py-1 rounded-full text-sm font-semibold border transition ${
          status === "pending"
            ? "bg-yellow-100 border-yellow-400 text-yellow-700"
            : "border-gray-300 text-gray-400 hover:border-yellow-300 hover:text-yellow-500"
        }`}
      >
        Belum Dikembalikan
      </button>

      {/* Tombol Approved */}
      <button
        onClick={() => onChange("approved")}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border transition ${
          status === "approved"
            ? "bg-green-100 border-green-400 text-green-700"
            : "border-gray-300 text-gray-400 hover:border-green-300 hover:text-green-500"
        }`}
      >
        <CheckCircle2 size={16} />
        Sudah Dikembalikan
      </button>
    </div>
  );
}
