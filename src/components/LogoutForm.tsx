"use client";

import { logout } from "@/server/actions/user";
import { useActionState } from "react";

export default function LogoutForm() {
  const [, action, pending] = useActionState(logout, undefined);
  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-black px-2 py-1 bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Logout
      </button>
    </form>
  );
}
