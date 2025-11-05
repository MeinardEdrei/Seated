import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, browserLocalPersistence, Auth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
let auth: Auth;

if (Platform.OS === "web") {
  // Web environment
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  // native?
  auth = initializeAuth(app, {
    persistence: AsyncStorage as any,
  });
}

export { auth };

