import HistoryCard from "./HistoryCard";

function History({
  history,
  setStudyKit,
  searchTerm,
  setSearchTerm,
  handleDeleteHistory,
}) {
  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
         Study History
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search history..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-5 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredHistory.length === 0 ? (
        <p className="text-gray-400 text-center">
          No matching study kits found.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <HistoryCard
  key={item.id}
  item={item}
  setStudyKit={setStudyKit}
  handleDeleteHistory={handleDeleteHistory}
/>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;