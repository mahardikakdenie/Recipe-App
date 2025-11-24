// app/(tabs)/index.tsx
import { useFonts } from 'expo-font';
import React from 'react';
import HomeScreen from '@/src/screens/home/Index';
import { useTheme } from '@/src/context/Theme/ThemeContext';

const Index = () => {
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular: theme.fonts.regular,
    Inter_600SemiBold: theme.fonts.medium,
    Inter_700Bold: theme.fonts.bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return <HomeScreen />
};


export default Index;
