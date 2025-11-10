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
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          📋 Laporan Pengembalian Benang To Rak
        </h1>

        {/* Filter dan Tombol */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label className="font-medium">Dari:</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <label className="font-medium">Sampai:</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ⬇️ Export Excel
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Tambah Data
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 text-left">No</th>
                <th className="p-2 text-left">Tanggal Timbang</th>
                <th className="p-2 text-left">Tanggal Pengembalian</th>
                <th className="p-2 text-left">Tanggal Transfer</th>
                <th className="p-2 text-left">Qty (Kg)</th>
                <th className="p-2 text-left">Qty (Kantong)</th>
                <th className="p-2 text-left">PIC</th>
                <th className="p-2 text-left">Shift</th>
                <th className="p-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((d, i) => (
                  <tr key={i} className="odd:bg-gray-50 even:bg-white">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{d.tanggal_timbang}</td>
                    <td className="p-2">{d.tanggal_pengembalian}</td>
                    <td className="p-2">{d.tanggal_transfer}</td>
                    <td className="p-2">{d.qty_kg}</td>
                    <td className="p-2">{d.qty_kantong}</td>
                    <td className="p-2">{d.pic}</td>
                    <td className="p-2">{d.shif}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Data Pengembalian</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {Object.keys(form).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="capitalize">{key.replace("_", " ")}</label>
                  <input
                    type={
                      key.includes("tanggal") ? "date" : key.includes("qty") ? "number" : "text"
                    }
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    className="border border-gray-300 rounded-md p-2"
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
