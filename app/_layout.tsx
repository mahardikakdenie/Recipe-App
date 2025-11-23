// app/_layout.tsx
import { Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@/src/context/Theme/ThemeContext";
import { AuthProvider, useAuth } from "@/src/context/Auth/AuthContext";
import AppBar from "@/src/components/ui/appbar/appbar";

SplashScreen.preventAutoHideAsync();

// Komponen baru di dalam AuthProvider
function RootLayoutNav() {
  const path = usePathname();
  const { user } = useAuth();

  return (
    <Stack
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        headerShown: path !== '/auth' && path !== '/login' && !!user,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
