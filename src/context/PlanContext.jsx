import React, { createContext, useContext, useState } from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  // To track if user has passed the StartPlanning step
  const [hasStartedPlanning, setHasStartedPlanning] = useState(false);
  // You may add more global state here if you want

  return (
    <PlanContext.Provider value={{
      hasStartedPlanning, setHasStartedPlanning
      // Add other values as needed
    }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
