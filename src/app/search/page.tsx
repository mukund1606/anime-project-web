import { api } from "@/trpc/server";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";

type SearchAnimeProps = {
  searchParams: {
    q: string;
  };
};

function SearchElement() {
  return (
    <div className="flex flex-col gap-4 rounded-md border px-4 py-2">
      <h1 className="w-fit text-4xl font-bold underline">Search Anime</h1>
      <form action="/search?q" method="GET" className="flex gap-4">
        <Input type="text" name="q" placeholder="Search" className="w-fit" />
        <Button type="submit">Click Me</Button>
      </form>
    </div>
  );
}

export default async function SearchAnime({ searchParams }: SearchAnimeProps) {
  if (!searchParams.q) return <SearchElement />;
  const data = await api.anilist.search.mutate(searchParams);
  return (
    <>
      <SearchElement />
      <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {data.results.map((anime) => (
          <a
            href={`/anime/${anime.id}`}
            key={anime.id}
            className="flex flex-col items-center gap-2 rounded-md border px-2 py-4 transition-all duration-700 ease-in-out hover:scale-105 hover:bg-slate-300"
          >
            <Image
              src={anime.image ?? ""}
              width={200}
              height={300}
              className="aspect-[9/12] h-auto w-4/5 rounded-md object-cover"
              priority
              alt={
                (typeof anime.title !== "string"
                  ? anime.title.english ?? anime.title.romaji
                  : anime.title) ?? ""
              }
            />
            <p className="text-center text-xl font-bold">
              {typeof anime.title !== "string"
                ? anime.title.english ?? anime.title.romaji
                : anime.title}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <p className="w-full text-sm">Status: {anime.status}</p>
              <p className="w-full text-sm">
                Released Date: {anime.releaseDate}
              </p>
              <p className="w-full text-sm">Rating: {anime.rating}</p>
              <p className="w-full text-sm">Type: {anime.type}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
