import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function OAuthRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      axios
        .get(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          login(res.data.user, token); // ✅ Save to AuthContext
          navigate("/planning");
        })
        .catch((err) => {
          console.error("Failed to fetch user from token:", err.message);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="p-8 text-center">Logging in...</div>;
}
