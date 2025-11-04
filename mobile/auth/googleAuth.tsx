import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import Constants from "expo-constants";

const GOOGLE_WEB_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID; 

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: __DEV__,          // true for Expo Go, false for production build
    native: "com.seatedapp://auth",
  });

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${GOOGLE_WEB_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=token` +
    `&scope=profile%20email`;

  const result = await AuthSession.startAsync({ authUrl });

  if (result.type === "success") {
    const credential = GoogleAuthProvider.credential(null, result.params.access_token);
    await signInWithCredential(auth, credential);  // Firebase manages tokens
    return auth.currentUser;                        // returns logged-in user info
  } else {
    console.log("Login cancelled or failed:", result.type);
    return null;
  }
}

