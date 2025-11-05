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

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export function useGoogleAuth() {
  const redirectUri = `https://auth.expo.io/@${Constants.expoConfig?.owner}/${Constants.expoConfig?.slug}`;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
      scopes: ["openid", "profile", "email"],
      redirectUri: redirectUri,
    },
    discovery,
  );

  useEffect(() => {
    console.log("==================");
    console.log(
      "Client ID:",
      Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
    );
    console.log("Redirect URI:", redirectUri);
    console.log("==================");
  }, [response]);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      console.log("✅ Got ID token, signing in to Firebase...");

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ Signed in:", userCredential.user.email);
        })
        .catch((error) => {
          console.error("❌ Firebase sign-in error:", error);
        });
    } else if (response?.type === "error") {
      console.error("❌ Auth error:", response.error);
      console.error("Error params:", response.params);
    } else if (response?.type === "cancel") {
      console.log("❌ User cancelled authentication");
    }
  }, [response]);

  return {
    request,
    promptAsync,
  };
}
