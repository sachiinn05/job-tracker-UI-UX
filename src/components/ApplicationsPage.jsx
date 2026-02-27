import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import AnalyticsCards from "../components/AnalyticsCards";
import AddJobForm from "../components/AddJobForm";
import JobCard from "../components/JobCard";
import JobDetailsPanel from "../components/JobDetailsPanel";
import bg from "../assets/bg.jpg";

import { useDispatch, useSelector } from "react-redux";
import { addJob, setJob, deleteJob, updateJob, setSelectedJob } from "../utils/jobSlice";

function ApplicationsPage() {

  const dispatch = useDispatch();
  const { jobs, selectedJob } = useSelector((store) => store.job);

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const fetchJobs = async () => {
    const res = await axios.get(`${BASE_URL}/job?status=${statusFilter}`, {
      withCredentials: true,
    });

    dispatch(setJob(res.data));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/70 min-h-screen px-8 py-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-2">Applications</h1>
          <p className="text-gray-400 mb-6">Track everything here</p>

          <AnalyticsCards />

          <div className="flex gap-4 mt-6 mb-6">
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 p-2 rounded"
            >
              <option value="">All Status</option>
              <option>Applied</option>
              <option>OA</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <input
              placeholder="Search company..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 p-2 rounded w-60"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

           
              <AddJobForm
                onJobAdded={(job) => dispatch(addJob(job))}
              />

              {jobs
                .filter((j) =>
                  j.companyName.toLowerCase().includes(search.toLowerCase())
                )
                .map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}

                    onSelect={() => dispatch(setSelectedJob(job))}

                    onDelete={(id) =>
                      dispatch(deleteJob(id))
                    }

                    onStatusUpdate={(updated) =>
                      dispatch(updateJob(updated))
                    }
                  />
                ))}
            </div>

            {selectedJob && <JobDetailsPanel job={selectedJob} />}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;