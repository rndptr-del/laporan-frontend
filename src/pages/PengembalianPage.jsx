import { useEffect, useState } from "react";
import axios from "axios";

export default function PengembalianPage() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    tanggal_timbang: "",
    tanggal_pengembalian: "",
    tanggal_transfer: "",
    qty_kg: "",
    qty_kantong: "",
    pic: "",
    shif: "",
  });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/api/pengembalian");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      await axios.delete(`http://localhost:8000/api/pengembalian/${id}`);
      fetchData();
    }
  };

  const handleExport = () => {
    if (!start || !end) {
      alert("Pilih tanggal dulu!");
      return;
    }
    window.location.href = `http://localhost:8000/api/pengembalian/export?start_date=${start}&end_date=${end}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/pengembalian", form);
    setShowModal(false);
    setForm({
      tanggal_timbang: "",
      tanggal_pengembalian: "",
      tanggal_transfer: "",
      qty_kg: "",
      qty_kantong: "",
      pic: "",
      shif: "",
    });
    fetchData();
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700 tracking-wide flex items-center gap-2">
            📦 Laporan Pengembalian Benang To Rak
          </h1>
        </div>

        {/* Filter dan Tombol */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Dari:</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Sampai:</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="ml-auto flex gap-3">
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition transform hover:scale-105"
            >
              ⬇️ Export Excel
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md transition transform hover:scale-105"
            >
              ➕ Tambah Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-green-700 text-white text-sm uppercase">
              <tr>
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Tanggal Timbang</th>
                <th className="p-3 text-left">Tanggal Pengembalian</th>
                <th className="p-3 text-left">Tanggal Transfer</th>
                <th className="p-3 text-left">Qty (Kg)</th>
                <th className="p-3 text-left">Qty (Kantong)</th>
                <th className="p-3 text-left">PIC</th>
                <th className="p-3 text-left">Shift</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 bg-gray-50"
                  >
                    Tidak ada data yang ditemukan
                  </td>
                </tr>
              ) : (
                data.map((d, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-gray-50 hover:bg-green-50 transition"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{d.tanggal_timbang}</td>
                    <td className="p-3">{d.tanggal_pengembalian}</td>
                    <td className="p-3">{d.tanggal_transfer}</td>
                    <td className="p-3 font-semibold text-gray-800">
                      {d.qty_kg}
                    </td>
                    <td className="p-3 font-semibold text-gray-800">
                      {d.qty_kantong}
                    </td>
                    <td className="p-3">{d.pic}</td>
                    <td className="p-3">{d.shif}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition shadow-sm"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Data */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              ➕ Tambah Data Pengembalian
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {Object.keys(form).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="capitalize text-sm text-gray-700 font-medium mb-1">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type={
                      key.includes("tanggal")
                        ? "date"
                        : key.includes("qty")
                        ? "number"
                        : "text"
                    }
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
