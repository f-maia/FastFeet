import { format, parseISO } from 'date-fns';

export default function FormatDate(date: string | number | Date): string {
  if (typeof date === 'string') {
    date = parseISO(date);
  }

  const formatedDate = format(date, "yyyy-MM-dd'T'HH:MM:SS");

  return formatedDate;
}
