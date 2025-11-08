import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginWithGoogleBackend } from '../api/auth'; 
import { useRouter, useSegments } from 'expo-router';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthContextData = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean; 
  signIn: (idToken: string) => Promise<void>;
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

    const currentRoute = segments.join('/');
    const inAuthGroup = currentRoute === 'Login/login' || currentRoute === 'Registration/registration';
      
    const isRootIndex = segments.length === 0;

    if (!user && !inAuthGroup && !isRootIndex) {
      router.replace('/Login/login');
    } else if (user && (inAuthGroup || isRootIndex)) {
      router.replace('/(tabs)/Homepage/home');
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
        const storedAccessToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const storedUserJson = await SecureStore.getItemAsync(USER_KEY);

        if (storedAccessToken && storedUserJson) {
          setAccessToken(storedAccessToken);
          setUser(JSON.parse(storedUserJson));
        }
      } catch (e) {
        console.error('Failed to load auth state', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);


  const signIn = async (idToken: string) => {
    try {
      const { accessToken, refreshToken, user } = await loginWithGoogleBackend(idToken);

      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

      setAccessToken(accessToken);
      setUser(user);

    } catch (e) {
      console.error('Sign in failed', e);
      throw e; 
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);

      setAccessToken(null);
      setUser(null);
    } catch (e) {
      console.error('Sign out failed', e);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
