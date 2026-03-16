import { createContext, useState, useEffect } from "react";

export const TripContext = createContext();

export function TripProvider({ children }) {
  const [tripTitle, setTripTitle] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Change notes from string to array of strings
  const [notes, setNotes] = useState([]);
  
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [budget, setBudget] = useState({
    transport: 0,
    accommodation: 0,
    food: 0,
    misc: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const [travelers, setTravelers] = useState(1);
  const [startingLocation, setStartingLocation] = useState("");
  const [destination, setDestination] = useState("");

  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved plan from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem("unsavedPlan");
    if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      setTripTitle(plan.tripTitle || "");
      setTripDates(plan.tripDates || "");
      setStartDate(plan.startDate || "");
      setEndDate(plan.endDate || "");
      setNotes(plan.notes || []);       // load notes as array
      setPlacesToVisit(plan.placesToVisit || []);
      setItinerary(plan.itinerary || []);
      setBudget(
        plan.budget || {
          transport: 0,
          accommodation: 0,
          food: 0,
          misc: 0,
        }
      );
      setExpenses(plan.expenses || []);
      setTravelers(plan.travelers || 1);
      setStartingLocation(plan.startingLocation || "");
      setDestination(plan.destination || "");
    }
    setIsInitialized(true);
  }, []);

  // Auto-save on any change except during initialization
  useEffect(() => {
    if (!isInitialized) return;

    const dataToPersist = {
      tripTitle,
      tripDates,
      startDate,
      endDate,
      notes,
      placesToVisit,
      itinerary,
      budget,
      expenses,
      travelers,
      startingLocation,
      destination,
    };
    localStorage.setItem("unsavedPlan", JSON.stringify(dataToPersist));
  }, [
    tripTitle,
    tripDates,
    startDate,
    endDate,
    notes,
    placesToVisit,
    itinerary,
    budget,
    expenses,
    travelers,
    startingLocation,
    destination,
    isInitialized,
  ]);

  const resetTrip = () => {
    setTripTitle("");
    setTripDates("");
    setStartDate("");
    setEndDate("");
    setNotes([]);
    setPlacesToVisit([]);
    setItinerary([]);
    setBudget({
      transport: 0,
      accommodation: 0,
      food: 0,
      misc: 0,
    });
    setExpenses([]);
    setTravelers(1);
    setStartingLocation("");
    setDestination("");
    localStorage.removeItem("unsavedPlan");
  };

  return (
    <TripContext.Provider
      value={{
        tripTitle,
        setTripTitle,
        tripDates,
        setTripDates,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        notes,
        setNotes,
        placesToVisit,
        setPlacesToVisit,
        itinerary,
        setItinerary,
        budget,
        setBudget,
        expenses,
        setExpenses,
        travelers,
        setTravelers,
        startingLocation,
        setStartingLocation,
        destination,
        setDestination,
        resetTrip,
        isInitialized,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
