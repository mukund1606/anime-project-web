import { Anime_GET } from "@/server/openapiClient";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const animeSchedule = await Anime_GET("/livechart/schedule");
  if (animeSchedule.response.status !== 200 || !animeSchedule.data) {
    return <div>Error</div>;
  }
  const data = animeSchedule.data;
  return (
    <>
      <div className="flex gap-4 p-4 lg:p-8">
        {Object.keys(data).map((key) => {
          return (
            <div key={key} className="flex flex-col items-center gap-4">
              <h2 className="text-3xl font-bold">{key}</h2>
              <div className="flex w-[250px] flex-col gap-4">
                {data?.[key]?.map((anime) => {
                  const date = new Date(anime.premiere_timestamp * 1000);
                  return (
                    <Link
                      href={`https://www.livechart.me/anime/${anime.livechart_id}`}
                      key={anime.livechart_id}
                      className="transition-transform duration-200 hover:scale-105"
                    >
                      <div className="flex flex-col gap-2">
                        <Image
                          src={anime.posters[1]!}
                          alt={anime.main_title}
                          width={250}
                          height={378}
                        />
                        <div>
                          <h3 className="text-lg font-bold">
                            {anime.main_title}
                          </h3>
                          <p>
                            <span className="font-bold">Air Time: </span>
                            {date.getUTCHours().toString().padStart(2, "0")}:
                            {date.getUTCMinutes().toString().padStart(2, "0")}:
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
    </>
  );
}
