import { publicProcedure, router } from "@/server/api/trpc";
import { anilistRouter } from "./routes/anilist";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello World";
  }),
  anilist: anilistRouter,
});

export type AppRouter = typeof appRouter;
