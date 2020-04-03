export default interface Recipient {
  id: number;
  name: string;
  street: string;
  address_details: string | null;
  number: number;
  state: string;
  city: string;
  zip_code: string;
  created_at: Date;
  updated_at: Date;
}
