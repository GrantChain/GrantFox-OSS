export function formatDate(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
