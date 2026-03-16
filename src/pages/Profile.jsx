import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaUserCircle,
  FaSignOutAlt,
  FaSave,
  FaTimes,
  FaShareAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useTrips from "../hooks/useTrips";
import axios from "axios";
import toast from "react-hot-toast";
import { exportTripToExcel } from "../utils/exportToExcel";
import { exportTripToPDF } from "../utils/exportToPDF";
import { FaTimesCircle } from "react-icons/fa";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const {
    setTripTitle,
    setStartDate,
    setEndDate,
    setTripDates,
    setTravelers,
    setNotes,
    setPlacesToVisit,
    setItinerary,
    setBudget,
    setExpenses,
  } = useTrips();

  const [savedTrips, setSavedTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [exportDropdownIndex, setExportDropdownIndex] = useState(null);
  const tripsPerPage = 4;

  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user || !token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/mytrips`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSavedTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
        toast.error("Failed to load saved trips");
      }
    };

    fetchTrips();
  }, [user, token]);

  useEffect(() => {
    const handleClickOutside = () => setExportDropdownIndex(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleEditTrip = (trip) => {
    setTripTitle(trip.tripTitle);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);
    setTripDates(trip.tripDates);
    setTravelers(trip.travelers);
    setNotes(trip.notes);
    setPlacesToVisit(trip.placesToVisit);
    setItinerary(trip.itinerary);
    setBudget(trip.budget);
    setExpenses(trip.expenses);
    navigate("/planning", { state: { tripId: trip._id, tripTitle: trip.tripTitle } });
  };

  const handleDeleteTrip = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/plan/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedTrips(savedTrips.filter((trip) => trip._id !== tripId));
      toast.success("Trip deleted successfully");
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  const handleEditProfile = async () => {
    if (!editForm.name || !editForm.email) {
      toast.error("Name and email are required.");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update`,
        editForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.data.success) {
        toast.success("Profile updated");
        setEditModal(false);
        window.location.reload();
      } else {
        toast.error("Profile update failed");
      }
    } catch (err) {
      toast.error("Profile update failed");
    }
  };

  const filteredTrips = savedTrips.filter((trip) =>
    trip.tripTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const paginatedTrips = sortedTrips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  const totalPages = Math.ceil(sortedTrips.length / tripsPerPage);

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-to-tr from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-5xl text-blue-700 drop-shadow" />
            <div>
              <h2 className="text-2xl font-bold text-blue-900">{user?.name}</h2>
              <p className="text-md text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditModal(true)}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 font-semibold transition"
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-blue-200 p-2 rounded-lg w-full focus:border-blue-400 focus:outline-none text-black pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 focus:outline-none"
                tabIndex={-1}
                aria-label="Clear search"
              >
                <FaTimesCircle size={18} style={{ fill: "black" }} />
              </button>
            )}
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-blue-200 p-2 rounded-lg focus:border-blue-400 focus:outline-none text-black"
          >
            <option value="" disabled hidden>
              Sort
            </option>
            <option value="latest" className="text-black">
              Latest
            </option>
            <option value="oldest" className="text-black">
              Oldest
            </option>
          </select>
        </div>

        {/* Trip Table */}
        {paginatedTrips.length > 0 ? (
          <div className="overflow-x-auto mt-6 rounded-lg shadow-lg bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="py-3 px-4 text-left font-semibold">Trip Title</th>
                  <th className="py-3 px-4 text-left font-semibold">Dates</th>
                  <th className="py-3 px-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrips.map((trip, index) => (
                  <tr
                    key={trip._id}
                    className={`${
                      index % 2 === 0 ? "bg-blue-50" : "bg-purple-50"
                    } hover:bg-blue-100 transition-colors`}
                  >
                    <td className="py-3 px-4 font-bold text-blue-900">
                      {trip.tripTitle}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{trip.tripDates}</td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      <button
                        onClick={() => alert(JSON.stringify(trip, null, 2))}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        title="Preview"
                      >
                        <FaEye size={18} style={{ fill: "black" }} />
                      </button>
                      <button
                        onClick={() => handleEditTrip(trip)}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        title="Edit"
                      >
                        <FaEdit size={18} style={{ fill: "black" }} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip._id)}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        title="Delete"
                      >
                        <FaTrash size={18} style={{ fill: "black" }} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExportDropdownIndex(exportDropdownIndex === index ? null : index);
                          }}
                          className="p-2 rounded-full hover:bg-gray-200 transition"
                          title="Export"
                        >
                          <FaShareAlt size={18} style={{ fill: "black" }} />
                        </button>
                        {exportDropdownIndex === index && (
                          <div className="absolute z-10 mt-2 right-0 bg-white border rounded shadow-lg w-32 text-sm">
                            <button
                              onClick={() => {
                                exportTripToExcel(trip);
                                setExportDropdownIndex(null);
                              }}
                              className="w-full px-3 py-2 hover:bg-gray-300 text-black text-left"
                            >
                              Export as CSV
                            </button>
                            <button
                              onClick={() => {
                                exportTripToPDF(trip);
                                setExportDropdownIndex(null);
                              }}
                              className="w-full px-3 py-2 hover:bg-gray-100 text-black text-left"
                            >
                              Export as PDF
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-8 text-center">No trips saved yet.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border font-semibold ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white text-blue-600 border-blue-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-200 focus:outline-none text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-200 focus:outline-none text-black"
              />
              <button
                onClick={handleEditProfile}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
