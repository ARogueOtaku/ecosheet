"use client";

import { register } from "@/server/actions/user";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterForm() {
  const [data, action, pending] = useActionState(register, { error: false });
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          name="username"
          required
          className="w-fit border border-black p-1"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          className="w-fit border border-black p-1"
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          required
          className="w-fit border border-black p-1"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-fit border border-black px-2 py-1 bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Register
        </button>
        <Link href="/login" className="text-blue-700 underline">
          Login
        </Link>
        {data.error && (
          <span className="text-sm text-red-600">{data.message}</span>
        )}
      </div>
    </form>
  );
}
