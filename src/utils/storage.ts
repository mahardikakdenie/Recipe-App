// src/utils/storage.ts
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_profile';

// Simpan token secara aman
export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// Ambil token
export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

// Hapus token
export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

// Simpan user profile (JSON)
export const saveUser = async (user: any): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Ambil user profile
export const getUser = async (): Promise<any | null> => {
  const userStr = await AsyncStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Hapus user profile
export const removeUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_KEY);
};

// Logout: hapus semua
export const clearAuth = async (): Promise<void> => {
  await removeToken();
  await removeUser();
};
