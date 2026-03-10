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
      <div className="pt-24 text-white text-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/70 min-h-screen pt-24 px-6 max-w-7xl mx-auto text-white">

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">

          <div className="bg-gray-900/80 p-6 rounded-xl text-center border border-white/10">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-2xl font-bold">{stats.total}</h2>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-xl text-center border border-blue-500/20">
            <p className="text-gray-400 text-sm">Applied</p>
            <h2 className="text-2xl font-bold">{stats.applied}</h2>
          </div>

          <div className="bg-yellow-500/10 p-6 rounded-xl text-center border border-yellow-500/20">
            <p className="text-gray-400 text-sm">OA</p>
            <h2 className="text-2xl font-bold">{stats.oa}</h2>
          </div>

          <div className="bg-purple-500/10 p-6 rounded-xl text-center border border-purple-500/20">
            <p className="text-gray-400 text-sm">Interview</p>
            <h2 className="text-2xl font-bold">{stats.interview}</h2>
          </div>

          <div className="bg-green-500/10 p-6 rounded-xl text-center border border-green-500/20">
            <p className="text-gray-400 text-sm">Offer</p>
            <h2 className="text-2xl font-bold">{stats.offer}</h2>
          </div>

          <div className="bg-red-500/10 p-6 rounded-xl text-center border border-red-500/20">
            <p className="text-gray-400 text-sm">Rejected</p>
            <h2 className="text-2xl font-bold">{stats.rejected}</h2>
          </div>

        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Preparation Tracker</h2>
        </div>

        {preparation.length === 0 ? (
          <div className="bg-gray-900/80 border border-white/10 p-8 rounded-xl text-center text-gray-400">
            No preparation topics yet
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
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
  );
}

export default Dashboard;