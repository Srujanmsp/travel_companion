import React, { useState } from "react";
import { FaTrash, FaPlus, FaGripVertical, FaEdit, FaClock } from "react-icons/fa";

export default function ActivitySection({ activities, setActivities }) {
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [menuOpenIdx, setMenuOpenIdx] = useState(null);
  const [editIdx, setEditIdx] = useState(null);

  // Sort activities by time
  const sortedActivities = [...activities].sort((a, b) => a.time.localeCompare(b.time));

  const handleAddOrUpdate = () => {
    if (!input.trim() || !time) return;
    if (editIdx !== null) {
      const updated = activities.map((act, idx) =>
        idx === editIdx ? { ...act, name: input, time } : act
      );
      setActivities(updated);
      setEditIdx(null);
      setMenuOpenIdx(null);
    } else {
      setActivities([...activities, { name: input, time }]);
    }
    setInput("");
    setTime("");
  };

  const handleEdit = (idx) => {
    setInput(activities[idx].name);
    setTime(activities[idx].time);
    setEditIdx(idx);
    setMenuOpenIdx(null);
  };

  const handleDelete = (idx) => {
    setActivities(activities.filter((_, i) => i !== idx));
    setEditIdx(null);
    setInput("");
    setTime("");
    setMenuOpenIdx(null);
  };

  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow p-4 mb-6">
      <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-l-4 border-blue-600 pl-3 mb-3">
         Activities
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="border border-blue-400 rounded-l px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add activity"
          className="border border-gray-300 rounded-r px-3 py-2 flex-1 text-black"
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition text-2xl flex items-center justify-center"
          onClick={handleAddOrUpdate}
          disabled={!input.trim() || !time}
          aria-label="Add activity"
        >
          {editIdx !== null ? "Update" : <FaPlus />}
        </button>
      </div>
      <ul>
        {sortedActivities.map((act, idx) => (
          <li key={idx} className="flex items-center justify-between border border-gray-300 rounded shadow-sm p-2 bg-gray-50 mb-2">
            <span className="flex items-center gap-2">
              <span className="font-bold text-black bg-blue-100 rounded px-2 py-1">{act.time}</span>
              <span className="font-bold text-black">{act.name}</span>
            </span>
            <span className="relative">
              <button
                className="text-gray-600 hover:text-black px-2"
                onClick={() => setMenuOpenIdx(menuOpenIdx === idx ? null : idx)}
                title="Options"
                style={{ background: "none", border: "none" }}
              >
                <FaGripVertical />
              </button>
              {menuOpenIdx === idx && (
                <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10">
                  <button className="block px-3 py-1 w-full text-left hover:bg-gray-100" onClick={() => handleEdit(idx)}>
                    <FaEdit className="inline mr-1" /> Edit
                  </button>
                  <button className="block px-3 py-1 w-full text-left hover:bg-gray-100 text-red-600" onClick={() => handleDelete(idx)}>
                    <FaTrash className="inline mr-1" /> Delete
                  </button>
                </div>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
