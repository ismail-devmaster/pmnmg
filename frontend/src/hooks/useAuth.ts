import { useState, useCallback, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import api, { HttpError } from '@/api/axios';
import { storage } from '@/utils/storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

let hasBooted = false;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      // Only enforce the "forget on relaunch" rule on the very first
      // check after the app boots — not on every call during this session.
      if (!hasBooted) {
        hasBooted = true;

        const rememberMe = await storage.getRememberMe();
        if (!rememberMe) {
          await storage.clearAuth();
          setUser(null);
          setLoading(false);
          return;
        }
      }

      const [token, storedUser] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      if (storedUser?.role === 'admin') {
        await storage.clearAuth();
        setUser(null);
        return;
      }

      setUser(storedUser ?? null);
    } catch {
      // Token/user data invalid — proceed as unauthenticated
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials, rememberMe: boolean = true): Promise<boolean> => {
      try {
        const { data } = await api.post<AuthResponse>('/login', { ...credentials, is_mobile: true });

        if (data.user.role === 'admin') {
          await storage.clearAuth();
          Alert.alert('Access Denied', 'This application is for client use only. Admins must use the web portal.');
          return false;
        }

        await Promise.all([
          storage.saveToken(data.token),
          storage.saveUser(data.user),
          storage.saveRememberMe(rememberMe),
        ]);

        // Mark the boot-check as already done, so a re-run of checkAuth
        // right after login doesn't immediately wipe what we just saved.
        hasBooted = true;

        setUser(data.user);
        setPendingEmail(null);
        router.replace('/(app)');
        return true;
      } catch (error) {
        if (error instanceof HttpError && error.isUnverified) {
          setPendingEmail(credentials.email);
          Alert.alert(
            'Email Not Verified',
            'Please verify your email address before logging in. Check your inbox, or tap "Resend Verification Email" below.'
          );
          return false;
        }

        Alert.alert('Login Failed', getErrorMessage(error));
        return false;
      }
    },
    []
  );

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      await api.post('/register', data);
      setPendingEmail(data.email);
      Alert.alert(
        'Check Your Email',
        'Account created! We sent a verification link to your email. Verify it, then come back and log in.'
      );
      router.replace('/(auth)/login');
      return true;
    } catch (error) {
      Alert.alert('Registration Error', getErrorMessage(error));
      return false;
    }
  }, []);

  const resendVerification = useCallback(async (email?: string): Promise<boolean> => {
    const target = email ?? pendingEmail;
    if (!target) {
      Alert.alert('Error', 'No email address to resend to. Please log in again first.');
      return false;
    }

    try {
      const { data } = await api.post<{ message: string }>('/email/resend', { email: target });
      Alert.alert('Email Sent', data.message ?? 'Verification email sent — check your inbox.');
      return true;
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
      return false;
    }
  }, [pendingEmail]);

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

  return {
    user,
    loading,
    isAuthenticated: !!user,
    pendingEmail,
    login,
    register,
    resendVerification,
    logout,
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof HttpError) return error.message || (error.errors ? Object.values(error.errors).flat().join('\n') : '');
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}