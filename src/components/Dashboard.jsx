import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [prep, setPrep] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard`, {
        withCredentials: true,
      });

      setStats(res.data.jobs);
      setPrep(res.data.preparation);
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
    <div className="pt-24 px-6 max-w-7xl mx-auto text-white">

      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">

        <div className="bg-gray-800 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Total</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>

        <div className="bg-blue-600/20 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Applied</p>
          <h2 className="text-2xl font-bold">{stats.applied}</h2>
        </div>

        <div className="bg-yellow-600/20 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">OA</p>
          <h2 className="text-2xl font-bold">{stats.oa}</h2>
        </div>

        <div className="bg-purple-600/20 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Interview</p>
          <h2 className="text-2xl font-bold">{stats.interview}</h2>
        </div>

        <div className="bg-green-600/20 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Offer</p>
          <h2 className="text-2xl font-bold">{stats.offer}</h2>
        </div>

        <div className="bg-red-600/20 p-6 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Rejected</p>
          <h2 className="text-2xl font-bold">{stats.rejected}</h2>
        </div>

      </div>

      <h2 className="text-2xl font-semibold mb-4">Preparation Tracker</h2>

      {prep.length === 0 ? (
        <p className="text-gray-400">No preparation data</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {prep.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800 p-5 rounded-xl border border-gray-700"
            >
              <h3 className="text-lg font-semibold">{p.topic}</h3>
              <p className="text-gray-400 mt-2">
                Progress: {p.progress}%
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;