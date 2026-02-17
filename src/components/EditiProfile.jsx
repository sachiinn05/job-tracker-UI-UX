import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await axios.get(
      BASE_URL + "/profile/view",
      { withCredentials: true }
    );

    const user = res.data;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(user.skills?.join(", ") || "");
  };

  const uploadPhoto = async () => {
    if (!photoFile) return;

    const formData = new FormData();
    formData.append("photo", photoFile);

    await axios.post(
      BASE_URL + "/upload-photo",
      formData,
      { withCredentials: true }
    );
  };

  const saveProfile = async () => {
    await uploadPhoto();

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

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]">

        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
            placeholder="Skills (React, Node)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />

        </div>

        <button
          onClick={saveProfile}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default EditProfile;
