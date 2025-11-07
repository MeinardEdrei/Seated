import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth listener");
    
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log("AuthProvider: Auth state changed", {
        hasUser: !!firebaseUser,
        email: firebaseUser?.email,
      });
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      console.log("AuthProvider: Cleaning up");
      unsubscribe();
    };
  }, []);

  console.log("AuthProvider rendering:", { hasUser: !!user, loading });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth called:", context);
  return context;
};