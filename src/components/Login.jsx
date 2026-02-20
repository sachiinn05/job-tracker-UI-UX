import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Login failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) handleLogin();
    else handleSignUp();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/careers-analysis-cooperation-data-development-concept_53876-21163.jpg')",
      }}
    >

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* auth card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl p-10 text-white">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin
              ? "Sign in to continue"
              : "Start tracking your job applications"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="text-xs text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 pr-12 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-gray-400 hover:text-white transition"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-8 text-sm text-gray-400">
          {isLogin ? "New here?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-400 hover:text-indigo-300 transition"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthForm;