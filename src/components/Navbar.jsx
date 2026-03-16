import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/logoTC.png';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b bg-white">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
        <span className="text-3xl font-pacifico font-bold text-blue-700">
          <a 
          href="#home">
          Travel Companion
          </a>
        </span>
      </div>
      <nav className="flex space-x-8 items-center">
        <a
          href="#home"
          className="font-semibold text-blue-700 hover:text-blue-700 transition"
        >
          Home
        </a>
        <a
          href="#features"
          className="font-semibold text-blue-700 hover:text-blue-700 transition"
        >
          Features
        </a>
        <a
          href="#about"
          className="font-semibold text-blue-700 hover:text-blue-700 transition"
        >
          About Us
        </a>
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className="text-blue-700 font-bold ml-4"
          >
            {user.name} 👤
          </button>
        ) : (
          <button
            onClick={() =>
              navigate("/login", { state: { from: "/" } })
            }
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition ml-4"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
