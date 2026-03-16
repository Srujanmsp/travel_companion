import { useContext } from "react";
import { TripContext } from "../context/TripContext";
export default function useTrips() {
  return useContext(TripContext);
}
