"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { User } from "@/src/entities/user";
import { isApiUnauthenticatedError } from "@/src/shared/api";

import {
  getCurrentUser,
  type LoginRequestDto,
  loginUser,
  logoutUser,
  type RegisterRequestDto,
  registerUser,
} from "../api/auth-api";
import { getAuthToken, removeAuthToken, setAuthToken } from "./auth-storage";

export type AuthSessionStatus = "authenticated" | "initializing" | "unauthenticated";

export type LoginCredentials = {
  deviceName?: string;
  email: string;
  password: string;
};

export type RegisterCredentials = {
  deviceName?: string;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

type AuthSessionContextValue = {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  restoreSession: () => Promise<void>;
  status: AuthSessionStatus;
  user: User | null;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

const createLoginRequestDto = (credentials: LoginCredentials): LoginRequestDto => {
  const requestDto: LoginRequestDto = {
    email: credentials.email,
    password: credentials.password,
  };

  if (credentials.deviceName) {
    requestDto.device_name = credentials.deviceName;
  }

  return requestDto;
};

const createRegisterRequestDto = (credentials: RegisterCredentials): RegisterRequestDto => {
  const requestDto: RegisterRequestDto = {
    email: credentials.email,
    name: credentials.name,
    password: credentials.password,
    password_confirmation: credentials.passwordConfirmation,
  };

  if (credentials.deviceName) {
    requestDto.device_name = credentials.deviceName;
  }

  return requestDto;
};

type AuthSessionProviderProps = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [status, setStatus] = useState<AuthSessionStatus>("initializing");
  const [user, setUser] = useState<User | null>(null);

  const setAuthenticatedSession = useCallback((nextUser: User, token: string) => {
    setAuthToken(token);
    setUser(nextUser);
    setStatus("authenticated");
  }, []);

  const clearSession = useCallback(() => {
    removeAuthToken();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const restoreSession = useCallback(async () => {
    setStatus("initializing");

    const token = getAuthToken();

    if (!token) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }

    try {
      const currentUser = await getCurrentUser(token);
      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      setUser(null);
      setStatus("unauthenticated");

      if (isApiUnauthenticatedError(error)) {
        removeAuthToken();
      }
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await loginUser(createLoginRequestDto(credentials));

      setAuthenticatedSession(result.user, result.token);
    },
    [setAuthenticatedSession],
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      const result = await registerUser(createRegisterRequestDto(credentials));

      setAuthenticatedSession(result.user, result.token);
    },
    [setAuthenticatedSession],
  );

  const logout = useCallback(async () => {
    const token = getAuthToken();

    try {
      if (token) {
        await logoutUser(token);
      }
    } catch {
      // Logout must clear frontend auth state even when the backend token is already invalid.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void restoreSession();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [restoreSession]);

  const contextValue = useMemo<AuthSessionContextValue>(
    () => ({
      login,
      logout,
      register,
      restoreSession,
      status,
      user,
    }),
    [login, logout, register, restoreSession, status, user],
  );

  return <AuthSessionContext.Provider value={contextValue}>{children}</AuthSessionContext.Provider>;
}

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext);

  if (context === null) {
    throw new Error("useAuthSession must be used inside AuthSessionProvider.");
  }

  return context;
};
