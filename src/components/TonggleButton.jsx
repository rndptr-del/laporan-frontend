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
        All
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
        Pending
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
        Approved
      </button>

      {/* Tombol Rejected */}
      <button
        onClick={() => onChange("rejected")}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border transition ${
          status === "rejected"
            ? "bg-red-100 border-red-400 text-red-700"
            : "border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500"
        }`}
      >
        <XCircle size={16} />
        Rejected
      </button>
    </div>
  );
}
