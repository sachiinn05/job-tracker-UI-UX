import React, { useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, _setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[400px] text-white">

        <h2 className="text-4xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back" : "Join Now"}
        </h2>

        <p className="text-center text-gray-400 mb-6 text-sm">
          {isLogin ? "Login to continue watching" : "Create account & start exploring"}
        </p>

        {!isLogin && (
          <div className="mb-4">
            <label className="text-sm text-gray-300">First Name</label>
            <input
              type="text"
              placeholder="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:border-red-500 transition"
            />

            <label className="text-sm text-gray-300">Last Name</label>
            <input
              type="text"
              placeholder="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:border-red-500 transition"
            />
          </div>
        )}

   
        <div className="mb-4">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:border-red-500 transition"
          />
        </div>

      
        <div className="mb-5 relative">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:border-red-500 transition"
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

       
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 transition-all duration-300 p-3 rounded-lg font-semibold shadow-lg">
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-6 text-sm text-gray-400">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 ml-2 cursor-pointer font-semibold hover:underline"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
