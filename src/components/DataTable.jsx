import React, { useState } from "react";
import { Edit3, CheckCircle2, Plus, Minus } from "lucide-react";
import axios from "axios";

export default function DataTable({ data, onEditRemarks, refresh, searchTerm }) {
  const [conesData, setConesData] = useState({});
  const [binLocation, setBinLocation] = useState({});
  const [pic, setPic] = useState({});

  // ✅ Format tanggal MySQL
  const formatDateForMySQL = (date) => {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // ✅ Simpan data ke backend
  const handleValidasi = async (item) => {
    try {
      const payload = {
        id: item.id,
        bin_location: binLocation[item.id] || item.bin_location || "-",
        cones: conesData[item.id] ?? item.cones ?? 0,
        waktu_kembali: formatDateForMySQL(new Date()),
        pic: pic[item.id] || item.pictimbang || "PIC Tidak Dikenal",
      };

      const res = await axios.post("http://localhost:8000/api/validasi/update", payload);

      if (res.status === 200) {
        alert("✅ Data berhasil disimpan dan divalidasi!");
        refresh();
      } else {
        alert("❌ Gagal menyimpan data!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Terjadi kesalahan saat validasi.");
    }
  };

  const handleConesChange = (id, delta) => {
    setConesData((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const filteredData = data.filter((item) =>
    item.item_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
  <div className="overflow-auto max-h-[500px] rounded-lg border">
  <table className="min-w-full text-sm border-collapse">
    <thead className="bg-green-600 text-white sticky top-0 z-30">
      <tr>
        <th className="px-4 py-3 text-left">Item Code</th>
        <th className="px-4 py-3 text-left">Batch</th>
        <th className="px-4 py-3 text-center">Qty (Kg)</th>
        <th className="px-4 py-3 text-center">Cones</th>
        <th className="px-4 py-3 text-left">Bin Location</th>
        <th className="px-4 py-3 text-left">PIC Timbang</th>
        <th className="px-4 py-3 text-left">Remarks</th>
        <th className="px-4 py-3 text-center">Status</th>
        <th className="px-4 py-3 text-center sticky right-0 bg-green-600 z-40">
          Aksi
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredData.length > 0 ? (
        filteredData.map((item) => {
          const isApproved =
            item.status === "saved" || item.status === "approved";

          return (
            <tr
              key={item.id}
              className={`border-t transition ${
                isApproved
                  ? "bg-green-50 hover:bg-green-100"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* Item Code */}
              <td className="px-4 py-3 font-medium whitespace-nowrap">
                {item.item_code}
              </td>

              {/* Batch */}
              <td className="px-4 py-3 whitespace-nowrap">
                {item.batch_number}
              </td>

              {/* Qty */}
              <td className="px-4 py-3 text-center font-semibold">
                {item.qty}
              </td>

              {/* Cones */}
              <td className="px-4 py-3">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => handleConesChange(item.id, -1)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      isApproved
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    disabled={isApproved}
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-semibold text-gray-800">
                    {conesData[item.id] ?? item.cones ?? 0}
                  </span>

                  <button
                    onClick={() => handleConesChange(item.id, 1)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      isApproved
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    disabled={isApproved}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </td>

              {/* Bin Location */}
              <td className="px-4 py-3 whitespace-nowrap">
                {item.bin_location || "-"}
              </td>

              {/* PIC */}
              <td className="px-4 py-3">{item.pictimbang || "-"}</td>

              {/* Remarks */}
              <td className="px-4 py-3 text-gray-600">
                {item.remarks || "-"}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 ${
                    isApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isApproved && <CheckCircle2 size={14} />}
                  {isApproved ? "Approved" : "Pending"}
                </span>
              </td>

              {/* Aksi */}
              <td className="px-4 py-3 sticky right-0 bg-white z-20 w-28">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEditRemarks(item.id)}
                    className={`p-2 rounded-full ${
                      isApproved
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    disabled={isApproved}
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    onClick={() => handleValidasi(item)}
                    className={`p-2 rounded-full ${
                      isApproved
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    disabled={isApproved}
                  >
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan="9"
            className="text-center text-gray-500 py-6 italic bg-gray-50"
          >
            Tidak ada data untuk filter ini.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
}
