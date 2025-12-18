export default function ReportTabs({ active, onChange }) {
  const tabs = [
    { key: "all", label: "ALL" },
    { key: "pengembalian", label: "Pengembalian" },
    { key: "timbang", label: "Timbang" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              active === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
