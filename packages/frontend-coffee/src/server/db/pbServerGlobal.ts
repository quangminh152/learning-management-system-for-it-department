import PocketBase from "pocketbase";

import { env } from "src/env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var pbServer: PocketBase | undefined;
}

export const pbServer =
  globalThis.pbServer || new PocketBase("http://localhost:8090");

if (env.NODE_ENV !== "production") {
  globalThis.pbServer = pbServer;
}
