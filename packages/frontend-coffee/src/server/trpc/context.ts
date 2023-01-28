import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getPBServer } from "src/lib/pb_server";
import type Session from "../../types/pb-auth";

type CreateContextOptions = {
  session: Session;
} & CreateNextContextOptions;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    req: opts.req,
    res: opts.res,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const pbServer = await getPBServer(req, res);

  // load the store data from the request cookie string
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

  return await createContextInner({
    session: {
      isValid: pbServer.authStore.isValid,
      userModel: pbServer.authStore.model,
      userToken: pbServer.authStore.token,
    },
    req,
    res,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
