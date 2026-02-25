function JobDetailsPanel({ job }) {
  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-white/10 sticky top-24 h-fit">

      <h2 className="text-2xl font-semibold">{job.role}</h2>
      <p className="text-gray-400">{job.companyName}</p>

      <div className="mt-6 space-y-2">
        <p>Status: {job.currentStatus}</p>
        <p>Platform: {job.platform}</p>
        <p>
          Applied: {new Date(job.appliedDate).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Timeline</h3>

        {job.statusHistory?.map((s, i) => (
          <div key={i} className="mb-4 border-l-2 border-blue-500 pl-4">
            <p className="font-medium">{s.status}</p>
            <p className="text-gray-400 text-sm">
              {new Date(s.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobDetailsPanel;