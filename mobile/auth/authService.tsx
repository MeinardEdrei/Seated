import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

let isGoogleConfigured = false;
export const configureGoogleSignIn = () => {
  if (isGoogleConfigured) return;

  if (Platform.OS !== "web") {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: false,
    });
  }
  isGoogleConfigured = true;
};

export function useGoogleSignIn() {
  const { signIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // For web only
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleWebResponse = async () => {
        if (response?.type === "success") {
          const { id_token } = response.params;
          if (id_token) {
            setIsSigningIn(true);
            try {
              await signIn(id_token);
            } finally {
              setIsSigningIn(false);
            }
          }
        }
      };
      handleWebResponse();
    }
  }, [response, signIn]);

  const promptGoogleSignIn = async () => {
    if (Platform.OS === "web") {
      if (request) promptAsync();
    } else {
      try {
        setIsSigningIn(true);
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("Native Google Sign-In User Info:", userInfo);

        const idToken = await GoogleSignin.getTokens().then(tokens => tokens.idToken);

        console.log("Native Google Sign-In ID Token:", idToken);
        if (!idToken) {
          throw new Error('Failed to obtain ID token from Google Sign-In');
        }
        await signIn(idToken);
      } catch (error) {
        console.error("Native Google Sign-In Error:", error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return {
    promptGoogleSignIn,
    isSigningIn,
    isDisabled: Platform.OS === "web" && !request,
  };
}
