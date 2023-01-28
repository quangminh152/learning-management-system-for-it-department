import { initTRPC, TRPCError } from "@trpc/server";
import type { Admin, Record } from "pocketbase";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session.isValid) {
    console.error("UNAUTHORIZED");
    return next({
      ctx: {
        session: {
          isValid: false,
        },
      },
    });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {
        isValid: true,
        userModel: ctx.session.userModel as Record | Admin,
        userToken: ctx.session.userToken,
      },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuth);
