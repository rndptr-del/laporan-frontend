import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Layout({ children, title = "Pengembalian Barang" }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-6 shadow-lg">
        <h1 className="text-xl font-semibold mb-10 tracking-wide">
          Sistem Gudang
        </h1>

        <nav className="space-y-2">
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition" to="/dashboard">
            Dashboard
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition" to="/pengembalian">
            Pengembalian
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition" to="/laporan">
            Laporan
          </Link>
        </nav>
      </aside>

      {/* ================= BACKDROP MOBILE ================= */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* ================= SIDEBAR MOBILE ================= */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-6 z-50 md:hidden
          transform transition-transform duration-300 
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute right-4 top-4"
          onClick={() => setOpenSidebar(false)}
        >
          <X className="text-white" />
        </button>

        <h1 className="text-xl font-semibold tracking-wide mb-10">
          Sistem Gudang
        </h1>

        <nav className="space-y-2">
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800" to="/dashboard">
            Dashboard
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800" to="/pengembalian">
            Pengembalian
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-gray-800" to="/laporan">
            Laporan
          </Link>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col">

        {/* ================= TOPBAR ================= */}
        <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setOpenSidebar(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu />
          </button>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mx-auto md:mx-0">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <User className="text-gray-600" />
            <span className="text-gray-700 font-medium hidden sm:block">
              Admin Gudang
            </span>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-5">

            {/* ================= FILTER CARD ================= */}
            <div className="bg-white p-4 md:p-6 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter Data</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-600 text-sm">Tanggal Awal</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Tanggal Akhir</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">PIC</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg border focus:ring focus:ring-blue-300"
                    placeholder="Nama PIC"
                  />
                </div>
              </div>
            </div>

            {/* ================= TABLE CARD ================= */}
            <div className="bg-white p-4 md:p-6 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Data Pengembalian
              </h3>

              <div className="w-full overflow-x-auto rounded-lg">
                <div className="overflow-auto max-h-[500px] rounded-lg border">
                  {/* DataTable tetap di sini */}
                  {children}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
