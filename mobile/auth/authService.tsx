import { useState } from "react";
import { Platform } from "react-native";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";
import { useAuth } from "../context/AuthContext";
import { signUpOtp, sendOtpToEmail, verifyLoginOtp, sendLoginOtp } from "../api/auth";

let isGoogleConfigured = false;
let GoogleSignin: any = null;

// Load only on native builds so we can use expo go
async function loadGoogleSignin() {
  if (Platform.OS === "web") return null;
  if (!GoogleSignin) {
    const mod = await import("@react-native-google-signin/google-signin");
    GoogleSignin = mod.GoogleSignin;
  }
  return GoogleSignin;
}

export const configureGoogleSignIn = async () => {
  if (isGoogleConfigured) return;

  if (Platform.OS !== "web") {
    const GS = await loadGoogleSignin();
    GS.configure({
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
    setIsSigningIn(true);

    try {
      // Web flow
      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const firebaseToken = await result.user.getIdToken();
        await signIn(firebaseToken, true);
        return;
      }

      // Native flow
      await configureGoogleSignIn();
      const GS = await loadGoogleSignin();

      await GS.hasPlayServices();
      const userInfo = await GS.signIn();

      const tokens = await GS.getTokens();
      const idToken = tokens.idToken;

      if (!idToken) throw new Error("No ID token returned");

      const credential = GoogleAuthProvider.credential(idToken);
      const authResult = await signInWithCredential(auth, credential);

      const firebaseToken = await authResult.user.getIdToken();
      await signIn(firebaseToken, true);
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

export function useEmailSignUp() {
  const { signIn } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const sendOtp = async (email: string) => {
    setIsSigningUp(true);
    try {
      const response = await sendOtpToEmail(email);
      return response.success;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    } finally {
      setIsSigningUp(false);
    }
  };

  const verifyOtpAndSignUp = async (email: string, otp: string) => {
    setIsSigningUp(true);
    try {
      const response = await signUpOtp(email, otp);
      await signIn(email, false);
      return response.success;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    } finally {
      setIsSigningUp(false);
    }
  };

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
    setIsLoggingIn(true);
    try {
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
    setIsLoggingIn(true);
    try {
      await verifyLoginOtp(email, otp);
      const response = await signIn(email, false);
      return response;
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

