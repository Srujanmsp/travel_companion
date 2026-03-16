import { FaRegStickyNote, FaMapMarkerAlt, FaListUl, FaRupeeSign } from "react-icons/fa";

export default function PlanSidebar() {
  return (
    <aside className="w-64 bg-blue-100 border-r-2 border-blue-200 flex flex-col py-6 min-h-screen">
      <nav className="flex-1">
        <ul className="space-y-2">
          {/* Active/selected item */}
          <li className="px-6 py-3 flex items-center font-semibold text-white bg-blue-600 rounded-lg shadow">
            <FaMapMarkerAlt className="mr-3" /> Overview
          </li>
          {/* Other items */}
          <li className="px-6 py-3 flex items-center text-blue-900 hover:bg-blue-200 rounded-lg cursor-pointer transition">
            <FaRegStickyNote className="mr-3" /> Notes
          </li>
          <li className="px-6 py-3 flex items-center text-blue-900 hover:bg-blue-200 rounded-lg cursor-pointer transition">
            <FaListUl className="mr-3" /> Places to visit
          </li>
          <li className="px-6 py-3 flex items-center text-blue-900 hover:bg-blue-200 rounded-lg cursor-pointer transition">
            <FaRupeeSign className="mr-3" /> Budget
          </li>
        </ul>
      </nav>
    </aside>
  );
}
