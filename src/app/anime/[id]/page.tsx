import Image from "next/image";
import { api } from "@/trpc/server";
import Link from "next/link";

type AnimeProps = {
  params: {
    id: string;
  };
};

export default async function AnimePage({ params }: AnimeProps) {
  const data = await api.anilist.getAnime.mutate(params);
  return (
    <div>
      <div
        key={data.id}
        className="flex flex-col items-center gap-2 rounded-md px-2 py-4"
      >
        <Image
          src={data.image ?? ""}
          width={200}
          height={300}
          className="aspect-[9/12] h-auto w-56 rounded-md object-cover"
          priority
          alt={
            (typeof data.title !== "string"
              ? data.title.english ?? data.title.romaji
              : data.title) ?? ""
          }
        />
        <p className="text-center text-xl font-bold">
          {typeof data.title !== "string"
            ? data.title.english ?? data.title.romaji
            : data.title}
        </p>
        <p
          className="font-medium"
          dangerouslySetInnerHTML={{ __html: data.description! }}
        />
        <p className="w-full text-sm">Status: {data.status}</p>
        <p className="w-full text-sm">Released Date: {data.releaseDate}</p>
        <p className="w-full text-sm">Rating: {data.rating}</p>
        <p className="w-full text-sm">Type: {data.type}</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {data.episodes?.map((episode) => (
            <Link
              href={`/anime/${data.id}/episode/${episode.id}`}
              key={episode.id}
              className="flex flex-col items-center gap-2 rounded-md border px-2 py-4 transition-all duration-700 ease-in-out hover:scale-105 hover:bg-slate-300"
            >
              {episode.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
