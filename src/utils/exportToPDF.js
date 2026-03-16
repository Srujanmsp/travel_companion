import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportTripToPDF(trip) {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.text("Trip Plan", 20, y);

  y += 10;
  doc.setFontSize(12);
  const info = [
    ["Trip Title", trip.tripTitle],
    ["Trip Dates", trip.tripDates],
    ["Start Date", trip.startDate],
    ["End Date", trip.endDate],
    ["Travelers", String(trip.travelers)],
    ["Notes", trip.notes],
    ["Places to Visit", trip.placesToVisit?.join(", ")],
  ];
  info.forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 20, (y += 8));
  });

  // Itinerary Table
  if (trip.itinerary?.length) {
    y += 10;
    doc.text("Itinerary", 20, y);
    const itineraryData = [];
    trip.itinerary.forEach((day) => {
      day.sections?.forEach((section) => {
        itineraryData.push([
          "Day " + day.day,
          section.type,
          section.title || section.notes || JSON.stringify(section.items),
        ]);
      });
    });
    doc.autoTable({
      head: [["Day", "Section", "Content"]],
      body: itineraryData,
      startY: (y += 5),
    });
    y = doc.autoTable.previous.finalY;
  }

  // Budget Table
  y += 10;
  doc.text("Budget", 20, y);
  doc.autoTable({
    startY: (y += 5),
    head: [["Category", "Amount"]],
    body: [
      ["Transport", trip.budget?.transport || 0],
      ["Accommodation", trip.budget?.accommodation || 0],
      ["Food", trip.budget?.food || 0],
      ["Misc", trip.budget?.misc || 0],
    ],
  });
  y = doc.autoTable.previous.finalY;

  // Expenses Table
  if (trip.expenses?.length) {
    y += 10;
    doc.text("Expenses", 20, y);
    const expenseData = trip.expenses.map((e) => [
      e.category,
      e.amount,
      e.description,
    ]);
    doc.autoTable({
      startY: (y += 5),
      head: [["Category", "Amount", "Description"]],
      body: expenseData,
    });
  }

  doc.save(`${trip.tripTitle.replace(/ /g, "_")}_Plan.pdf`);
}
