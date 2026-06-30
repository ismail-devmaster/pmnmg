/**
 * Core domain types for the Product Management System
 * Strict TypeScript definitions with proper validation
 */

export type UserRole = 'client' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface AuthResponse {
  token: string;
  user: User;
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

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
}

export type ProductListResponse = PaginatedResponse<Product> | Product[];

export type UserRoleType = User['role'];

export const USER_ROLES: readonly UserRole[] = ['client', 'admin'] as const;

export const isAdmin = (role: UserRoleType): boolean => role === 'admin';
export const isClient = (role: UserRoleType): boolean => role === 'client';