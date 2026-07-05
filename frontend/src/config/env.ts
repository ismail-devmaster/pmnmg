import { Platform } from 'react-native';

function getDefaultApiUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  if (Platform.OS === 'android') return 'http://10.0.2.2:8000/api';
  return 'http://localhost:8000/api';
}

export const ENV = {
  API_URL: getDefaultApiUrl(),
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME ?? 'ProductManager',
  APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION ?? '1.0.0',
  IS_DEV: __DEV__,
} as const;

export type EnvConfig = typeof ENV;
