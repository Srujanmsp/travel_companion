import * as XLSX from "xlsx";

export function exportTripToExcel(trip) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Trip Info
  const tripInfo = [
    ["Trip Title", trip.tripTitle],
    ["Trip Dates", trip.tripDates],
    ["Start Date", trip.startDate],
    ["End Date", trip.endDate],
    ["Travelers", trip.travelers],
    ["Notes", trip.notes],
    ["Places to Visit", trip.placesToVisit?.join(", ")],
  ];
  const tripSheet = XLSX.utils.aoa_to_sheet(tripInfo);
  XLSX.utils.book_append_sheet(wb, tripSheet, "Trip Info");

  // Sheet 2: Itinerary
  const itineraryData = [["Day", "Section Type", "Title/Content"]];
  trip.itinerary?.forEach((day) => {
    day.sections?.forEach((section) => {
      itineraryData.push([
        day.day,
        section.type,
        section.title || section.notes || JSON.stringify(section.items),
      ]);
    });
  });
  const itinerarySheet = XLSX.utils.aoa_to_sheet(itineraryData);
  XLSX.utils.book_append_sheet(wb, itinerarySheet, "Itinerary");

  // Sheet 3: Budget
  const budgetSheet = XLSX.utils.aoa_to_sheet([
    ["Category", "Amount"],
    ["Transport", trip.budget?.transport || 0],
    ["Accommodation", trip.budget?.accommodation || 0],
    ["Food", trip.budget?.food || 0],
    ["Misc", trip.budget?.misc || 0],
  ]);
  XLSX.utils.book_append_sheet(wb, budgetSheet, "Budget");

  // Sheet 4: Expenses
  const expensesSheet = XLSX.utils.json_to_sheet(trip.expenses || []);
  XLSX.utils.book_append_sheet(wb, expensesSheet, "Expenses");

  // Save
  XLSX.writeFile(wb, `${trip.tripTitle.replace(/ /g, "_")}_Plan.xlsx`);
}
