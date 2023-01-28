import { router } from "../trpc";
import { eventDocumentRouter } from "./eventDocument";

export const appRouter = router({
  eventDocument: eventDocumentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
