import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// import { ANIME, META, PROVIDERS_LIST } from "@consumet/extensions";
// import { Genres } from "@consumet/extensions/dist/models";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { TRPCError } from "@trpc/server";
import { Anime_GET } from "@/server/openapiClient";
import axios from "axios";
import type { IAnimeInfo } from "@consumet/extensions";
// import { StreamingServers } from "@consumet/extensions/dist/models";

export const anilistRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        q: z.string(),
        page: z.number().default(1).optional(),
        perPage: z.number().default(10),
      }),
    )
    .mutation(async ({ input }) => {
      const anilist = new Anilist();
      const query = input.q;
      const page = input.page;
      const perPage = input.perPage;
      try {
        const res = await anilist.search(query, page, perPage);
        return res;
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server Error",
        });
      }
    }),
  getAnime: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const id = input.id;
      // const anilist = new Anilist();
      const data = await axios.get(
        `https://api-consumet-fork.vercel.app/meta/anilist/info/${id}`,
      );
      return data.data as IAnimeInfo;
      // const res = await anilist.fetchAnimeInfo(id);
      // return res;
    }),
  getEpisode: publicProcedure
    .input(z.object({ epID: z.string() }))
    .mutation(async ({ input }) => {
      const id = input.epID;
      // const anilist = new Anilist();
      const data = await Anime_GET("/gogoanime/watch/{episode_id}", {
        params: {
          path: {
            episode_id: id,
          },
        },
      });
      return data;
      // const res = await anilist.fetchEpisodeSources(id);
      // return res;
    }),
});
