function PreparationDetailsPanel() {
  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 sticky top-24 h-fit">

      <h2 className="text-2xl font-semibold">
        Dynamic Programming
      </h2>

      <p className="text-gray-400 mt-2">
        Level: Intermediate
      </p>

      <p className="mt-4">
        Confidence: 7 / 10
      </p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">
          Notes
        </h3>

        <p className="text-gray-300">
          Need more practice on DP on Trees and Memoization.
        </p>
      </div>

    </div>
  );
}

export default PreparationDetailsPanel;