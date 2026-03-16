import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logoTC.png";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function PlanNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login", { state: { from: "/profile" } });
    }
  };

  const handleLogin = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Logo (left) */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <span className="ml-3 text-3xl font-pacifico font-bold text-blue-700 tracking-wide select-none">
          <a 
          href="#home">
          Travel Companion
          </a>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        <button
          className="text-gray-700 hover:text-blue-600 font-medium"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="text-gray-700 hover:text-blue-600 font-medium"
          onClick={handleProfileClick}
        >
          Profile
        </button>
      </nav>

      {/* Right side: Auth Section */}
      {user ? (
        <div className="flex items-center gap-3">
          {user.photo ? (
            <img
              src={user.photo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />
          ) : (
            <FaUserCircle className="text-2xl text-blue-600" />
          )}
          <span className="text-gray-700 font-medium">{user.name?.split(" ")[0]}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded transition"
          onClick={handleLogin}
        >
          Sign up for Save
        </button>
      )}
    </header>
  );
}
