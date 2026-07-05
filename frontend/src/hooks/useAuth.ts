import { useState, useCallback, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import api, { HttpError } from '@/api/axios';
import { storage } from '@/utils/storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const [token, storedUser] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      if (storedUser?.role === 'admin') {
        await storage.clearAuth();
        return;
      }

      setUser(storedUser ?? null);
    } catch {
      // Token/user data invalid — proceed as unauthenticated
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const { data } = await api.post<AuthResponse>('/login', credentials);

      if (data.user.role === 'admin') {
        await storage.clearAuth();
        Alert.alert('Access Denied', 'This application is for client use only. Admins must use the web portal.');
        return false;
      }

      await Promise.all([storage.saveToken(data.token), storage.saveUser(data.user)]);
      setUser(data.user);
      router.replace('/(app)');
      return true;
    } catch (error) {
      Alert.alert('Login Failed', getErrorMessage(error));
      return false;
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      await api.post('/register', data);
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/(auth)/login');
      return true;
    } catch (error) {
      Alert.alert('Registration Error', getErrorMessage(error));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/logout');
    } catch {
      // Proceed with local logout regardless
    } finally {
      await storage.clearAuth();
      setUser(null);
      if (router.canDismiss?.()) router.dismissAll();
      router.replace('/(auth)/login');
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  return { user, loading, isAuthenticated: !!user, login, register, logout, checkAuth };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof HttpError) return error.message || (error.errors ? Object.values(error.errors).flat().join('\n') : '');
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}
