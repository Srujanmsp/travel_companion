// Updated PlacesToVisit.jsx
// Now triggers parent to show map in "places" mode and recompute on Optimise click
import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash, FaGripVertical, FaRoute } from "react-icons/fa";
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

function SortablePlace({ id, place, onDelete, showDragHandle }) {
  const { setNodeRef, transform, transition, listeners, attributes } =
    useSortable({ id });
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
        <span className="text-black">{place.address}</span>
      </div>
      <button
        className="text-black hover:text-gray-800 p-1"
        onClick={onDelete}
        aria-label={`Delete place ${place.address}`}
        type="button"
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default function PlacesToVisit({ onPlacesChange, setActiveMap, onOptimisePlaces }) {
  const [places, setPlaces] = useState(() => {
    const saved = sessionStorage.getItem("placesToVisit");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    sessionStorage.setItem("placesToVisit", JSON.stringify(places));
    if (onPlacesChange) onPlacesChange(places);
  }, [places, onPlacesChange]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const MAX_PLACES = 20;

  const handleAddPlace = () => {
    if (input.trim() === "" || places.length >= MAX_PLACES) return;

    const newPlace = {
      id: Date.now().toString(),
      address: input.trim(),
    };
    setPlaces([...places, newPlace]);
    setInput("");

    if (setActiveMap) {
      setActiveMap("places");
    }
  };

  const handleDeletePlace = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = places.findIndex((place) => place.id === active.id);
      const newIndex = places.findIndex((place) => place.id === over.id);
      setPlaces(arrayMove(places, oldIndex, newIndex));
    }
  };

  const canAddMore = places.length < MAX_PLACES;

  const handleOptimizeRoute = () => {
    if (setActiveMap) setActiveMap("places");
    if (onOptimisePlaces) onOptimisePlaces();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-700 font-bold text-xl border-l-4 border-blue-600 pl-3">
          Places to Visit
        </span>
        <button
          onClick={handleOptimizeRoute}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1"
          type="button"
        >
          <FaRoute /> Optimise
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l px-3 py-2 text-black"
          placeholder="Enter place name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddPlace();
            }
          }}
          disabled={!canAddMore}
          aria-label="Add a place"
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition text-2xl flex items-center justify-center"
          onClick={handleAddPlace}
          disabled={input.trim() === "" || !canAddMore}
          aria-label="Add place"
          type="button"
        >
          <FaPlusCircle />
        </button>
      </div>

      {!canAddMore && (
        <div className="text-xs text-red-600 mb-2" role="alert">
          You can add a maximum of {MAX_PLACES} places.
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={places.map((place) => place.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {places.map((place, index) => (
              <SortablePlace
                key={place.id}
                id={place.id}
                place={place}
                onDelete={() => handleDeletePlace(index)}
                showDragHandle={places.length >= 2}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
