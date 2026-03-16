import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash, FaGripVertical } from "react-icons/fa";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableStop({ id, stop, onDelete, showDragHandle }) {
  const { setNodeRef, transform, transition, listeners, attributes } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between border border-gray-400 rounded p-2 bg-gray-50 mb-2"
    >
      <div className="flex items-center gap-2">
        {showDragHandle && (
          <span
            {...listeners}
            {...attributes}
            className="cursor-grab text-blue-700"
            title="Drag to reorder"
            aria-label="Drag handle"
          >
            <FaGripVertical size={22} />
          </span>
        )}
        <span className="text-black">{stop.address}</span>
      </div>
      <button
        className="text-black hover:text-gray-800 p-1"
        onClick={onDelete}
        aria-label={`Delete stop ${stop.address}`}
        type="button"
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default function AddStops({
  stops: parentStops,
  setStops: setParentStops,
  onStopsChange,
  setActiveMap, // kept for compatibility — still unused unless needed for maps
}) {
  // Use parent's stops if provided, else internal state
  const [stops, setStops] =
    parentStops && setParentStops
      ? [parentStops, setParentStops]
      : useState(() => {
          const saved = sessionStorage.getItem("addStops");
          return saved ? JSON.parse(saved) : [];
        });

  const [input, setInput] = useState("");

  // Persist stops and notify parent on change
  useEffect(() => {
    sessionStorage.setItem("addStops", JSON.stringify(stops));
    if (onStopsChange) onStopsChange(stops);
  }, [stops, onStopsChange]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const MAX_STOPS = 10;

  const handleAddStop = () => {
    if (input.trim() === "" || stops.length >= MAX_STOPS) return;

    const newStop = {
      id: Date.now().toString(),
      address: input.trim(),
    };
    setStops([...stops, newStop]);
    setInput("");
  };

  const handleDeleteStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = stops.findIndex((stop) => stop.id === active.id);
      const newIndex = stops.findIndex((stop) => stop.id === over.id);
      setStops(arrayMove(stops, oldIndex, newIndex));
    }
  };

  const canAddMore = stops.length < MAX_STOPS;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-700 font-bold text-xl border-l-4 border-blue-600 pl-3">
          Add Stops
        </span>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l px-3 py-2 text-black"
          placeholder="Enter stop location"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddStop();
            }
          }}
          disabled={!canAddMore}
          aria-label="Add a stop"
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition text-2xl flex items-center justify-center"
          onClick={handleAddStop}
          disabled={input.trim() === "" || !canAddMore}
          aria-label="Add stop"
          type="button"
        >
          <FaPlusCircle />
        </button>
      </div>

      {!canAddMore && (
        <div className="text-xs text-red-600 mb-2" role="alert">
          You can add a maximum of {MAX_STOPS} stops.
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stops.map((stop) => stop.id)} strategy={verticalListSortingStrategy}>
          <ul>
            {stops.map((stop, index) => (
              <SortableStop
                key={stop.id}
                id={stop.id}
                stop={stop}
                onDelete={() => handleDeleteStop(index)}
                showDragHandle={stops.length >= 2}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
