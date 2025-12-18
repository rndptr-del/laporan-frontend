import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportFilterModal({ type, onClose, onSubmit }) {
  const [filter, setFilter] = useState({
    start_date: null,
    end_date: null,
    pic: "",
  });

  const handleSubmit = () => {
    onSubmit({
      ...filter,
      start_date: filter.start_date
        ? filter.start_date.toISOString().split("T")[0]
        : "",
      end_date: filter.end_date
        ? filter.end_date.toISOString().split("T")[0]
        : "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-lg font-bold">📊 Filter Laporan</h2>
          <p className="text-xs opacity-90">
            Tentukan periode & PIC laporan
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">

          {/* PERIODE */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              📅 Periode Laporan
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* TANGGAL MULAI */}
              <div>
                <label className="text-xs text-gray-500">
                  Dari Tanggal
                </label>
                <DatePicker
                  selected={filter.start_date}
                  onChange={(date) =>
                    setFilter({ ...filter, start_date: date })
                  }
                  dateFormat="dd MMM yyyy"
                  placeholderText="Pilih"
                  className="w-full mt-1 border rounded-xl px-3 py-2 
                             focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* TANGGAL AKHIR */}
              <div>
                <label className="text-xs text-gray-500">
                  Sampai Tanggal
                </label>
                <DatePicker
                  selected={filter.end_date}
                  minDate={filter.start_date}
                  onChange={(date) =>
                    setFilter({ ...filter, end_date: date })
                  }
                  dateFormat="dd MMM yyyy"
                  placeholderText="Pilih"
                  className="w-full mt-1 border rounded-xl px-3 py-2 
                             focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* PIC */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              👤 Penanggung Jawab
            </h3>

            <input
              type="text"
              placeholder="Contoh: Andi / Budi"
              className="w-full border rounded-xl px-3 py-2 
                         focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFilter({ ...filter, pic: e.target.value })
              }
            />
            <p className="text-xs text-gray-400 mt-1">
              Kosongkan jika ingin menampilkan semua PIC
            </p>
          </div>

          {/* INFO TYPE */}
          <div className="flex items-center justify-between bg-gray-50 border rounded-xl px-4 py-3 text-sm">
            <span className="text-gray-500">Jenis Laporan</span>
            <span className="font-semibold capitalize text-blue-600">
              {type || "all"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-xl bg-white border hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm rounded-xl 
                       bg-blue-600 text-white hover:bg-blue-700"
          >
            🚀 Generate Laporan
          </button>
        </div>

      </div>
    </div>
  );
}
