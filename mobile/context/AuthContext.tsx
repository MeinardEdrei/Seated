import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
  loginWithGoogleBackend,
  signOutBackend,
  loginWithEmailBackend,
} from "../api/auth";
import { useRouter, useSegments } from "expo-router";
import { Storage } from "../utils/storage";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthContextData = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  signIn: (idTokenOrEmail: string, googleSignIn: boolean) => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// This hook will protect routes
export function useProtectedRoute(user: User | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const currentRoute = segments.join("/");

    const inAuthGroup =
      currentRoute.startsWith("Login") ||
      currentRoute.startsWith("Registration");

    const isRootIndex = segments.length < 1;

    // Redirect logic
    // if no user and trying to access protected route, go to login
    // if user exists and trying to access auth route, go to homepage
    if (!user && !inAuthGroup && !isRootIndex) {
      router.replace("/Login/login");
    } else if (user && (inAuthGroup || isRootIndex)) {
      router.replace("/(tabs)/Homepage/home");
    }
  }, [user, segments, router, isLoading]);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Load auth state from SecureStore on app start
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedAccessToken = await Storage.getItem(TOKEN_KEY);
        const storedUserJson = await Storage.getItem(USER_KEY);

        if (storedAccessToken && storedUserJson) {
          setAccessToken(storedAccessToken);
          setUser(JSON.parse(storedUserJson));
        }
      } catch (e) {
        console.error("Failed to load auth state", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const signIn = async (idTokenOrEmail: string, googleSignIn: boolean) => {
    try {
      let accessToken: string | undefined;
      let refreshToken: string | undefined;
      let user: User | undefined;

      if (googleSignIn) {
        const response = await loginWithGoogleBackend(idTokenOrEmail);
        accessToken = response.accessToken;
        refreshToken = response.refreshToken;
        user = response.user;
      } else {
        const response = await loginWithEmailBackend(idTokenOrEmail);
        accessToken = response.accessToken;
        refreshToken = response.refreshToken;
        user = response.user;
      }

      if (!accessToken || !refreshToken || !user) {
        return { success: false };
      }

      await Storage.setItem(TOKEN_KEY, accessToken);
      await Storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      await Storage.setItem(USER_KEY, JSON.stringify(user));

      setAccessToken(accessToken);
      setUser(user);
      return { success: true };
    } catch (e) {
      console.error("Sign in failed", e);
      return { success: false };
    }
  };

  const signOut = async () => {
    try {

      console.log("Key before sign out:", await Storage.getItem(TOKEN_KEY));
      const response = await signOutBackend();
      if (!response.success) {
        throw new Error("Backend sign out failed");
      }
      console.log("Response from backend sign out:", response);

      await Storage.removeItem(TOKEN_KEY);
      await Storage.removeItem(REFRESH_TOKEN_KEY);
      await Storage.removeItem(USER_KEY);

      setAccessToken(null);
      setUser(null);
    } catch (e) {
      console.error("Sign out failed", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
