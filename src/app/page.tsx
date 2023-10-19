import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <Link href="/schedule" className="text-4xl font-bold underline">
          Schedule
        </Link>
      </div>
    </>
  );
}
