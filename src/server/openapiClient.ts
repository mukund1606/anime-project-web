import createClient from "openapi-fetch";

import { env } from "@/env.mjs";

import { type paths } from "@/lib/api/anime-api_v1";

export const Anime_GET = createClient<paths>({
  baseUrl: env.NEXT_PUBLIC_API_URL,
}).GET.bind(
  createClient<paths>({
    baseUrl: env.NEXT_PUBLIC_API_URL,
  }),
);

export const Anime_POST = createClient<paths>({
  baseUrl: env.NEXT_PUBLIC_API_URL,
}).POST.bind(
  createClient<paths>({
    baseUrl: env.NEXT_PUBLIC_API_URL,
  }),
);
