import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import tripBg from "../assets/tripcard.jpg"; // Adjust path as needed

export default function TripCard({ img = tripBg }) {
  const { tripTitle, tripDates } = useContext(TripContext);

  return (
    <div
      className="relative rounded-2xl shadow-lg overflow-hidden mx-auto max-w-3xl h-40 flex items-center justify-center"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-1 text-center">
          {tripTitle || "Your Dream Trip"}
        </h1>
        <p className="text-base md:text-lg text-white drop-shadow text-center">
          {tripDates || "Select your dates to begin planning"}
        </p>
      </div>
    </div>
  );
}
