import VidStackPlayer from "@/components/VidstackPlayer";
import { api } from "@/trpc/server";
import React from "react";

type AnimeEpisodeProps = {
  params: {
    id: string;
    epID: string;
  };
};

export default async function EpisodePage({ params }: AnimeEpisodeProps) {
  const { data } = await api.anilist.getEpisode.mutate(params);
  if (!data) return <div>Episode not found</div>;
  const sources = data.sources.map((source) => source.url);
  return (
    <div className="flex flex-col p-4 md:w-4/5 lg:w-7/12 ">
      <VidStackPlayer urls={sources} downloadUrl={data.download} />
    </div>
  );
}
