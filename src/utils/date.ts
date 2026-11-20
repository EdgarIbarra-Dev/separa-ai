const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const startOfDay = (date: Date): number => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
};

/** Formatea una fecha ISO como "Hoy, 10:24 AM", "Ayer, 4:15 PM" o "18 Feb, 1:30 PM" */
export const formatSessionDate = (iso: string, now: Date = new Date()): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const dayDifference = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);
  const time = formatTime(date);

  if (dayDifference === 0) return `Hoy, ${time}`;
  if (dayDifference === 1) return `Ayer, ${time}`;

  const day = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  const year = date.getFullYear() === now.getFullYear() ? '' : ` ${date.getFullYear()}`;
  return `${day}${year}, ${time}`;
};
