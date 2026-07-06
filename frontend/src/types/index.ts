export type UserRole = 'client' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// Shape of Laravel's validation error JSON (422/403)
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
