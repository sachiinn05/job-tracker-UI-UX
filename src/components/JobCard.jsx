function JobCard({job}) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{job.role}</h2>
        <span className="px-3 py-1 text-sm bg-yellow-500 text-black rounded-full">
          {job.currentStatus}
        </span>
      </div>

      <p className="mt-2 text-gray-300">Company: {job.companyName}</p>
      <p className="text-gray-300">Platform: {job.platform}</p>

      <div className="flex gap-3 mt-4">
        <button className="bg-blue-600 px-4 py-1 rounded-lg hover:bg-blue-700">
          View
        </button>
        <button className="bg-green-600 px-4 py-1 rounded-lg hover:bg-green-700">
          Update Status
        </button>
        <button className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;