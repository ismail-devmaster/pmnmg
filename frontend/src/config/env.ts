/**
 * Environment configuration
 * Centralizes all environment-specific values
 */

export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.100.198:8000/api',
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME ?? 'ProductManager',
  APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION ?? '1.0.0',
  IS_DEV: __DEV__,
} as const;

export type EnvConfig = typeof ENV;