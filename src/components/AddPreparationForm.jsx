function AddPreparationForm() {
  return (
    <form className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-lg">

      <h2 className="text-2xl font-semibold mb-6">
        Add New Topic
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Topic (e.g. Dynamic Programming)"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <select className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-600">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

      </div>

      <div className="mt-4">
        <label className="text-gray-400 text-sm">
          Confidence Level (1–10)
        </label>

        <input
          type="range"
          min="1"
          max="10"
          className="w-full mt-2"
        />
      </div>

      <textarea
        placeholder="Notes..."
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-full mt-4"
      />

      <button
        type="button"
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl font-semibold"
      >
        + Add Topic
      </button>

    </form>
  );
}

export default AddPreparationForm;