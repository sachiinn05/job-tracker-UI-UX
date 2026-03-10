function PreparationCard({ topic, onSelect, onDelete, onUpdate, showActions = true }) {

  if (!topic) return null;

  return (
    <div
      className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 hover:shadow-xl transition cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">
            {topic.topic}
          </h2>

          <p className="text-gray-400 text-sm">
            {topic.level}
          </p>
        </div>

        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
          {topic.confidence}/10
        </span>

      </div>

      {showActions && (
        <div className="flex gap-3 mt-6">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(topic._id);
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            Update
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(topic._id);
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default PreparationCard;