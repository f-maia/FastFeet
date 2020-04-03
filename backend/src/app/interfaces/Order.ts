export default interface Order {
  id: number;
  recipient_id: number | null;
  deliveryman_id: number | null;
  signature_id: number | null;
  product: string;
  canceled_at: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}
