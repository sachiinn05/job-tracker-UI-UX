import { useState } from "react";

function AddPreparationForm({ onAdd }) {

  const [formData, setFormData] = useState({
    topic: "",
    level: "Beginner",
    confidence: 5,
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTopic = {
      ...formData,
      id: Date.now(),
    };

    onAdd(newTopic);

    setFormData({
      topic: "",
      level: "Beginner",
      confidence: 5,
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700"
    >

      <h2 className="text-2xl font-semibold mb-6">
        Add New Topic
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Topic"
          className="p-3 bg-gray-800 rounded-lg"
          required
        />

        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="p-3 bg-gray-800 rounded-lg"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

      </div>

      <div className="mt-4">
        <label>Confidence: {formData.confidence}</label>
        <input
          type="range"
          min="1"
          max="10"
          name="confidence"
          value={formData.confidence}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="p-3 bg-gray-800 rounded-lg w-full mt-4"
      />

      <button className="mt-6 w-full bg-purple-600 p-3 rounded-xl">
        + Add Topic
      </button>

    </form>
  );
}

export default AddPreparationForm;