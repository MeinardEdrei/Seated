import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);

  const promptAsync = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");

      const clientId = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID;
      const username = Constants.expoConfig?.extra?.EXPO_USERNAME;

      const redirectUri = `https://auth.expo.io/@${username}/mobile`;
      const scope = encodeURIComponent("openid profile email");
      const responseType = "id_token token";
      const nonce = Math.random().toString(36).substring(7);
      

      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=${responseType}&` +
        `scope=${scope}&` +
        `nonce=${nonce}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri,
      );
      console.log("==================");
      console.log("Client ID:", clientId);
      console.log("Redirect URI:", redirectUri);
      console.log("==================");
      if (result.type === "success" && result.url) {
        const params = new URLSearchParams(result.url.split("#")[1]);
        const idToken = params.get("id_token");

        if (idToken) {
          const credential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(auth, credential);
          console.log("Signed in:", userCredential.user);
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    request: { loading },
    promptAsync,
  };
}
