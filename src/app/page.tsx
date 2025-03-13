import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-[12px]">
      <h1 className="text-[28px] font-bold">바로인턴10기_신희범</h1>
      <Link
        href={"/todos"}
        className="border-solid border border-black rounded-[8px] px-[12px] py-[8px] hover:text-white hover:bg-black transition duration-300"
      >
        TodoList 이동
      </Link>
    </div>
  );
}
