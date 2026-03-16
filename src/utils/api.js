// src/utils/api.js

// ✅ Existing backend status check
export async function getBackendStatus() {
  const response = await fetch('http://localhost:5000/');
  const data = await response.text();
  return data;
}

// ✅ Fetch a single trip by ID (used for edit mode in AddStops)
export async function fetchTrip(tripId, token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/${tripId}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include" // keep if your backend uses cookies/sessions
  });
  if (!res.ok) throw new Error("Failed to fetch trip");
  return res.json();
}

// ✅ Create new trip
export async function createTrip(payload, token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create trip");
  return data;
}

// ✅ Update existing trip
export async function updateTrip(tripId, payload, token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update trip");
  return data;
}

// ✅ Get all trips for the current user
export async function getUserTrips(token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/user/all`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load trips");
  return data;
}
