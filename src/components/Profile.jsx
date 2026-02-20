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
    } catch {
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
    } catch {
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

      await fetchProfile();
    } catch {}
  };

  if (loading || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/careers-analysis-cooperation-data-development-concept_53876-21163.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <span className="relative z-10">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/careers-analysis-cooperation-data-development-concept_53876-21163.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10">

        <div className="h-72 bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/30" />

        <div className="max-w-7xl mx-auto px-6 -mt-36 pb-20">

          <div className="grid lg:grid-cols-[360px_1fr] gap-12">

            <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl p-8">
              <div className="flex flex-col items-center gap-6">

                <div className="relative group">
                  {user.photo ? (
                    <img
                      src={`${BASE_URL}${user.photo}`}
                      className="w-44 h-44 rounded-2xl object-cover border border-white/10 shadow-2xl hover:scale-[1.03] transition"
                    />
                  ) : (
                    <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl font-bold shadow-2xl">
                      {user.firstName?.charAt(0)}
                    </div>
                  )}

                  {isEditing && (
                    <label className="absolute bottom-3 right-3 w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur border border-white/20 rounded-full cursor-pointer hover:scale-110 transition">
                      ✎
                      <input type="file" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {!isEditing ? (
                  <>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      {firstName} {lastName}
                    </h1>
                    <p className="text-gray-400 text-sm">{email}</p>

                    <div className="flex gap-12 pt-6 border-t border-white/10 text-sm">
                      <div className="text-center">
                        <p className="text-white font-medium">{age || "-"}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wide">Age</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium capitalize">{gender || "-"}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wide">Gender</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full space-y-4">
                    <input className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                    <input className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                    <input type="number" className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none" value={age} onChange={(e)=>setAge(e.target.value)} />
                    <select className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none" value={gender} onChange={(e)=>setGender(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                )}

                <button onClick={isEditing ? saveProfile : ()=>setIsEditing(true)} className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition">
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>

              </div>
            </div>

            <div className="space-y-10">

              <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                {!isEditing ? (
                  <p className="text-gray-300">{about || "Add a professional summary about yourself."}</p>
                ) : (
                  <textarea value={about} onChange={(e)=>setAbout(e.target.value)} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 min-h-[120px] max-h-[160px] overflow-y-auto resize-none outline-none"/>
                )}
              </div>

              <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-semibold mb-6">Skills</h2>
                {!isEditing ? (
                  <div className="flex flex-wrap gap-3">
                    {skills?.split(",").map((s,i)=>(
                      <span key={i} className="px-4 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <input value={skills} onChange={(e)=>setSkills(e.target.value)} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none"/>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;