import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect } from "react";
import { View, ActivityIndicator  } from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setDefaultTextFont } from "@/utils/setDefaultTextFont";
import { AuthProvider, useAuth } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useProtectedRoute } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });

  const AppLayout = () => {
    const { isLoading, user } = useAuth();

    useProtectedRoute(user, isLoading);

    useEffect(() => {
      if (fontsLoaded || fontError) {
        if (!isLoading) {
          SplashScreen.hideAsync();
        }
      }
    }, [isLoading, fontsLoaded, fontError]);

    if (!fontsLoaded || isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (fontError) {
      console.error("Font loading error:", fontError);
      return null;
    }

    return (
      <>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor="transparent"
          translucent={false}
        />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login/login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="Registration/registration"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="Registration/emailRegistration"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration/otpVerification"
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeProvider>
      </>
    );
  };
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
