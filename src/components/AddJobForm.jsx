import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    platform: "",
    jobLink: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/job`, formData, {
        withCredentials: true,
      });

      onJobAdded(res.data);

      setFormData({
        companyName: "",
        role: "",
        platform: "",
        jobLink: "",
        notes: ""
      });
    } catch (err) {
      console.error("Error adding job", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 mb-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Add New Application</h2>

      <div className="grid grid-cols-2 gap-4">
        {["companyName", "role", "platform", "jobLink"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        ))}
      </div>

      <textarea
        name="notes"
        placeholder="Notes..."
        value={formData.notes}
        onChange={handleChange}
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-600 w-full mt-4"
      />

      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold">
        + Add Application
      </button>
    </form>
  );
}

export default AddJobForm;