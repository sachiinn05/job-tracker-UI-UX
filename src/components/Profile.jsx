import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  // 🔹 fetch profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );

      const user = res.data;

      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.emailId || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills?.join(", ") || "");

      setLoading(false);

    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  // 🔹 save profile API
  const saveProfile = async () => {
    try {
      setLoading(true);

      await axios.patch(
        BASE_URL + "/profile/editi",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills: skills.split(",").map(s => s.trim())
        },
        { withCredentials: true }
      );

      setIsEditing(false);
      setLoading(false);

    } catch (err) {
      console.error("Error updating profile:", err);
      setLoading(false);
    }
  };

  // 🔹 loader
  if (loading) {
    return <h2 className="text-white text-center mt-10">Loading profile...</h2>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-3xl font-bold">
            {firstName?.charAt(0)}
          </div>

          {isEditing ? (
            <>
              <input
                className="mt-4 p-2 rounded-lg bg-white/20"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="mt-2 p-2 rounded-lg bg-white/20"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="mt-2 p-2 rounded-lg bg-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mt-4">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-400">{email}</p>
            </>
          )}
        </div>

        <div className="border-t border-white/20 my-6"></div>

        {/* Info */}
        <div className="space-y-3 text-sm">

          {isEditing ? (
            <>
              <input
                className="w-full p-2 rounded-lg bg-white/20"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <input
                className="w-full p-2 rounded-lg bg-white/20"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />

              <textarea
                className="w-full p-2 rounded-lg bg-white/20"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <input
                className="w-full p-2 rounded-lg bg-white/20"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </>
          ) : (
            <>
              <p><span className="text-gray-400">Age:</span> {age}</p>
              <p><span className="text-gray-400">Gender:</span> {gender}</p>
              <p><span className="text-gray-400">About:</span> {about}</p>
              <p><span className="text-gray-400">Skills:</span> {skills}</p>
            </>
          )}
        </div>

        {/* Button */}
        {isEditing ? (
          <button
            onClick={saveProfile}
            className="mt-8 w-full bg-green-500 py-3 rounded-xl font-semibold"
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-8 w-full bg-purple-600 py-3 rounded-xl font-semibold"
          >
            Edit Profile
          </button>
        )}

      </div>
    </div>
  );
}

export default Profile;
