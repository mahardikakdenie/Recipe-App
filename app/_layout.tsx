import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
        <Stack screenOptions={{
          headerTintColor: "blue",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}>
          <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
        </Stack>
    </SafeAreaProvider>
  );
}
