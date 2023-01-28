import { createContext } from "react";
import type { AuthContextType } from "./AuthContextProvider";

// Default value for User context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
