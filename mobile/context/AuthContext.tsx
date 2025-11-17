import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  loginWithGoogleBackend,
  signOutBackend,
  loginWithEmailBackend,
} from "../api/auth";
import { useRouter, useSegments } from "expo-router";
import { Storage } from "../utils/storage";
import { TokenService } from "../services/tokenService";

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
  signIn: (
    idTokenOrEmail: string,
    googleSignIn: boolean,
  ) => Promise<{ success: boolean }>;
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

    // Redirect logic based on user role
    if (!user && !inAuthGroup && !isRootIndex) {
      // No user and trying to access protected route -> go to login
      router.replace("/Login/login");
    } else if (user && (inAuthGroup || isRootIndex)) {
      // User exists and trying to access auth route or root -> redirect based on role
      if (user.role === "organizer") {
        router.replace("/(tabs)/Organizer/Dashboard/Dashboard");
      } else {
        router.replace("/(tabs)/Homepage/Home");
      }
    }
  }, [user, segments, router, isLoading]);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load authentication state on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedAccessToken = await Storage.getItem(TOKEN_KEY);
      const storedUserJson = await Storage.getItem(USER_KEY);

      if (storedAccessToken && storedUserJson) {
        // Just load the token - axios interceptor will handle validation
        setAccessToken(storedAccessToken);
        setUser(JSON.parse(storedUserJson));
      }
    } catch (e) {
      console.error("Failed to load auth state", e);
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = async () => {
    await TokenService.clearAuthData();
    setAccessToken(null);
    setUser(null);
  };

  const signIn = async (idTokenOrEmail: string, googleSignIn: boolean) => {
    try {
      const response = googleSignIn
        ? await loginWithGoogleBackend(idTokenOrEmail)
        : await loginWithEmailBackend(idTokenOrEmail);

      const { accessToken, refreshToken, user } = response;

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
      await signOutBackend();
    } catch (e) {
      console.error("Sign out failed", e);
    } finally {
      // Always clear local session, regardless of backend response
      await clearSession();
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
