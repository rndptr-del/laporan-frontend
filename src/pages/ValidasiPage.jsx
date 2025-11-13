import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../components/DataTable"; // pastikan path sesuai struktur kamu

export default function ValidasiPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/validasi");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔎 Filter data berdasarkan tab
  const filteredData =
    activeTab === "pending"
      ? data.filter((item) => item.status !== "saved" && item.status !== "approved")
      : data.filter((item) => item.status === "saved" || item.status === "approved");

  const handleRefresh = () => {
    fetchData();
  };

  const handleEditRemarks = (id) => {
    alert(`Edit remarks untuk ID ${id}`);
    // nanti kamu bisa munculkan modal remarks di sini
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        📋 Validasi Data Timbangan
      </h1>

      {/* ✅ Tab Filter */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === "pending"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === "approved"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Approved
        </button>
      </div>

      {/* ✅ Tabel Data */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <DataTable
          data={filteredData}
          onEditRemarks={handleEditRemarks}
          refresh={handleRefresh}
        />
      </div>
    </div>
  );
}
