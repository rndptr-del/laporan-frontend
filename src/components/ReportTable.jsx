export default function ReportTable({ data }) {
  if (!data.length) {
    return (
      <p className="text-gray-400 text-sm mt-4 text-center">
        Tidak ada data
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">PIC</th>
            <th className="border px-3 py-2">Tanggal</th>
            <th className="border px-3 py-2">Jenis</th>
            <th className="border px-3 py-2 text-right">KG</th>
            <th className="border px-3 py-2 text-right">Kantong</th>
            <th className="border px-3 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {/* PIC */}
              <td className="border px-3 py-2">{row.pic}</td>

              {/* Tanggal */}
              <td className="border px-3 py-2">
                {row.tanggal}
              </td>

              {/* Jenis */}
             <td className="border px-3 py-2">
    {row.jenis}
</td>


              {/* KG */}
              <td className="border px-3 py-2 text-right">
                {row.kg}
              </td>

              {/* Kantong */}
              <td className="border px-3 py-2 text-right">
                {row.kantong}
              </td>

              {/* Status */}
              <td className="border px-3 py-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
