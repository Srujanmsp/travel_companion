import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 
import { Toaster } from "react-hot-toast"; 

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
        email: form.email,
        password: form.password,
      });

      // Save in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Call login() with both user and token
      login(res.data.user, res.data.token);

      // Save any unsaved plan
      const unsavedPlan = localStorage.getItem("unsavedPlan");
      if (unsavedPlan) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/plan/save`, // 🔁 Replace with your real save endpoint
          JSON.parse(unsavedPlan),
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          }
        );
        localStorage.removeItem("unsavedPlan");
      }

      // Redirect to original page if available
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed.");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="flex flex-col justify-center items-center w-full h-full my-12">
        <div className="w-full max-w-2xl md:w-2/5 sm:w-3/5 bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10">
          {/* Welcome Text */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
            <p className="text-gray-500 text-sm">Sign in to plan your next adventure.</p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
                placeholder="you@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-blue-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-lg shadow transition"
            >
              Login
            </button>

            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition"
              onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)}
            >
              <FaGoogle className="text-lg" />
              Continue with Google
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            New to Travel Companion?{" "}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
