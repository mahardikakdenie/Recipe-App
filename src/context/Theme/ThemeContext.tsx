// app/contexts/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

type ColorScheme = 'light';

export interface Theme {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    textHint: string;
    border: string;
    success: string;
    error: string;
    avatarBg: string;
    cardBorder: string;
  };
  roundness: number;
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
}

const lightTheme: Theme = {
  colors: {
    primary: '#4CAF50',
    primaryLight: '#66BB6A',
    primaryDark: '#1B5E20',
    secondary: '#388E3C',
    background: '#F8FBF8',
    surface: '#E8F5E9',
    text: '#1B5E20',
    textSecondary: '#388E3C',
    textHint: '#66BB6A',
    border: '#C8E6C9',
    success: '#4CAF50',
    error: '#FF5252',
    avatarBg: '#C8E6C9',
    cardBorder: '#C8E6C9',
  },
  roundness: 24,
  fonts: {
    regular: 'Inter_400Regular',
    medium: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};

const ThemeContext = createContext<{ theme: Theme; colorScheme: ColorScheme }>({
  theme: lightTheme,
  colorScheme: 'light',
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme: lightTheme, colorScheme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const makeStyles = (createStyles: (theme: Theme) => StyleSheet.NamedStyles<any>) => {
  return () => createStyles(lightTheme);
};
