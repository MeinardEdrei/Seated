import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Crypto from "expo-crypto";
WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const redirectUri = makeRedirectUri({
    scheme: Constants.expoConfig?.scheme || 'mobile', // Add your app scheme
    useProxy: Platform.OS !== 'web',
  });

  const generateNonce = async () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
      redirectUri: redirectUri,
      responseType: ResponseType.IdToken, 
      scopes: ['openid', 'profile', 'email'],
      usePKCE: false,
      extraParams: {
        nonce: generateNonce(), 
      },
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  useEffect(() => {
    console.log("==================");
    console.log(
      "Client ID:",
      Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
    );
    console.log("Redirect URI:", redirectUri);
    console.log("==================");
  }, []); 

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("Got ID token, signing in to Firebase...");
      
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Signed in:", userCredential.user.email);
        })
        .catch((error) => {
          console.error("Firebase sign-in error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
        });
    } else if (response?.type === "error") {
      console.error("Auth error:", response.error);
      console.error("Error params:", response.params);
    } else if (response?.type === "cancel") {
      console.log("User cancelled authentication");
    }
  }, [response]);

  return {
    request,
    promptAsync,
  };
}
