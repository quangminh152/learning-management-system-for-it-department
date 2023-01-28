import type { Admin, Record } from "pocketbase";
import PocketBase from "pocketbase";
import type { UsersResponse } from "server-cheesecake";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { env } from "src/env/client.mjs";
import {
  _authWithPasswordAndCookie,
  _clearAuthStoreAndCookie,
  _requestEmailVerification,
  _confirmEmailVerification,
  _requestPasswordResetEmail,
  _confirmPasswordResetEmail,
} from "src/lib/auth_client";
import type { PBClearResponse } from "src/pages/api/auth/pbClear";
import { AuthContext } from "./AuthContext";

// Casting to convert (Record | Admin | null) from authStore.model to UsersResponse
export type User = UsersResponse & (Record | Admin | null);

export type AuthContextType = {
  isValid: boolean;
  user: UsersResponse | null;
  pbClient: PocketBase;
  signInWithPassword: (
    username: string,
    password: string
  ) => Promise<UsersResponse | undefined>;
  signOut: () => Promise<PBClearResponse | undefined>;
  requestEmailVerification: (email: string) => Promise<boolean>;
  confirmEmailVerification: (token: string) => Promise<boolean>;
  requestPasswordResetEmail: (email: string) => Promise<boolean>;
  confirmPasswordResetEmail: (
    token: string,
    newPassword: string,
    newPasswordConfirm: string
  ) => Promise<boolean>;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const pbClient = useMemo(
    () => new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL),
    []
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsValid(pbClient.authStore.isValid);
    setUser(pbClient.authStore.model as User | null);
  }, [pbClient]);

  const signInWithPassword = async (username: string, password: string) => {
    const usersResponse = await _authWithPasswordAndCookie({
      username,
      password,
      pbClient,
    });
    setIsValid(pbClient.authStore.isValid);
    setUser(pbClient.authStore.model as User | null);
    return usersResponse;
  };

  const signOut = async () => {
    const pbClearResponse = await _clearAuthStoreAndCookie({ pbClient });
    setIsValid(pbClient.authStore.isValid);
    setUser(pbClient.authStore.model as User | null);
    return pbClearResponse;
  };

  const requestEmailVerification = async (email: string) => {
    return await _requestEmailVerification({ email, pbClient });
  };

  const confirmEmailVerification = async (token: string) => {
    return await _confirmEmailVerification({ token, pbClient });
  };

  const requestPasswordResetEmail = async (email: string) => {
    return await _requestPasswordResetEmail({ email, pbClient });
  };

  const confirmPasswordResetEmail = async (
    token: string,
    newPassword: string,
    newPasswordConfirm: string
  ) => {
    return await _confirmPasswordResetEmail({
      token,
      newPassword,
      newPasswordConfirm,
      pbClient,
    });
  };

  const context = {
    isValid,
    user,
    pbClient,
    signInWithPassword,
    signOut,
    requestEmailVerification,
    confirmEmailVerification,
    requestPasswordResetEmail,
    confirmPasswordResetEmail,
  } as AuthContextType;

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
