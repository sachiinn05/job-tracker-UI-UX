function PreparationDetailsPanel({ topic }) {

  if (!topic) {
    return (
      <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 sticky top-24 h-fit">
        <p className="text-gray-400">
          Select a topic to view full details
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 sticky top-24 h-fit">

      <h2 className="text-2xl font-semibold">{topic.topic}</h2>
      <p className="text-gray-400">{topic.level}</p>

      <div className="mt-6 space-y-2">
        <p>Confidence: {topic.confidence}/10</p>
        <p>Category: {topic.category || "General"}</p>
        <p>
          Last Updated:{" "}
          {topic.updatedAt
            ? new Date(topic.updatedAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Notes</h3>

        <div className="border-l-2 border-green-500 pl-4">
          <p className="text-gray-300">
            {topic.notes || "No notes added"}
          </p>
        </div>
      </div>

    </div>
  );
}

export default PreparationDetailsPanel;