import { Routes, Route, NavLink } from "react-router-dom";
import PengembalianPage from "./pages/PengembalianPage";
import TimbangPage from "./pages/TimbangPage";
import InputDataValidasiPage from "./pages/InputDataValidasiPage";
import ValidasiPengembalianPage from "./pages/ValidasiPengembalianPage";
import DashboardPage from "./pages/DashboardPage";
import { 
  Menu, Package, Scale, CheckSquare, ClipboardList, LayoutDashboard 
} from "lucide-react";
import ReportPengembalianPage from "./pages/ReportPage";

function App() {
  return (
    <div className="flex">

      {/* SIDEBAR INDUSTRIAL */}
      <div className="h-screen w-64 bg-gray-900 text-gray-200 flex flex-col shadow-2xl border-r border-gray-700">
        
        <div className="p-6 text-xl font-bold tracking-wide bg-gray-800 flex items-center gap-3 border-b border-gray-700">
          <Menu />
          QC SYSTEM
        </div>

        <nav className="flex-1 p-4 space-y-2 text-base">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/pengembalian"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <Package size={20} />
            Data Pengembalian
          </NavLink>

          <NavLink
            to="/timbang"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <Scale size={20} />
            Timbang Barang
          </NavLink>

          <NavLink
            to="/inputvalidasi"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <ClipboardList size={20} />
            Input Validasi
          </NavLink>

          <NavLink
            to="/validasipengembalian"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <CheckSquare size={20} />
            Validasi Pengembalian
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300"
              }`
            }
          >
            <ClipboardList size={20} />
            Report
          </NavLink>
        </nav>

        <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
          © 2025 QC System • Industrial UI
        </div>
      </div>

      {/* AREA KANAN: FOOTER + KONTEN */}
      <div className="flex-1 bg-gray-100 min-h-screen overflow-x-hidden overflow-y-auto">

        {/* FOOTER INDUSTRIAL */}
        <div className="w-full bg-gray-800 text-gray-200 text-center p-3 shadow-md border-b border-gray-700 text-sm tracking-wide">
          Sistem QC Pabrik • Dibuat oleh Randi • 2025
        </div>

        {/* KONTEN */}
        <div className="p-6">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pengembalian" element={<PengembalianPage />} />
            <Route path="/timbang" element={<TimbangPage />} />
            <Route path="/inputvalidasi" element={<InputDataValidasiPage />} />
            <Route path="/validasipengembalian" element={<ValidasiPengembalianPage />} />
            <Route path="/report" element={<ReportPengembalianPage />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default App;
