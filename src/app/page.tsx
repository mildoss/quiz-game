import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-7xl text-center">Quiz App</h1>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}
