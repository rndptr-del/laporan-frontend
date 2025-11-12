import React, { useState } from "react";
import axios from "axios";
import { Trash2, PlusCircle, Save } from "lucide-react";

export default function TimbangPage() {
  const [rows, setRows] = useState([
    { itemCode: "", batchNumber: "", qty: "", binLocation: "" },
  ]);
  const [date, setDate] = useState("");
  const [pic, setPic] = useState("");

  // Tambah baris baru atau merge jika duplikat
  const addRow = (data = { itemCode: "", batchNumber: "", qty: "", binLocation: "" }) => {
    setRows((prev) => {
      let found = false;
      const updated = prev.map((r) => {
        if (r.itemCode === data.itemCode && r.batchNumber === data.batchNumber) {
          found = true;
          return { ...r, qty: parseInt(r.qty || 0) + parseInt(data.qty || 0) };
        }
        return r;
      });
      if (!found) return [...updated, data];
      return updated;
    });
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const lines = text.split("\n");
    lines.forEach((line) => {
      const [itemCode, batchNumber, qty, binLocation] = line.split("\t").map((s) => s.trim());
      if (itemCode && batchNumber && qty) {
        addRow({ itemCode, batchNumber, qty, binLocation: binLocation || "" });
      }
    });
  };

  const handleSave = async () => {
    if (!date) return alert("Tanggal harus diisi!");
    if (rows.length === 0) return alert("Tidak ada data!");

    try {
      const payload = rows.map((r) => ({ ...r, date, pic }));
      await axios.post("http://localhost:8000/api/validasi", payload);
      alert("✅ Data berhasil disimpan!");
      setRows([{ itemCode: "", batchNumber: "", qty: "", binLocation: "" }]);
      setDate("");
      setPic("");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center p-6"
      onPaste={handlePaste}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-green-600 mb-2 text-center">
          🧵 Input Data Benang Balikan
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Paste langsung dari Excel, sistem akan otomatis menggabungkan data dengan item & batch yang sama.
        </p>

        {/* Input Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tanggal Timbang
            </label>
            <input
              type="date"
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              PIC Timbang
            </label>
            <input
              type="text"
              placeholder="Masukkan nama PIC"
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-xl shadow-inner">
          <table className="min-w-full text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Item Code</th>
                <th className="px-4 py-2 text-left">Batch Number</th>
                <th className="px-4 py-2 text-left">Quantity (Kg)</th>
                <th className="px-4 py-2 text-left">Bin Location</th>
                <th className="px-4 py-2 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t hover:bg-green-50">
                  <td className="px-4 py-2">
                    <input
                      value={r.itemCode}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[i].itemCode = e.target.value;
                        setRows(newRows);
                      }}
                      className="border rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={r.batchNumber}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[i].batchNumber = e.target.value;
                        setRows(newRows);
                      }}
                      className="border rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={r.qty}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[i].qty = e.target.value;
                        setRows(newRows);
                      }}
                      className="border rounded-md px-2 py-1 w-full text-right"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={r.binLocation}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[i].binLocation = e.target.value;
                        setRows(newRows);
                      }}
                      className="border rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteRow(i)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() =>
              addRow({ itemCode: "", batchNumber: "", qty: "", binLocation: "" })
            }
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <PlusCircle size={18} />
            Tambah Baris
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <Save size={18} />
            Simpan Data
          </button>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-4">
        © {new Date().getFullYear()} Sistem Timbangan Pabrik – dibuat oleh Randi.
      </p>
    </div>
  );
}
