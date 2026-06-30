import { useState, useCallback, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import api from '@/api/axios';
import { storage } from '@/utils/storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const [token, storedUser] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      // If stored user is admin, purge everything — admin must not use this app
      if (storedUser?.role === 'admin') {
        await storage.clearAuth();
        setUser(null);
        return;
      }

      setUser(storedUser);
    } catch (error) {
      if (__DEV__) console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      const { token, user: userData } = response.data;

      if (userData.role === 'admin') {
        // Purge any token that may have been returned — admin must NOT use this app
        await storage.clearAuth();
        Alert.alert(
          'Access Denied',
          'This application is for client use only. Admins must use the web portal.'
        );
        return false;
      }

      await Promise.all([
        storage.saveToken(token),
        storage.saveUser(userData),
      ]);
      setUser(userData);
      router.replace('/(app)');
      return true;
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      Alert.alert('Login Failed', message);
      return false;
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      await api.post('/register', data);
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/(auth)/login');
      return true;
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      Alert.alert('Registration Error', message);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      if (__DEV__) console.log('Logout API error (proceeding with local logout):', error);
    } finally {
      await storage.clearAuth();
      setUser(null);

      if (router.canDismiss?.()) {
        router.dismissAll();
      }
      router.replace('/(auth)/login');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  };
}

function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
    const { data } = axiosError.response ?? {};
    if (data?.message) return data.message;
    if (data?.errors) {
      return Object.values(data.errors).flat().join('\n');
    }
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}