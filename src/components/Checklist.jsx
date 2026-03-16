import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Checklist({ items = [], onChange }) {
  const [input, setInput] = useState("");

  // Internal state if parent doesn't control items
  const [internalItems, setInternalItems] = useState(items);

  // Use controlled or uncontrolled items
  const checklist = onChange ? items : internalItems;

  const handleAdd = () => {
    if (input.trim()) {
      const newItems = [...checklist, { text: input.trim(), checked: false }];
      if (onChange) onChange(newItems);
      else setInternalItems(newItems);
      setInput("");
    }
  };

  const handleToggle = (idx) => {
    const newItems = checklist.map((item, i) =>
      i === idx ? { ...item, checked: !item.checked } : item
    );
    if (onChange) onChange(newItems);
    else setInternalItems(newItems);
  };

  const handleDelete = (idx) => {
    const newItems = checklist.filter((_, i) => i !== idx);
    if (onChange) onChange(newItems);
    else setInternalItems(newItems);
  };

  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow p-4 mb-6">
      <div className="flex items-center mb-4">
        <span className="text-blue-700 font-bold text-lg border-l-4 border-blue-600 pl-3 select-none">
          Checklist
        </span>
      </div>
      <div className="flex mb-3">
        <input
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Add a checklist item..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r flex items-center justify-center"
          onClick={handleAdd}
        >
          <FaPlus />
        </button>
      </div>
      <ul>
        {checklist.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-gray-50 rounded px-2 py-2 mb-2"
          >
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(idx)}
                className="accent-blue-600 w-5 h-5"
              />
              <span className={`text-black ${item.checked ? "line-through text-gray-400" : ""}`}>
                {item.text}
              </span>
            </label>
            <button
              className="text-gray-600 hover:text-red-600 ml-2"
              onClick={() => handleDelete(idx)}
              title="Delete item"
            >
              <FaTrash style={{ color: "#000000", fill: "#000000" }}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
