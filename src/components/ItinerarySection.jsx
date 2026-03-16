import React, { useState, useMemo, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import Checklist from "./Checklist";
import ActivitySection from "./ActivitySection";
import PlacesToVisit from "./PlacesToVisit";

// Utility: Generate date strings between two dates (inclusive)
function getDateList(startDate, endDate) {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];
  let current = new Date(start);
  while (current <= end) {
    dates.push(current.toLocaleDateString('en-GB')); // dd/mm/yyyy
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// --- Main Section Component (only for Checklist now) ---
function Section({ section, onSectionChange }) {
  if (section.type === 'Checklist') {
    const handleChecklistChange = (newItems) => {
      onSectionChange({ ...section, items: newItems });
    };
    return (
      <Checklist
        items={section.items}
        onChange={handleChecklistChange}
      />
    );
  }
  return null;
}

const DEFAULT_SECTIONS = [
  {
    type: 'Places to Visit',
    items: [],
  },
  {
    type: 'Checklist',
    icon: <FaCheck />,
    placeholder: 'Add a checklist item...',
    items: [],
  }
];

export default function ItinerarySection({ startDate, endDate }) {
  const dateList = useMemo(() => getDateList(startDate, endDate), [startDate, endDate]);

  // Add activities array for each day
  const [days, setDays] = useState(() =>
    dateList.map(dateStr => ({
      name: dateStr,
      sections: DEFAULT_SECTIONS.map(s => ({ ...s })),
      activities: [],
    }))
  );
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    setDays(currentDays => {
      return dateList.map((dateStr, idx) => ({
        name: dateStr,
        sections:
          currentDays[idx]?.sections?.map(sec => ({ ...sec })) ||
          DEFAULT_SECTIONS.map(s => ({ ...s })),
        activities: currentDays[idx]?.activities || [],
      }));
    });
    setActiveDay(0);
  }, [startDate, endDate]);

  const handleSectionChange = (sectionIdx, newSection) => {
    setDays(days =>
      days.map((day, dIdx) =>
        dIdx === activeDay
          ? {
              ...day,
              sections: day.sections.map((section, sIdx) =>
                sIdx === sectionIdx ? newSection : section
              ),
            }
          : day
      )
    );
  };

  // For ActivitySection
  const handleActivitiesChange = (newActivities) => {
    setDays(days =>
      days.map((day, idx) =>
        idx === activeDay
          ? { ...day, activities: newActivities }
          : day
      )
    );
  };

  // For PlacesToVisit
  const handlePlacesChange = (newPlaces) => {
    setDays(days =>
      days.map((day, idx) =>
        idx === activeDay
          ? {
              ...day,
              sections: [
                { ...day.sections[0], items: newPlaces },
                day.sections[1]
              ]
            }
          : day
      )
    );
  };

  // GUARD: Only render main content if days[activeDay] and sections exist
  if (
    !startDate ||
    !endDate ||
    dateList.length === 0 ||
    !days[activeDay] ||
    !days[activeDay].sections
  ) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-blue-50 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
        <div className="text-center text-gray-500 font-semibold py-8">
          Please select your trip dates to see the itinerary.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-blue-800">Itinerary</h2>
      </div>
      {/* Day Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {days.map((day, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-t-lg border ${
              idx === activeDay
                ? 'bg-white text-blue-700 font-semibold border-blue-600 border-b-2'
                : 'bg-blue-100 text-blue-600 hover:bg-white border-transparent'
            }`}
            onClick={() => setActiveDay(idx)}
          >
            {day.name}
          </button>
        ))}
      </div>
      {/* Sections */}
      <div>
        {/* Places to Visit */}
        <PlacesToVisit
          places={days[activeDay].sections[0].items}
          setPlaces={handlePlacesChange}
        />
        {/* Activity Section */}
        <ActivitySection
          activities={days[activeDay].activities}
          setActivities={handleActivitiesChange}
        />
        {/* Checklist */}
        <Section
          section={days[activeDay].sections[1]}
          onSectionChange={newSection => handleSectionChange(1, newSection)}
        />
      </div>
    </div>
  );
}
