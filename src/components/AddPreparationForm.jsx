import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${BASE_URL}/preparation`,
      formData,
      { withCredentials: true }
    );

    onAdd(res.data);

    setFormData({
      topic: "",
      level: "Beginner",
      confidence: 5,
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/70 p-6 rounded-2xl">
      <input
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        placeholder="Topic"
        className="p-3 bg-gray-800 rounded-lg w-full mb-4"
      />

      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
        className="p-3 bg-gray-800 rounded-lg w-full mb-4"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <label>Confidence: {formData.confidence}</label>
      <input
        type="range"
        min="1"
        max="10"
        name="confidence"
        value={formData.confidence}
        onChange={handleChange}
        className="w-full mb-4"
      />

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="p-3 bg-gray-800 rounded-lg w-full mb-4"
      />

      <button className="bg-purple-600 w-full p-3 rounded-xl">
        + Add Topic
      </button>
    </form>
  );
}

export default AddPreparationForm;