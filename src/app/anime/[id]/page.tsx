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
        className="flex flex-col items-center gap-2 rounded-md p-4"
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
        <p className="w-full text-sm">
          <span className="font-medium">Status:</span> {data.status}
        </p>
        <p className="w-full text-sm">
          <span className="font-medium">Releaded Date:</span> {data.releaseDate}
        </p>
        <p className="w-full text-sm">
          <span className="font-medium">Rating:</span> {data.rating}
        </p>
        <p className="w-full text-sm">
          <span className="font-medium">Type:</span> {data.type}
        </p>
        <p className="w-full text-sm">
          <span className="font-medium">Genres:</span> {data.genres?.join(", ")}
        </p>
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-lg font-semibold">
            Episodes({data.episodes?.length ?? 0})
          </h3>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-10 lg:grid-cols-12">
            {data.episodes?.map((episode) => (
              <Link
                href={`/anime/${data.id}/episode/${episode.id}`}
                key={episode.id}
                className="flex flex-col items-center gap-2 rounded-md border px-2 py-4 transition-all duration-700 ease-in-out hover:scale-105 hover:bg-slate-300"
              >
                {episode.title ?? "EP " + episode.number}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
