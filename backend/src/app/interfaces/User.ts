export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}
