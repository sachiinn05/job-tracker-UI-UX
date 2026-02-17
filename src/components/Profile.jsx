import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <h2 className="text-center mt-10">Loading profile...</h2>;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-3xl font-bold">
            {user.firstName?.charAt(0)}
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-400">{user.emailId}</p>
        </div>

        <div className="border-t border-white/20 my-6"></div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <p><span className="text-gray-400">Age:</span> {user.age}</p>
          <p><span className="text-gray-400">Gender:</span> {user.gender}</p>
          <p><span className="text-gray-400">About:</span> {user.about}</p>
          <p><span className="text-gray-400">Skills:</span> {user.skills?.join(", ")}</p>
        </div>

        {user.photo && (
          <img
            src={BASE_URL + user.photo}
            alt="profile"
            className="mt-6 rounded-xl"
          />
        )}

        {/* Button */}
        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-8 w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;
