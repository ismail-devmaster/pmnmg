export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  created_at?: string;
  updated_at?: string;
}
