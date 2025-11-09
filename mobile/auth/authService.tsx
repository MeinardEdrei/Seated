import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";
import { useAuth } from "../context/AuthContext";
import { signUpOtp, sendOtpToEmail, verifyLoginOtp, sendLoginOtp  } from "../api/auth"
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
        await signIn(firebaseToken, true);
        
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
        await signIn(firebaseToken, true);
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

// handle email sign up here 

export function useEmailSignUp() {
  const { signIn } = useAuth(); 
  const [isSigningUp, setIsSigningUp] = useState(false);

  const sendOtp = async (email: string) => {
    try {
      setIsSigningUp(true);
      const response = await sendOtpToEmail(email);
      console.log("OTP sent response:", response);
      return response.success;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    } finally {
      setIsSigningUp(false);
    }
  };


  const verifyOtpAndSignUp = async (email: string, otp: string) => {
    try {
      setIsSigningUp(true);
      const response = await signUpOtp(email, otp); 
      console.log("Sign up OTP verification response:", response);
      await signIn(email, false);
      return response.success;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    } finally {
      setIsSigningUp(false);
    }
  }

  return {
    sendOtp,
    verifyOtpAndSignUp,
    isSigningUp,
  };
}

export function useEmailLogin() {
  const { signIn } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const sendLoginOtpCode = async (email: string) => {
    try {
      setIsLoggingIn(true);
      const response = await sendLoginOtp(email);
      return response.success;
    } catch (error) {
      console.error("Error sending login OTP:", error);
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const verifyAndLogin = async (email: string, otp: string) => {
    try {
      setIsLoggingIn(true);
      const response = await verifyLoginOtp(email, otp);
      
      // ✅ Store tokens using the centralized signIn function
      // Pass the email with false flag (not Google sign-in)
      const result = await signIn(email, false);
      
      return result; // Returns { success: true/false }
    } catch (error) {
      console.error("Error verifying login OTP:", error);
      return { success: false };
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    sendLoginOtpCode,
    verifyAndLogin,
    isLoggingIn,
  };
}
