import React, { useState } from "react";
import { X, MessageSquare, Save } from "lucide-react";
import axios from "axios";

export default function RemarksModal({ id, onClose, refresh }) {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!remarks.trim()) {
      alert("❌ Catatan tidak boleh kosong!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/validasi/updateRemarks", {
        id: id,
        remarks: remarks,
      });

      alert("✅ Remarks berhasil disimpan!");
      setRemarks("");
      onClose();
      refresh(); // panggil ulang data di halaman utama
    } catch (err) {
      console.error(err);
      alert("⚠️ Gagal menyimpan remarks!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
            <MessageSquare size={20} />
            Tambahkan Catatan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Tulis catatan atau alasan validasi di sini..."
          className="border rounded-lg p-3 w-full h-32 resize-none focus:ring-2 focus:ring-green-400 outline-none"
        />

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Save size={18} />
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
