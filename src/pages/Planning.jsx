import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlanSidebar from "../components/PlanSidebar";
import PlanMainContent from "../components/PlanMainContent";
import PlanMap from "../components/PlanMap";
import { AuthContext } from "../context/AuthContext"; // Get user for name display

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB");
}

export default function Planning() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ✅ NEW — get tripId if coming from Profile's edit button
  const tripId = location.state?.tripId || null;

  // Load persisted trip state or from route
  const [tripState, setTripState] = useState(() => {
    const stateFromRoute = location.state;
    const stored = localStorage.getItem("persistedTrip");
    return stateFromRoute || (stored ? JSON.parse(stored) : {});
  });

  useEffect(() => {
    if (tripState && Object.keys(tripState).length > 0) {
      localStorage.setItem("persistedTrip", JSON.stringify(tripState));
    }
  }, [tripState]);

  const { startingLocation, destination, startDate, endDate } = tripState;

  const tripTitle =
    startingLocation && destination
      ? `${startingLocation} to ${destination}`
      : "Your Trip";

  const tripDates =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Add trip dates";

  const SIDEBAR_WIDTH = 200;
  const MAP_WIDTH = 400;

  const [stops, setStops] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [activeMap, setActiveMap] = useState("main");

  // Section refs
  const notesRef = useRef(null);
  const stopsRef = useRef(null);
  const itineraryRef = useRef(null);
  const budgetRef = useRef(null);

  const [showCongrats, setShowCongrats] = useState(false);

  const handleSidebarNav = (section) => {
    const refs = {
      notes: notesRef,
      "add-stops": stopsRef,
      "plan-itinerary": itineraryRef,
      budget: budgetRef,
    };
    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTripSaveSuccess = () => {
    setShowCongrats(true);
  };

  const Congratulations = () => {
    const userName = user?.name || "Traveler";
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-xl shadow-lg max-w-lg mx-auto border border-gray-200 space-y-5">
        {/* Heading - smaller font but still bold/beautiful */}
        <h6 className="text-2xl font-extrabold text-gray-800 leading-snug">
          Congratulations, <span className="text-blue-600">{userName}</span>!🎉
        </h6>

        {/* Message */}
        <p className="text-base text-gray-600">
          You have successfully created your trip. Wishing you wonderful adventures ahead!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold shadow transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
          <button
            className="w-full py-3 px-5 rounded-lg border border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold shadow transition-all duration-200"
            onClick={() => {
              setShowCongrats(false);
              setSidebarOpen(true);
              navigate("/start-planning");
            }}
          >
            Plan Another Trip
          </button>
          <button
            className="w-full py-3 px-5 rounded-lg border border-green-400 bg-green-50 hover:bg-green-100 text-green-800 font-semibold shadow transition-all duration-200"
            onClick={() => navigate("/profile")}
          >
            View Your Trips
          </button>
        </div>
      </div>
    );
  };

  if (showCongrats) {
    return (
      <main className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-blue-50">
        <Congratulations />
      </main>
    );
  }

  return (
    <div
      className="flex flex-1 bg-blue-50 text-gray-900"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {sidebarOpen && (
        <aside
          className="h-[calc(100vh-64px)] bg-blue-100 border-r-2 border-blue-200 sticky top-16 overflow-hidden"
          style={{
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            maxWidth: SIDEBAR_WIDTH,
            alignSelf: "flex-start",
          }}
        >
          <PlanSidebar
            onClose={() => setSidebarOpen(false)}
            onNavigate={handleSidebarNav}
          />
        </aside>
      )}

      {!sidebarOpen && (
        <button
          className="fixed left-4 z-40 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
          style={{ top: "72px" }}
          onClick={() => setSidebarOpen(true)}
          aria-label="Show sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main Content + Map */}
      <main className="h-[calc(100vh-64px)] flex-1 overflow-y-auto transition-all hide-scrollbar">
        <PlanMainContent
          tripId={tripId}            // ✅ Pass tripId for edit mode
          tripTitle={tripTitle}
          tripDates={tripDates}
          startDate={startDate}
          endDate={endDate}
          stops={stops}
          setStops={setStops}
          placesToVisit={placesToVisit}
          setPlacesToVisit={setPlacesToVisit}
          activeMap={activeMap}
          setActiveMap={setActiveMap}
          startingLocation={startingLocation}
          destination={destination}
          notesRef={notesRef}
          stopsRef={stopsRef}
          itineraryRef={itineraryRef}
          budgetRef={budgetRef}
          onTripSaved={handleTripSaveSuccess}
        />
      </main>

      <aside
        className="h-[calc(100vh-64px)] bg-white border-l sticky top-16 overflow-hidden"
        style={{
          width: MAP_WIDTH,
          minWidth: MAP_WIDTH,
          maxWidth: MAP_WIDTH,
          alignSelf: "flex-start",
        }}
      >
        {activeMap === "main" && (
          <PlanMap
            origin={startingLocation}
            destination={destination}
            stops={stops}
            key="main-map"
          />
        )}
        {activeMap === "places" && (
          <PlanMap
            origin={destination}
            destination={null}
            stops={placesToVisit}
            key="places-map"
          />
        )}
      </aside>
    </div>
  );
}
