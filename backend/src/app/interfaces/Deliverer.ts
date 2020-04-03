export default interface Deliverer {
  id: number;
  name: string;
  avatar_id: number | null;
  email: string;
  created_at: Date;
  updated_at: Date;
}
