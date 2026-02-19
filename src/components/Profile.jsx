import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  
 

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      const userData = res.data;

      dispatch(addUser(userData));

      setFirstName(userData.firstName ?? "");
      setLastName(userData.lastName ?? "");
      setEmail(userData.emailId ?? "");
      setAge(userData.age ?? "");
      setGender(userData.gender ?? "");
      setAbout(userData.about ?? "");
      setSkills(userData.skills?.join(", ") ?? "");

      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  
  const saveProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age: age ? Number(age) : undefined,
          gender: gender?.toLowerCase(),
          about,
          skills: skills.split(",").map((s) => s.trim()),
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setLoading(false);
    }
  };


  const handlePhotoUpload = async (e) => {
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    try {
      await axios.post(`${BASE_URL}/upload-photo`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProfile(); // refresh redux
    } catch (err) {
      console.error("Photo upload error:", err);
    }
  };

  if (loading || !user) {
    return (
      <h2 className="text-white text-center mt-10">Loading profile...</h2>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6 text-white">
      <div className="w-[480px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10 transition-all duration-300 hover:shadow-purple-500/20">

        {/* ===== Profile Image Section ===== */}
        <div className="flex flex-col items-center relative">

          <div className="relative group">
            {user.photo ? (
              <img
                src={`${BASE_URL}${user.photo}`}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-lg">
                {user.firstName?.charAt(0)}
              </div>
            )}

            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
                ✎
                <input
                  type="file"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {!isEditing ? (
            <>
              <h2 className="text-3xl font-bold mt-6 tracking-wide">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-400 text-sm">{email}</p>
            </>
          ) : (
            <>
              <input
                className="mt-6 w-full bg-white/10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                className="mt-3 w-full bg-white/10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </>
          )}
        </div>

        <div className="border-t border-white/10 my-8"></div>

     
        <div className="space-y-5 text-sm">

          {isEditing ? (
            <>
              <input
                type="number"
                className="w-full bg-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <select
                className="w-full bg-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>

              <textarea
                className="w-full bg-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <input
                className="w-full bg-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </>
          ) : (
            <>
              <p><span className="text-gray-400">Age:</span> {age}</p>
              <p><span className="text-gray-400">Gender:</span> {gender}</p>
              <p><span className="text-gray-400">About:</span> {about}</p>

              <div>
                <p className="text-gray-400 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {skills &&
                    skills.split(",").map((skill, i) => (
                      <span
                        key={i}
                        className="bg-purple-600/80 px-3 py-1 rounded-full text-xs hover:bg-purple-500 transition"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>

        
        <button
          onClick={isEditing ? saveProfile : () => setIsEditing(true)}
          className={`mt-10 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isEditing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          }`}
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
