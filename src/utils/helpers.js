// Format date range for display
export function formatDateRange(start, end) {
  if (!start || !end) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return `${new Date(start).toLocaleDateString(undefined, options)} - ${new Date(end).toLocaleDateString(undefined, options)}`;
}
