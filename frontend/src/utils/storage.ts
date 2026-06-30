import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export interface User {
  role?: string;
  [key: string]: any;
}

export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};

export const saveUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as User) : null;
};
