import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

const KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
} as const;

const REMEMBER_ME_KEY = 'remember_me';

export const storage = {
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.TOKEN);
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  async clearAuth(): Promise<void> {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.USER]);
  },

  async saveRememberMe(value: boolean): Promise<void> {
    await AsyncStorage.setItem(REMEMBER_ME_KEY, value ? 'true' : 'false');
  },

  async getRememberMe(): Promise<boolean> {
    const value = await AsyncStorage.getItem(REMEMBER_ME_KEY);
    return value === 'true';
  },
};

export { KEYS as STORAGE_KEYS };
