import type { IncomingMessage, ServerResponse } from "http";
import { pbServer } from "../server/db/pbServerGlobal";

export async function getPBServer(req: IncomingMessage, res: ServerResponse) {
  // load the store data from the request cookie string
  // const pbServer = new PocketBase("http://localhost:8090");
  pbServer.authStore.loadFromCookie(req?.headers?.cookie || "");

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pbServer.authStore.isValid &&
      (await pbServer.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pbServer.authStore.clear();
  }

  // send back the default 'pb_auth' cookie to the client with the latest store state
  res?.setHeader("set-cookie", pbServer.authStore.exportToCookie());

  return pbServer;
}
