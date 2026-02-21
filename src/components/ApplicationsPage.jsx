import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import AddJobForm from "../components/AddJobForm";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

function ApplicationsPage() {
  const [jobs, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/job`, {
        withCredentials: true,
      });
      setJob(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

 
  const handleJobAdded = (newJob) => {
    setJob((prev) => [newJob, ...prev]);
  };

  if (loading) {
    return (
      <div className="pt-24 text-center text-white">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>


      <AddJobForm onJobAdded={handleJobAdded} />

      {jobs.length === 0 ? (
        <p>No job Application yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;