import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";

let isGoogleConfigured = false;

export const configureGoogleSignIn = () => {
  if (isGoogleConfigured) return;
  
  if (Platform.OS !== "web") {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }
  
  isGoogleConfigured = true;
};

export const signInWithGoogle = async () => {
  configureGoogleSignIn();
    // for web 
  if (Platform.OS === "web") {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Signed in on web:", result.user.email);
    return result;
    // for native
  } else {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("Got user info from native:", userInfo);

    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;
    if (!idToken) {
      throw new Error("No ID token returned");
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    console.log("Signed in on native:", result.user.email);
    return result;
  }
};

export const signOutUser = async () => {
  console.log("Signing out...");
  
  await auth.signOut();
  console.log("Firebase sign out successful");
  
  if (Platform.OS !== "web") {
    try {
      await GoogleSignin.signOut();
      console.log("Google sign out successful");
    } catch (googleError) {
      console.log("Google sign out failed:", googleError);
    }
  }
  
  console.log("Sign out completed");
};
