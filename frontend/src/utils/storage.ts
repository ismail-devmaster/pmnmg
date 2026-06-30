import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '@/types';

const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class StorageError extends Error {
  constructor(
    message: string,
    public readonly key: StorageKey,
    public readonly operation: 'get' | 'set' | 'remove',
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

async function handleStorageOperation<T>(
  operation: () => Promise<T>,
  key: StorageKey,
  opType: 'get' | 'set' | 'remove'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (__DEV__) {
      console.error(`Storage ${opType} failed for key "${key}":`, error);
    }
    throw new StorageError(
      `Failed to ${opType} storage item: ${key}`,
      key,
      opType,
      error instanceof Error ? error : undefined
    );
  }
}

export const storage = {
  async saveToken(token: string): Promise<void> {
    await handleStorageOperation(
      () => AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      STORAGE_KEYS.TOKEN,
      'set'
    );
  },

  async getToken(): Promise<string | null> {
    return handleStorageOperation(
      () => AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      STORAGE_KEYS.TOKEN,
      'get'
    );
  },

  async removeToken(): Promise<void> {
    await handleStorageOperation(
      () => AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      STORAGE_KEYS.TOKEN,
      'remove'
    );
  },

  async saveUser(user: User): Promise<void> {
    await handleStorageOperation(
      () => AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      STORAGE_KEYS.USER,
      'set'
    );
  },

  async getUser(): Promise<User | null> {
    return handleStorageOperation(
      async () => {
        const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        return userData ? (JSON.parse(userData) as User) : null;
      },
      STORAGE_KEYS.USER,
      'get'
    );
  },

  async clearAuth(): Promise<void> {
    await Promise.all([
      this.removeToken(),
      handleStorageOperation(
        () => AsyncStorage.removeItem(STORAGE_KEYS.USER),
        STORAGE_KEYS.USER,
        'remove'
      ),
    ]);
  },

  async getUserRole(): Promise<UserRole | null> {
    const user = await this.getUser();
    return user?.role ?? null;
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};

export { StorageError, STORAGE_KEYS };