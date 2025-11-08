import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";
import { useAuth } from "../context/AuthContext";

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

export function useGoogleSignIn() {
  const { signIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const promptGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      configureGoogleSignIn();
      
      // For web 
      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Web user signed in:", result.user.email);
        
        // Get Firebase ID token
        const firebaseToken = await result.user.getIdToken();
        console.log("Firebase ID Token (web):", firebaseToken);
        await signIn(firebaseToken);
        
      // For native
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
        console.log("Native user signed in:", result.user.email);
        
        // Get Firebase ID token
        const firebaseToken = await result.user.getIdToken();
        console.log("Firebase ID Token (native):", firebaseToken);
        await signIn(firebaseToken);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return {
    promptGoogleSignIn,
    isSigningIn,
    isDisabled: false,
  };
}
