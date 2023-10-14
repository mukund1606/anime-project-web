import { publicProcedure, router } from "@/server/api/trpc";

// Routes
import { liveChartRoute } from "@/server/api/routes/liveChart";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello World";
  }),
  liveChart: liveChartRoute,
});

export type AppRouter = typeof appRouter;
