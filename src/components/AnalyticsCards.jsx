import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

function AnalyticsCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/job/analytics`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  const cardStyle =
    "p-6 rounded-2xl bg-gray-900/80 backdrop-blur-md border border-white/10";

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className={cardStyle}>
        <p className="text-gray-400 text-sm">Total</p>
        <h2 className="text-3xl font-bold">{data.total}</h2>
      </div>

      <div className={`${cardStyle} text-blue-400`}>
        <p className="text-gray-400 text-sm">Applied</p>
        <h2 className="text-3xl font-bold">{data.applied}</h2>
      </div>

      <div className={`${cardStyle} text-purple-400`}>
        <p className="text-gray-400 text-sm">Interview</p>
        <h2 className="text-3xl font-bold">{data.interview}</h2>
      </div>

      <div className={`${cardStyle} text-green-400`}>
        <p className="text-gray-400 text-sm">Offer</p>
        <h2 className="text-3xl font-bold">{data.offer}</h2>
      </div>

      <div className={`${cardStyle} text-red-400`}>
        <p className="text-gray-400 text-sm">Rejected</p>
        <h2 className="text-3xl font-bold">{data.rejected}</h2>
      </div>
    </div>
  );
}

export default AnalyticsCards;