import logo from '../assets/logoTC.png';
import { useNavigate, useLocation } from "react-router-dom";


export default function AltNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <span className="text-3xl font-pacifico font-bold text-blue-700 tracking-wide select-none">
          <a 
          href="#home">
          Travel Companion
          </a>
        </span>
      </div>
      <nav className="flex items-center space-x-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 hover:text-blue-500 font-medium transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/login", { state: { from: location.pathname } })}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
        >
           Login
        </button>
      </nav>
    </header>
  );
}
