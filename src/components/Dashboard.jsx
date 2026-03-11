import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import PreparationCard from "./PreparationCard";
import bg from "../assets/bg.jpg";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [preparation, setPreparation] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard`, {
        withCredentials: true,
      });

      setStats(res.data.jobs);
      setPreparation(res.data.preparation);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return (
      <div className="pt-24 text-white text-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      
      {/* Dark overlay to hide background text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

      {/* Content */}
      <div className="relative min-h-screen pt-24 px-6">

        <div className="max-w-7xl mx-auto text-white">

          <h1 className="text-4xl font-bold mb-10 tracking-wide">
            Dashboard
          </h1>

          {/* Job Tracker Section */}
          
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Job Tracker
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12">

            <StatCard title="Total" value={stats.total} />
            <StatCard title="Applied" value={stats.applied} />
            <StatCard title="OA" value={stats.oa} />
            <StatCard title="Interview" value={stats.interview} />
            <StatCard title="Offer" value={stats.offer} />
            <StatCard title="Rejected" value={stats.rejected} />

          </div>

          {/* Preparation Tracker */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Preparation Tracker
            </h2>
          </div>

          {preparation.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-xl text-center text-gray-400">
              No preparation topics yet
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {preparation.map((topic) => (
                <PreparationCard
                  key={topic._id}
                  topic={topic}
                  showActions={false}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;


function StatCard({ title, value }) {
  return (
    <div
      className="
      p-6 rounded-xl
      bg-white/5
      backdrop-blur-md
      border border-white/10
      shadow-lg
      hover:border-indigo-400
      hover:scale-[1.03]
      transition-all duration-300
      "
    >
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-1">
        {value}
      </h2>
    </div>
  );
}