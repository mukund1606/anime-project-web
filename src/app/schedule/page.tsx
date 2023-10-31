"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Anime_GET } from "@/server/openapiClient";
import type { components } from "@/lib/api/anime-api_v1";

type AnimeData = components["schemas"]["LiveChartAnimeData"];

export default function Home() {
  const [animeSchedule, setAnimeSchedule] =
    useState<Record<string, AnimeData[]>>();

  useEffect(() => {
    const getAnimeData = async () => {
      const animeSchedule = await Anime_GET("/livechart/schedule");
      if (animeSchedule.response.status !== 200 || !animeSchedule.data) {
        return;
      }
      const data = animeSchedule.data;
      setAnimeSchedule(data);
    };
    getAnimeData().catch(console.error);
  }, []);
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8">
      <Link href="/" className="text-4xl font-bold underline">
        Home
      </Link>
      <div className="flex gap-4">
        {animeSchedule &&
          Object.keys(animeSchedule).map((key) => {
            return (
              <div key={key} className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold">{key}</h2>
                <div className="flex w-[252px] flex-col gap-4">
                  {animeSchedule?.[key]?.map((anime) => {
                    const date = new Date(anime.premiere_timestamp * 1000);
                    return (
                      <Link
                        href={`https://www.livechart.me/anime/${anime.livechart_id}`}
                        key={`${anime.livechart_id}-${anime.episode}`}
                        className="transition-transform duration-200 hover:scale-105"
                      >
                        <div className="flex flex-col gap-2">
                          <Image
                            src={anime.posters[1]!}
                            alt={anime.main_title}
                            width={252}
                            height={360}
                            className="h-auto w-auto"
                            priority
                          />
                          <div>
                            <h3 className="text-lg font-bold">
                              {anime.main_title}
                            </h3>
                            <p>
                              <span className="font-bold">Air Time: </span>
                              {date.getUTCHours().toString().padStart(2, "0")}:
                              {date.getUTCMinutes().toString().padStart(2, "0")}
                              :
                              {date.getUTCSeconds().toString().padStart(2, "0")}{" "}
                              GMT
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
