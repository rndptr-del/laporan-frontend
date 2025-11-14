    import { useEffect, useState } from "react";
    import axios from "axios";
    import FilterBox from "../components/FilterBox";
    import DataTable from "../components/DataTable";
    import RemarksModal from "../components/RemarksModal";
    import ToggleButton from "../components/TonggleButton";

    export default function ValidasiPengembalianPage() {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        localStorage.getItem("selectedDate") || ""
    );
    const [selectedPIC, setSelectedPIC] = useState("");
    const [remarksId, setRemarksId] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [statusFilter, setStatusFilter] = useState("Pending");
    const [searchTerm, setSearchTerm]= useState("");
    const [debouncedSearch, setDeboundcedSearch] = useState("");

    const fetchData = async () => {
        try {
        const res = await axios.get("http://localhost:8000/api/validasi", {
            params: { tanggal: selectedDate, pic: selectedPIC },
        });
        setData(res.data);
        } catch (err) {
        console.error(err);
        alert("❌ Gagal memuat data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedDate, selectedPIC]);

    useEffect(() => {
    const timeout = setTimeout(() => {
      setDeboundcedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

    // ✅ Filter data berdasarkan status (termasuk All)
  const filteredData = data.filter((item) => {
    const itemStatus = item.status?.toLowerCase();
    if (statusFilter === "all") return true;
    if (statusFilter === "pending") return itemStatus === "pending";
    if (statusFilter === "approved") return itemStatus === "saved";
    return true;
  });

    // Simpan remarks ke backend
  const handleSaveRemarks = async () => {
    try {
      await axios.post("http://localhost:8000/api/validasi/updateRemarks", {
        id: remarksId,
        remarks: remarks,
      });
      alert("✅ Remarks berhasil disimpan!");
      setRemarksId(null);
      setRemarks("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan remarks.");
    }
  };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-7xl">
            <h1 className="text-2xl font-bold text-green-600 mb-2 text-center">
            🧾 Validasi Pengembalian Benang
            </h1>
            <p className="text-gray-500 text-center mb-6">
            Gunakan filter untuk menampilkan data sesuai tanggal dan PIC Timbang.
            </p>

            {/* Filter Section */}
            <div className="mb-6">
            <FilterBox
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedPIC={selectedPIC}
                onPICChange={setSelectedPIC}
                onExport={() =>
                window.open(
                    `http://localhost:8000/api/pengembalian/export?tanggal=${selectedDate}&pic=${selectedPIC}`
                )
                }
            />
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between mb-4">
              {/* Search Input */}
            <input
            type="text"
            placeholder="Cari Item Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 text-sm 
                      focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <ToggleButton status={statusFilter} onChange={setStatusFilter} />
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto border rounded-xl shadow-inner">
            <DataTable
                data={filteredData}
                searchTerm={debouncedSearch}
                onEditRemarks={setRemarksId}
                refresh={fetchData}
            />
            </div>
        </div>

        {/* Modal Remarks */}
      {remarksId && (
        <RemarksModal
          id={remarksId}
          onClose={() => setRemarksId(null)}
          refresh={fetchData}
        />
      )}

        <p className="text-gray-400 text-xs mt-4">
            © {new Date().getFullYear()} Sistem Validasi – dibuat oleh Randi.
        </p>
        </div>
    );
    }
