import { parseISO, getHours } from 'date-fns';

interface Params {
  canceled_at: string | null;
  signature_id: number | null;
  end_date: string | null;
  start_date: string | null;
}

export default function ValidateDeliveryEnd({
  canceled_at,
  end_date,
  signature_id,
  start_date,
}: Params): boolean {
  let error = false;

  const date = parseISO(start_date);
  const hours = getHours(date);

  if (hours >= 18 || hours < 8) {
    error = true;
  }

  if (!end_date) {
    if (signature_id) {
      error = true;
    }

    if (canceled_at) {
      error = true;
    }
  }

  if (end_date) {
    if (!signature_id && !canceled_at) {
      error = true;
    }

    if (!start_date) {
      error = true;
    }
  }

  if (signature_id && canceled_at) {
    error = true;
  }

  return error;
}
