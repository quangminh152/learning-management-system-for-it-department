import type PocketBase from "pocketbase";
import type { UsersResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import type { PBClearResponse } from "src/pages/api/auth/pbClear";

interface AuthWithPasswordAndCookieArgs {
  username: string;
  password: string;
  pbClient: PocketBase;
}

interface requestEmailVerificationArgs {
  email: string;
  pbClient: PocketBase;
}
interface confirmEmailVerificationArgs {
  token: string;
  pbClient: PocketBase;
}
interface requestPasswordResetEmailArgs {
  email: string;
  pbClient: PocketBase;
}
interface confirmPasswordResetEmailArgs {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
  pbClient: PocketBase;
}

interface ClearAuthStoreAndCookieArgs {
  pbClient: PocketBase;
}

export async function _authWithPasswordAndCookie({
  username,
  password,
  pbClient,
}: AuthWithPasswordAndCookieArgs) {
  return await pbClient
    .collection(Collections.Users)
    .authWithPassword<UsersResponse>(username, password)
    .then((record) => {
      document.cookie = pbClient.authStore.exportToCookie({
        httpOnly: false,
      });
      return record.record;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function _clearAuthStoreAndCookie({
  pbClient,
}: ClearAuthStoreAndCookieArgs) {
  return await fetch("/api/auth/pbClear/", { method: "PUT" })
    .then((res) => {
      pbClient.authStore.clear();
      return res.json() as Promise<PBClearResponse>;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function _requestEmailVerification({
  email,
  pbClient,
}: requestEmailVerificationArgs) {
  return await pbClient
    .collection(Collections.Users)
    .requestVerification(email)
    .then((hasSent) => {
      return hasSent;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function _confirmEmailVerification({
  token,
  pbClient,
}: confirmEmailVerificationArgs) {
  return await pbClient
    .collection(Collections.Users)
    .confirmVerification(token)
    .then((isConfirmed) => {
      return isConfirmed;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function _requestPasswordResetEmail({
  email,
  pbClient,
}: requestPasswordResetEmailArgs) {
  return await pbClient
    .collection(Collections.Users)
    .requestPasswordReset(email)
    .then((hasSent) => {
      return hasSent;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function _confirmPasswordResetEmail({
  token,
  newPassword,
  newPasswordConfirm,
  pbClient,
}: confirmPasswordResetEmailArgs) {
  return await pbClient
    .collection(Collections.Users)
    .confirmPasswordReset(token, newPassword, newPasswordConfirm)
    .then((isSuccess) => {
      return isSuccess;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "AuthContext is undefined. Missing AuthContextProvider for the current scope."
    );
  }
  return authContext;
}
