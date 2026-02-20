import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(addUser(null));
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0b0b0b]/95 backdrop-blur-md border-b border-white/5 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">

      
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide hover:opacity-80 transition"
        >
          JobTracker
        </Link>

       
        {user && (
          <div className="relative" ref={dropdownRef}>
            
         
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer group"
            >
              {user.photo ? (
                <img
                  src={`${BASE_URL}${user.photo}`}
                  alt="avatar"
                  className="w-11 h-11 rounded-full object-cover border border-white/10 shadow-md group-hover:scale-105 group-hover:ring-2 group-hover:ring-purple-500 transition-all duration-200"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-lg font-semibold shadow-md group-hover:scale-105 transition">
                  {user.firstName?.charAt(0)}
                </div>
              )}
            </div>

        
            {open && (
              <div className="absolute right-0 mt-4 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">

             
                <div className="absolute -top-2 right-6 w-4 h-4 bg-[#111] rotate-45 border-l border-t border-white/10"></div>

              
                <div className="px-5 py-4 border-b border-white/10">
                  <p className="font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {user.emailId}
                  </p>
                </div>

          
                <div className="py-2 text-sm">

                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition"
                  >
                    📊 Dashboard
                  </Link>

                  <Link
                    to="/applications"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition"
                  >
                    📁 Applications
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition"
                  >
                    ⚙️ Profile Settings
                  </Link>

                </div>

              
                <div className="border-t border-white/10"></div>

           
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 transition font-medium"
                >
                  🚪 Logout
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;