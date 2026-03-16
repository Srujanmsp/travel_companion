import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaRegStickyNote,
  FaMapMarkerAlt,
  FaListUl,
  FaRupeeSign,
  FaCalendarAlt,
  FaChevronLeft,
} from "react-icons/fa";

export default function PlanSidebar({ onClose, onNavigate }) {
  const [overviewOpen, setOverviewOpen] = useState(true);

  return (
    <aside className="w-64 bg-blue-100 border-r-2 border-blue-200 flex flex-col py-6 min-h-screen relative">
      {/* Close button (top right) */}
      <button
        className="absolute top-4 right-2 bg-blue-600 text-white rounded-full p-1 shadow hover:bg-blue-700 transition"
        onClick={onClose}
        aria-label="Hide sidebar"
      >
        {/* Left arrow */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <nav className="flex-1">
        <ul className="space-y-1">
          {/* Overview with dropdown */}
          <li>
            <button
              type="button"
              className={`w-full flex items-center px-6 py-3 font-semibold rounded-lg transition ${
                overviewOpen
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-900 hover:bg-blue-200"
              }`}
              onClick={() => setOverviewOpen((open) => !open)}
            >
              <FaMapMarkerAlt className="mr-3" />
              Overview
              <span className="ml-auto">{overviewOpen ? <FaChevronDown /> : <FaChevronRight />}</span>
            </button>
            {overviewOpen && (
              <ul className="pl-12 pt-1 space-y-1">
                <li
                  className="flex items-center text-blue-900 hover:text-blue-700 cursor-pointer py-2 rounded transition"
                  onClick={() => onNavigate && onNavigate("notes")}
                >
                  <FaRegStickyNote className="mr-2" />
                  Notes
                </li>
                <li
                  className="flex items-center text-blue-900 hover:text-blue-700 cursor-pointer py-2 rounded transition"
                  onClick={() => onNavigate && onNavigate("add-stops")}
                >
                  <FaListUl className="mr-2" />
                  Add Stops
                </li>
              </ul>
            )}
          </li>

          {/* Plan your itinerary */}
          <li>
            <div
              className="flex items-center px-6 py-3 text-blue-900 hover:bg-blue-200 rounded-lg cursor-pointer transition font-semibold"
              onClick={() => onNavigate && onNavigate("plan-itinerary")}
            >
              <FaCalendarAlt className="mr-3" />
              Plan your itinerary
            </div>
          </li>

          {/* Budget */}
          <li>
            <div
              className="flex items-center px-6 py-3 text-blue-900 hover:bg-blue-200 rounded-lg cursor-pointer transition font-semibold"
              onClick={() => onNavigate && onNavigate("budget")}
            >
              <FaRupeeSign className="mr-3" />
              Budget
            </div>
          </li>

          {/* Hide Sidebar button visually distinct, below options */}
          <li>
            <button
              onClick={onClose}
              aria-label="Hide sidebar"
              className="w-full flex items-center px-6 py-3 mt-8 border rounded-lg font-semibold text-red-500 hover:bg-red-50 shadow-sm hover:shadow-md transition duration-300 ease-in-out"
            >
              <FaChevronLeft className="mr-2" size={18} />
              Hide Sidebar
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
