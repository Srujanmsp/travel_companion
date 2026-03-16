import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AltNavbar from "./components/AltNavbar";
import LoginNavbar from "./components/LoginNavbar";
import Home from "./pages/Home";
import StartPlanningPage from "./pages/StartPlanning";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Footer from "./components/Footer";
import Planning from "./pages/Planning";
import PlanNavbar from "./components/PlanNavbar";
import Profile from "./pages/Profile";
import OAuthRedirectHandler from "./pages/OAuthRedirectHandler";
import Features from "./components/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PrivateRoute from "./routes/PrivateRoute";

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  let navbarToShow;
  if (path === "/start-planning" || path === "/register") {
    navbarToShow = <AltNavbar />;
  } else if (path === "/login") {
    navbarToShow = <LoginNavbar />;
  } else if (path === "/planning") {
    navbarToShow = <PlanNavbar />;
  } else {
    navbarToShow = <Navbar />;
  }

  // Only show footer if NOT on planning page
  const showFooter = path !== "/planning";

  return (
    <>
      {navbarToShow}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-planning" element={<StartPlanningPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes: block direct access and redirect unauthenticated users to /start-planning */}
          <Route element={<PrivateRoute />}>
            <Route path="/planning" element={<Planning />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/oauth/callback" element={<OAuthRedirectHandler />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}
