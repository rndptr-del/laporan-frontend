export default function ReportSummary({ summary }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="bg-blue-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">Total KG</p>
        <p className="text-xl font-bold">{summary.total_qty_kg}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">Total Kantong</p>
        <p className="text-xl font-bold">{summary.total_kantong}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">Total Data</p>
        <p className="text-xl font-bold">{summary.total_data}</p>
      </div>
    </div>
  );
}
