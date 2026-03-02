function PreparationCard({ topic, onSelect, onDelete, onUpdate }) {

  return (
    <div
      className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 cursor-pointer"
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

      <div className="flex gap-3 mt-6">

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate();
          }}
          className="px-4 py-2 bg-green-600 rounded-lg"
        >
          Update
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default PreparationCard;