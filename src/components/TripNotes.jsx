import React, { useState, useContext, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { TripContext } from "../context/TripContext";

export default function TripNotes() {
  const { notes, setNotes } = useContext(TripContext);

  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Reset input if edited note was deleted or out of bounds
  useEffect(() => {
    if (editIndex !== null && (editIndex < 0 || editIndex >= (Array.isArray(notes) ? notes.length : 0))) {
      setNote("");
      setEditIndex(null);
    }
  }, [notes, editIndex]);

  const handleSave = () => {
    if (!note.trim()) return;

    if (editIndex !== null) {
      const updatedNotes = [...(Array.isArray(notes) ? notes : [])];
      updatedNotes[editIndex] = note.trim();
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...(Array.isArray(notes) ? notes : []), note.trim()]);
    }
    setNote("");
  };

  const handleEdit = (index) => {
    if (Array.isArray(notes) && notes[index]) {
      setNote(notes[index]);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (!Array.isArray(notes)) return;

    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (editIndex === index) {
      setNote("");
      setEditIndex(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
      <div className="flex items-center mb-4">
        <span className="text-blue-700 font-bold text-xl border-l-4 border-blue-600 pl-3 pr-2 py-1 select-none">
          Notes
        </span>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-2 text-black"
        rows={3}
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className={`px-4 py-2 rounded text-white ${
          note.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSave}
        disabled={!note.trim()}
      >
        {editIndex !== null ? "Update Note" : "Save Note"}
      </button>
      <ul className="mt-4 space-y-2">
        {Array.isArray(notes)
          ? notes.map((n, idx) => (
              <li
                key={idx}
                className="border border-gray-300 rounded p-2 flex justify-between items-center text-black"
              >
                <p className="whitespace-pre-wrap flex-1 mr-4">{n}</p>
                <div className="space-x-2 flex">
                  <button
                    className="text-black hover:text-gray-800 p-1"
                    onClick={() => handleEdit(idx)}
                    aria-label="Edit"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-black hover:text-gray-800 p-1"
                    onClick={() => handleDelete(idx)}
                    aria-label="Delete"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
