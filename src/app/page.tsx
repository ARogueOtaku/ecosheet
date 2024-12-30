import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-center p-2">
      <span>Welcome to Ecosheet. To continue, please </span>
      <Link href="/login" className="text-blue-700 underline">
        Login
      </Link>
      <span> Or </span>
      <Link href="/register" className="text-blue-700 underline">
        Register
      </Link>
    </div>
  );
}
