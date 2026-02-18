import { useState } from "react";

function Profile() {

  // 🧠 Local state (form + profile data)
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("Sachin");
  const [lastName, setLastName] = useState("Singh");
  const [email, setEmail] = useState("sachin@gmail.com");
  const [age, setAge] = useState(23);
  const [gender, setGender] = useState("Male");
  const [about, setAbout] = useState("MERN Developer");
  const [skills, setSkills] = useState("React, Node");

  // 🧠 toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-3xl font-bold">
            {firstName.charAt(0)}
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

        {/* Buttons */}
        <button
          onClick={handleEditToggle}
          className="mt-8 w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>

      </div>
    </div>
  );
}

export default Profile;
