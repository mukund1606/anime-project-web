import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div className="flex flex-col gap-4 rounded-md border px-4 py-2">
          <Link href="/schedule" className="text-4xl font-bold underline">
            Schedule
          </Link>
          <Link href="/search" className="w-fit text-4xl font-bold underline">
            Search Anime
          </Link>
        </div>
      </div>
    </>
  );
}
