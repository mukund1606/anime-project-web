import { router } from "@/server/api/trpc";

// Routes
import { getScheduleRoute } from "@/server/api/routes/liveChart/getSchedule";

export const liveChartRoute = router({
  getSchedule: getScheduleRoute,
});
