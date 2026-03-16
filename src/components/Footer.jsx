import logo from '../assets/logoTC.png';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import React Router Link

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-blue-50 via-white to-emerald-50 border-t py-8 px-8 mt-auto shadow-inner">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <img src={logo} alt="Logo" className="h-20 w-auto drop-shadow-lg" />
          <span className="text-3xl font-pacifico font-bold text-blue-700 tracking-wide select-none">
            Travel Companion
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-600 text-base font-semibold">
          <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="#" aria-label="Twitter">
            <span className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 w-12 h-12 shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300">
              <FaTwitter className="text-white text-2xl" />
            </span>
          </a>
          <a href="#" aria-label="Facebook">
            <span className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 w-12 h-12 shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300">
              <FaFacebook className="text-white text-2xl" />
            </span>
          </a>
          <a href="#" aria-label="Instagram">
            <span className="flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-yellow-500 to-purple-500 w-12 h-12 shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300">
              <FaInstagram className="text-white text-2xl" />
            </span>
          </a>
        </div>
      </div>

      {/* Decorative Gradient Bar */}
      <div className="w-32 h-1 rounded-full mx-auto my-6 bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 opacity-70"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 font-medium tracking-wide">
        © {new Date().getFullYear()} <span className="font-bold text-blue-500">Travel Companion</span>. All rights reserved.
      </div>
    </footer>
  );
}
