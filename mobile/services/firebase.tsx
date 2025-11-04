import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const FIREBASE_API_KEY = Constants.expoConfig?.extra?.FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID;
const FIREBASE_APP_ID = Constants.expoConfig?.extra?.FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


