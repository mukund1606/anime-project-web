import { anilistRouter } from "@/server/api/routes/anilist";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  anilist: anilistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
