// src/api/auth.ts

import api from './axios';
import { AuthResponse, RegisterResponse } from '../types';

export const authApi = {
  register: async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const { data } = await api.post<RegisterResponse>('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    return data;
  },

  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/login', {
      email,
      password,
      is_mobile: true,
    });
    return data;
  },

  logout: async () => {
    const { data } = await api.post<{ message: string }>('/logout');
    return data;
  },

  resendVerification: async (email: string) => {
    const { data } = await api.post<{ message: string }>('/email/resend', { email });
    return data;
  },
};