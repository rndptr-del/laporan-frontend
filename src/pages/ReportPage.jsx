import { useState } from "react";
import axios from "axios";
import ReportFilterModal from "../components/ReportFilterModal";
import ReportTable from "../components/ReportTable";
import ReportTabs from "../components/ReportTabs";

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  // FILTER TAMPILAN
  const [picFilter, setPicFilter] = useState("ALL");
  const [jenisFilter, setJenisFilter] = useState("ALL");

  const handleGenerateReport = async (filter) => {
    const res = await axios.get("http://localhost:8000/api/report", {
      params: { ...filter, type: activeTab },
    });

    setData(res.data);
    setPicFilter("ALL");
    setJenisFilter("ALL");
    setShowModal(false);
  };

  // FILTER DATA
  const filteredData = data.filter((row) => {
    const picOk = picFilter === "ALL" || row.pic === picFilter;
    const jenisOk = jenisFilter === "ALL" || row.jenis === jenisFilter;
    return picOk && jenisOk;
  });

  // LIST BUTTON
  const picList = ["ALL", ...new Set(data.map((d) => d.pic))];
  const jenisList = ["ALL", "Timbang", "Pengembalian"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold text-blue-600">📊 Menu Report</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Generate Report
          </button>
        </div>

        {/* TAB API */}
        <ReportTabs active={activeTab} onChange={setActiveTab} />

        {/* FILTER PIC */}
        {data.length > 0 && (
          <>
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Filter PIC</p>
              <div className="flex flex-wrap gap-2">
                {picList.map((pic) => (
                  <button
                    key={pic}
                    onClick={() => setPicFilter(pic)}
                    className={`px-3 py-1 rounded-full text-sm transition
                      ${
                        picFilter === pic
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {pic}
                  </button>
                ))}
              </div>
            </div>

            {/* FILTER JENIS */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Filter Jenis</p>
              <div className="flex gap-2">
                {jenisList.map((jenis) => (
                  <button
                    key={jenis}
                    onClick={() => setJenisFilter(jenis)}
                    className={`px-3 py-1 rounded-full text-sm transition
                      ${
                        jenisFilter === jenis
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {jenis}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TABLE */}
        <ReportTable data={filteredData} />
      </div>

      {/* MODAL */}
      {showModal && (
        <ReportFilterModal
          onClose={() => setShowModal(false)}
          onSubmit={handleGenerateReport}
        />
      )}
    </div>
  );
}
