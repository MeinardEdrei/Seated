import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect } from "react";
import { View, Text } from "react-native";
// import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setDefaultTextFont } from "@/utils/setDefaultTextFont";
import { AuthProvider } from "../context/AuthContext";


// export const unstable_settings = {
//   anchor: "(tabs)",
// };

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View />;
  }

  // 👇 Make Poppins the global font
if (fontsLoaded) {
  setDefaultTextFont("Poppins-Regular");
}

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Login/login" />
          <Stack.Screen name="Registration/registration" />
          <Stack.Screen name="Registration/emailRegistration" />
          <Stack.Screen name="Registration/otpVerification" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
