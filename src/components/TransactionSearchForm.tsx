"use client";

import { searchTransactions } from "@/server/data-access/economy";
import { useActionState } from "react";

export default function TransactionSearchForm() {
  const [data, action, pending] = useActionState(searchTransactions, {
    error: false,
  });
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 border border-black p-2">
        <legend className="font-bold border border-black p-1">
          Search Transactions
        </legend>
        <input
          type="datetime-local"
          name="from"
          placeholder="from"
          required
          className="w-fit border border-black p-1"
        ></input>
        <input
          type="datetime-local"
          name="to"
          placeholder="from"
          required
          className="w-fit border border-black p-1"
        ></input>
        <button
          type="submit"
          disabled={pending}
          className="w-fit border border-black px-2 py-1 bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Search
        </button>
        {data.error && (
          <span className="text-sm text-red-600">{data.message}</span>
        )}
      </fieldset>
    </form>
  );
}
