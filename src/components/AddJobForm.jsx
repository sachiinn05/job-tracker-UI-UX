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
      className="bg-gray-800 p-5 rounded-xl border border-gray-700 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add Job Application</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company"
          value={formData.companyName}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />

        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={formData.platform}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />

        <input
          type="text"
          name="jobLink"
          placeholder="Job Link"
          value={formData.jobLink}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="p-2 rounded bg-gray-700 w-full mt-4"
      />

      <button className="bg-blue-600 px-4 py-2 mt-4 rounded-lg hover:bg-blue-700">
        Add Job
      </button>
    </form>
  );
}

export default AddJobForm;