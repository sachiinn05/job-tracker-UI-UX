function PreparationCard() {
  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 hover:shadow-xl transition cursor-pointer">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">
            Dynamic Programming
          </h2>
          <p className="text-gray-400 text-sm">
            Intermediate
          </p>
        </div>

        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
          Confidence 7/10
        </span>

      </div>

      <div className="flex gap-3 mt-6">

        <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
          Update
        </button>

        <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
          Delete
        </button>

      </div>

    </div>
  );
}

export default PreparationCard;