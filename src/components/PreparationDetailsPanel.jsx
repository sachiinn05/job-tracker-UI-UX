function PreparationDetailsPanel({ topic }) {

  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 sticky top-24">

      <h2 className="text-2xl font-semibold">
        {topic.topic}
      </h2>

      <p className="text-gray-400 mt-2">
        Level: {topic.level}
      </p>

      <p className="mt-4">
        Confidence: {topic.confidence}/10
      </p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">
          Notes
        </h3>

        <p className="text-gray-300">
          {topic.notes}
        </p>
      </div>

    </div>
  );
}

export default PreparationDetailsPanel;