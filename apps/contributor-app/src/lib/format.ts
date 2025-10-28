export function formatDate(
  dateString: string,
  showHours: boolean = false,
  showMinutes: boolean = false
) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: showHours ? "2-digit" : undefined,
    minute: showMinutes ? "2-digit" : undefined,
  });
}
