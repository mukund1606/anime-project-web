import { publicProcedure } from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";
import axios from "axios";

export const getScheduleRoute = publicProcedure.query(async () => {
  try {
    const res = await axios.get("");
    console.log("🚀 ~ file: index.ts:10 ~ .query ~ res:", res);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    });
  }
});
