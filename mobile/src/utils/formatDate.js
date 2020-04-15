import { format } from 'date-fns';

export default function (date) {
  if (!date) return null;

  return format(new Date(date), 'dd/MM/yyyy');
}
