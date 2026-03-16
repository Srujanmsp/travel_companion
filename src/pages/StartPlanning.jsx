import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { TripContext } from "../context/TripContext";

export default function StartPlanningPage() {
  const navigate = useNavigate();

  const {
    setStartingLocation,
    setDestination,
    setStartDate,
    setEndDate,
    setTravelers,
    setTripTitle,
    setTripDates,
  } = useContext(TripContext);

  // Controlled input states (NO localStorage involved)
  const [startingLocation, setStartingLocationInput] = useState("");
  const [destination, setDestinationInput] = useState("");
  const [startDate, setStartDateInput] = useState("");
  const [endDate, setEndDateInput] = useState("");
  const [travelers, setTravelersInput] = useState(1);
  const [error, setError] = useState("");

  const handleStartPlanning = (e) => {
    e.preventDefault();
    if (!startingLocation || !destination || !startDate || !endDate || !travelers) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    // Update TripContext values
    setStartingLocation(startingLocation);
    setDestination(destination);
    setStartDate(startDate);
    setEndDate(endDate);
    setTravelers(travelers);
    setTripTitle(`${startingLocation} → ${destination}`);
    setTripDates(`${startDate} to ${endDate}`);

    // Store to localStorage so Planning page can persist it after refresh
    localStorage.setItem(
      "persistedTrip",
      JSON.stringify({
        startingLocation,
        destination,
        startDate,
        endDate,
        travelers,
      })
    );

    navigate("/planning");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleStartPlanning}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 flex flex-col"
        style={{
          maxHeight: "90vh",
        }}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-8">
          Start Planning Your Trip
        </h1>

        <div className="flex-1 overflow-y-auto">
          {/* Starting Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="startingLocation">
              Starting Location
            </label>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2 text-lg" />
              <input
                id="startingLocation"
                type="text"
                placeholder="e.g. Bengaluru, Mumbai"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 text-gray-800 placeholder-gray-400 text-sm"
                value={startingLocation}
                onChange={(e) => setStartingLocationInput(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="destination">
              Destination
            </label>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-2 text-lg" />
              <input
                id="destination"
                type="text"
                placeholder="e.g. Goa, Mysuru"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 text-sm"
                value={destination}
                onChange={(e) => setDestinationInput(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="dates">
              Dates
            </label>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-500 mr-2 text-lg" />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-800 text-sm"
                value={startDate}
                onChange={(e) => setStartDateInput(e.target.value)}
                required
              />
              <span className="mx-2 text-gray-500">—</span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-800 text-sm"
                value={endDate}
                onChange={(e) => setEndDateInput(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="travelers">
              Travelers
            </label>
            <div className="flex items-center">
              <FaUsers className="text-purple-500 mr-2 text-lg" />
              <input
                id="travelers"
                type="number"
                min={1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-800 text-sm"
                value={travelers}
                onChange={(e) => setTravelersInput(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-3 rounded-lg text-base sm:text-lg shadow transition mt-2"
        >
          Start Planning
        </button>
      </form>
    </main>
  );
}
