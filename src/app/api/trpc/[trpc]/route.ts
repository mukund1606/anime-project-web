// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// import { appRouter } from "@/server/api";

// const handler = async (req: Request) =>
//   fetchRequestHandler({
//     endpoint: "/api/trpc",
//     req,
//     router: appRouter,
//     createContext: () => ({ user: null }),
//     responseMeta: () => {
//       return {
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type",
//           "Cache-Control": "maxage=10, s-maxage=10, stale-while-revalidate",
//         },
//       };
//     },
//   });

// export { handler as GET, handler as POST };

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
    responseMeta: () => {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "maxage=10, s-maxage=10, stale-while-revalidate",
        },
      };
    },
  });

export { handler as GET, handler as POST };
