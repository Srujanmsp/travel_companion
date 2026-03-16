import { useNavigate } from "react-router-dom";
import logo from '../assets/logoTC.png';

export default function LoginNavbar() {
  const navigate = useNavigate();

  return (
  <header className="flex items-center justify-between px-8 py-5 border-b bg-white">
    {/* Left: Logo and App Name */}
    <div className="flex items-center space-x-3">
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      <span className="text-3xl font-pacifico font-bold text-blue-700 tracking-wide select-none">
        <a 
          href="#home">
        Travel Companion
        </a>
      </span>
    </div>
    {/* Right: Home Button */}
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition">
      Home
    </button>
  </header>
 );

}
