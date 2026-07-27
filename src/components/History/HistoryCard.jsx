function HistoryCard({
  item,
  setStudyKit,
  handleDeleteHistory,
}) {
  return (
    <div className="flex justify-between items-center bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition">
      
      <div
        className="cursor-pointer flex-1"
        onClick={() => setStudyKit(item.studyKit)}
      >
        <h3 className="text-white font-semibold">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {item.date}
        </p>
      </div>

      <button
        onClick={() => handleDeleteHistory(item.id)}
        className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
      >
        🗑
      </button>

    </div>
  );
}

export default HistoryCard;