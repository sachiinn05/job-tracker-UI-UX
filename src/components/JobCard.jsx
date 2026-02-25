import axios from "axios";
import { BASE_URL } from "../utils/constant";

function JobCard({ job, onDelete, onStatusUpdate, onSelect }) {

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied": return "text-blue-400 bg-blue-500/20";
      case "Interview": return "text-purple-400 bg-purple-500/20";
      case "Offer": return "text-green-400 bg-green-500/20";
      case "Rejected": return "text-red-400 bg-red-500/20";
      default: return "text-gray-300 bg-gray-500/20";
    }
  };

  const handleDelete = async () => {
    await axios.delete(`${BASE_URL}/job/${job._id}`, {
      withCredentials: true,
    });
    onDelete(job._id);
  };

  const handleStatusUpdate = async () => {
    const status = prompt("Applied, OA, Interview, Offer, Rejected");
    if (!status) return;

    const res = await axios.patch(
      `${BASE_URL}/job/${job._id}/status`,
      { status },
      { withCredentials: true }
    );

    onStatusUpdate(res.data);
  };

  return (
    <div
      className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 hover:shadow-xl transition cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{job.role}</h2>
          <p className="text-gray-400 text-sm">{job.companyName}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.currentStatus)}`}>
          {job.currentStatus}
        </span>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusUpdate();
          }}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
        >
          Update
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;