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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full ">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-green-600 mb-2 text-center">
          📦 Laporan Pengembalian Benang
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Gunakan filter untuk menampilkan data sesuai rentang tanggal.
        </p>

        {/* Filter */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <div>
            <label className="font-medium text-gray-700 block mb-1">Dari</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 block mb-1">Sampai</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="ml-auto flex gap-3">
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              ⬇️ Export Excel
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              ➕ Tambah Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-xl shadow-inner">
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
                  <td colSpan="9" className="text-center py-6 text-gray-500 bg-gray-50">
                    Tidak ada data ditemukan
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
                    <td className="p-3 font-semibold">{d.qty_kg}</td>
                    <td className="p-3 font-semibold">{d.qty_kantong}</td>
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

      {/* Modal Add */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-600">➕ Tambah Data</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-700 font-medium">
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
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              ))}

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <p className="text-gray-400 text-xs mt-4">© {new Date().getFullYear()} Sistem Pengembalian – dibuat oleh Randi.</p>
    </div>
  );
}
