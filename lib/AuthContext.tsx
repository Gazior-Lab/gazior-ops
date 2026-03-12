"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  department?: string;
};

type AuthError = {
  type: string;
  message: string;
} | null;

type AppPublicSettings = Record<string, any>;

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: AuthError;
  appPublicSettings: AppPublicSettings | null;
  logout: (shouldRedirect?: boolean) => void;
  navigateToLogin: () => void;
  checkAppState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState<AuthError>(null);
  const [appPublicSettings] = useState<AppPublicSettings | null>(null);

  useEffect(() => {
    checkAppState();
  }, []);

  // Mock check authentication
  const checkAppState = async (): Promise<void> => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);

      // Mock: pretend we fetch user info
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockUser: User = {
        id: "1",
        fullName: "John Doe",
        email: "john@example.com",
        role: "admin",
        department: "development",
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
    } catch (error: any) {
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
      setAuthError({
        type: "unknown",
        message: error?.message ?? "Failed to authenticate",
      });
    }
  };

  const logout = (shouldRedirect = true): void => {
    setUser(null);
    setIsAuthenticated(false);
    if (shouldRedirect && typeof window !== "undefined") {
      console.log("Redirect to login page");
    }
  };

  const navigateToLogin = (): void => {
    if (typeof window !== "undefined") {
      console.log("Navigate to login page");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        logout,
        navigateToLogin,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
