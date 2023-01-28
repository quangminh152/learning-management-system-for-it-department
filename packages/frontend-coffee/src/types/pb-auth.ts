import type { Admin, Record } from "pocketbase";
import type PocketBase from "pocketbase";

/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
export default interface Session {
  isValid: boolean;
  userModel: Record | Admin | null;
  userToken: string;
}
