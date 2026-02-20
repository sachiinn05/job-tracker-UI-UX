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
  const dropdownRef = useRef();

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-700 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 text-white">

     
        <Link to="/" className="text-2xl font-bold text-blue-500">
          JobTracker
        </Link>

    
        {user && (
          <div className="relative" ref={dropdownRef}>

        
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              {user.photo ? (
                <img
                  src={`${BASE_URL}${user.photo}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-semibold">
                  {user.firstName?.charAt(0)}
                </div>
              )}
            </div>

        
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">

                <Link
                  to="/dashboard"
                  className="block px-4 py-3 hover:bg-gray-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to="/applications"
                  className="block px-4 py-3 hover:bg-gray-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Applications
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-gray-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-600 transition text-red-400"
                >
                  Logout
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