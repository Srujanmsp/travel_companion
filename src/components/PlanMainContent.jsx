// ✅ Updated PlanMainContent.jsx: forwards onOptimisePlaces to PlacesToVisit
import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import TripCard from "./TripCard";
import TripNotes from "./TripNotes";
import AddStops from "./AddStops";
import PlacesToVisit from "./PlacesToVisit";
import ItinerarySection from "./ItinerarySection";
import BudgetPage from "./BudgetPage";

export default function PlanMainContent({
  tripId,
  stops,
  setStops,
  setActiveMap,
  notesRef,
  stopsRef,
  itineraryRef,
  budgetRef,
  tripTitle,
  tripDates,
  startDate,
  endDate,
  placesToVisit,
  setPlacesToVisit,
  activeMap,
  startingLocation,
  destination,
  onTripSaved,
  onOptimisePlaces,
}) {
  const {
    setTripTitle,
    setStartDate,
    setEndDate,
    setTripDates,
    setTravelers,
    notes,
    itinerary,
    budget,
    expenses,
    resetTrip,
    travelers,
  } = useContext(TripContext);

  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadFromStorage = () => {
      const persisted = JSON.parse(localStorage.getItem("persistedTrip"));
      if (persisted) {
        const {
          startingLocation,
          destination,
          startDate,
          endDate,
          travelers,
        } = persisted;

        const title = `${startingLocation} → ${destination}`;
        const dateRange = `${startDate} to ${endDate}`;

        setTripTitle(title);
        setStartDate(startDate);
        setEndDate(endDate);
        setTravelers(Number(travelers));
        setTripDates(dateRange);
      }
    };

    if (location.state) {
      const { startingLocation, destination, startDate, endDate, travelers } =
        location.state;
      const title = `${startingLocation} → ${destination}`;
      const dateRange = `${startDate} to ${endDate}`;

      setTripTitle(title);
      setStartDate(startDate);
      setEndDate(endDate);
      setTravelers(Number(travelers));
      setTripDates(dateRange);

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
    } else if (!tripTitle || !startDate || !endDate || !travelers) {
      loadFromStorage();
    }
    // eslint-disable-next-line
  }, [
    location.state,
    setTripTitle,
    setStartDate,
    setEndDate,
    setTravelers,
    setTripDates,
    tripTitle,
    startDate,
    endDate,
    travelers,
  ]);

  const handleSavePlan = async () => {
    const planData = {
      tripTitle,
      tripDates: `${startDate} to ${endDate}`,
      startDate,
      endDate,
      notes: notes.join("\n\n"),
      stops,
      itinerary,
      budget,
      expenses,
      travelers,
    };

    try {
      if (!user) {
        localStorage.setItem("unsavedPlan", JSON.stringify(planData));
        navigate("/login", { state: { from: "/planning" } });
        return;
      }

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/plan/save`, planData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("unsavedPlan");
      localStorage.removeItem("persistedTrip");
      resetTrip();

      if (onTripSaved) {
        onTripSaved();
      }
    } catch (err) {
      console.error(
        "❌ Error saving trip:",
        err.response?.status,
        err.response?.data || err.message
      );
      alert(`❌ Failed to save trip (${err.response?.status || "unknown error"})`);
    }
  };

  return (
    <section className="flex-1 p-8 max-w-4xl mx-auto overflow-y-auto">
      <div className="mb-6">
        <TripCard title={tripTitle} desc={`${startDate} to ${endDate}`} />
      </div>

      <div ref={notesRef}>
        <TripNotes />
      </div>

      <div ref={stopsRef}>
        <AddStops
          tripId={tripId}
          token={token}
          stops={stops}
          setStops={setStops}
          setActiveMap={setActiveMap}
          onSaved={onTripSaved}
        />
      </div>

      <div ref={itineraryRef}>
        <ItinerarySection startDate={startDate} endDate={endDate} />
      </div>

      <div ref={budgetRef}>
        <BudgetPage />
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleSavePlan}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Save Plan
        </button>
      </div>
    </section>
  );
}
