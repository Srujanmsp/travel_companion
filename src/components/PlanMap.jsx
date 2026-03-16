// ✅ Updated PlanMap.jsx with "places" mode logic
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

export default function PlanMap({
  origin,
  destination,
  stops = [],
  mapKey = "default",
  mode,
  optimiseTick = 0,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!isLoaded || !origin) return;

    const directionsService = new window.google.maps.DirectionsService();

    if (mode === "places") {
      const places = Array.isArray(stops)
        ? stops.filter((p) => p && typeof p.address === "string" && p.address.trim().length > 0)
        : [];

      if (places.length === 0) {
        setDirections(null);
        return;
      }

      const last = places[places.length - 1];
      const middle = places.slice(0, -1);

      const request = {
        origin: typeof origin === "string" ? origin : (origin?.address || origin),
        destination: last.address,
        waypoints: middle.map((p) => ({ location: p.address })),
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          setSelectedRouteIndex(0);
          setDirections(result);
        } else {
          setDirections(null);
          console.error("Directions request failed due to " + status);
        }
      });

      return;
    }

    // Default AddStops behavior
    let actualOrigin = origin;
    let actualDestination = destination;
    let waypoints = [];

    if (stops && stops.length > 0) {
      if (!destination) {
        actualDestination = stops[stops.length - 1];
        waypoints = stops.slice(0, stops.length - 1);
      } else {
        waypoints = stops;
      }
    }

    const formattedWaypoints = waypoints.map((stop) =>
      stop?.lat && stop?.lng
        ? { location: { lat: stop.lat, lng: stop.lng } }
        : { location: stop?.address }
    );

    directionsService.route(
      {
        origin:
          actualOrigin && actualOrigin.lat && actualOrigin.lng
            ? { lat: actualOrigin.lat, lng: actualOrigin.lng }
            : actualOrigin,
        destination:
          actualDestination && actualDestination.lat && actualDestination.lng
            ? { lat: actualDestination.lat, lng: actualDestination.lng }
            : actualDestination,
        waypoints: formattedWaypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === "OK") {
          setSelectedRouteIndex(0);
          setDirections(result);
        } else {
          setDirections(null);
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [isLoaded, origin, destination, stops, mapKey, mode, optimiseTick]);

  useEffect(() => {
    if (directions && directions.routes[selectedRouteIndex]) {
      const leg = directions.routes[selectedRouteIndex].legs[0];
      setDistance(leg.distance.text);
      setDuration(leg.duration.text);

      if (map) {
        const bounds = new window.google.maps.LatLngBounds();
        leg.steps.forEach((step) => {
          bounds.extend(step.start_location);
          bounds.extend(step.end_location);
        });
        map.fitBounds(bounds);
      }
    }
  }, [selectedRouteIndex, directions, map]);

  return (
    <div className="w-[400px] min-w-[300px] h-full border-l bg-white flex flex-col relative">
      <div className="flex-1 flex items-center justify-center">
        {isLoaded ? (
          <GoogleMap
            key={mapKey}
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={9}
            onLoad={(mapInstance) => setMap(mapInstance)}
            options={{
              fullscreenControl: true,
              streetViewControl: true,
              mapTypeControl: false,
              rotateControl: true,
              gestureHandling: "greedy",
            }}
          >
            {directions &&
              directions.routes.map((route, index) => (
                <DirectionsRenderer
                  key={index}
                  directions={{
                    ...directions,
                    routes: [route],
                  }}
                  options={{
                    polylineOptions: {
                      strokeColor:
                        index === selectedRouteIndex ? "#1976d2" : "#aaa",
                      strokeOpacity: index === selectedRouteIndex ? 1.0 : 0.5,
                      strokeWeight: 5,
                    },
                    suppressMarkers: false,
                    preserveViewport: true,
                  }}
                />
              ))}
          </GoogleMap>
        ) : (
          <div className="text-gray-400">Loading map...</div>
        )}
      </div>

      {distance && duration && (
        <div className="absolute bottom-4 left-4 bg-black/10 backdrop-blur border border-gray-300 text-black rounded-xl shadow-xl px-4 py-3 text-sm z-40">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <img
              src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
              alt="Route"
              className="w-4 h-4"
            />
            Route Information
          </h2>
          <p>
            <strong>From:</strong>{" "}
            {origin && origin.address ? origin.address : origin}
          </p>
          <p>
            <strong>To:</strong>{" "}
            {destination && destination.address
              ? destination.address
              : destination
              ? destination
              : stops.length > 0
              ? (stops[stops.length - 1].address || "")
              : ""}
          </p>
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Estimated Time:</strong> {duration}
          </p>
        </div>
      )}

      {directions?.routes.length > 1 && (
        <div className="absolute bottom-[150px] left-4 flex gap-2 z-50">
          {directions.routes.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedRouteIndex(index)}
              className={`px-2 py-1 rounded-full text-sm font-medium border ${
                selectedRouteIndex === index
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Route {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
