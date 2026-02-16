import React, { useState } from "react";

function Profile() {

  const user = {
    firstName: "Sachin",
    lastName: "Singh",
    emailId: "sachin@gmail.com"
  };

  // 🔥 state to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 w-[500px]">

        {/* Header */}
        <div className="flex flex-col items-center">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
            {user.firstName.charAt(0)}
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-400">{user.emailId}</p>
        </div>

        <div className="border-t border-white/20 my-6"></div>

        {/* Profile Info */}
        <div className="space-y-4">

          {/* First Name */}
          <div>
            <label className="text-gray-400 text-sm">First Name</label>

            {isEditing ? (
              <input
                className="w-full bg-white/10 p-3 rounded-lg mt-1 outline-none"
                defaultValue={user.firstName}
              />
            ) : (
              <div className="bg-white/10 p-3 rounded-lg mt-1">
                {user.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-gray-400 text-sm">Last Name</label>

            {isEditing ? (
              <input
                className="w-full bg-white/10 p-3 rounded-lg mt-1 outline-none"
                defaultValue={user.lastName}
              />
            ) : (
              <div className="bg-white/10 p-3 rounded-lg mt-1">
                {user.lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>

            {isEditing ? (
              <input
                className="w-full bg-white/10 p-3 rounded-lg mt-1 outline-none"
                defaultValue={user.emailId}
              />
            ) : (
              <div className="bg-white/10 p-3 rounded-lg mt-1">
                {user.emailId}
              </div>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">

          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 p-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Edit Profile
            </button>
          )}

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-green-600 p-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Save
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default Profile;
