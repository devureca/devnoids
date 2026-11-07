export const isoDay = (date: Date) => date.toISOString().slice(0, 10);

export const longDate = (date: Date) =>
  date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });