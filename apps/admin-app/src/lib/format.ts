export function formatDate(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Guatemala",
  });
}
