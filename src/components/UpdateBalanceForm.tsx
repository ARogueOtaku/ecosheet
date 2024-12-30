"use client";

import { TransactionType } from "@/database/schema";
// import { login } from "@/server/actions/user";
import { updateBalance } from "@/server/actions/economy";
import { useActionState } from "react";

export default function UpdateBalanceForm() {
  const [data, action, pending] = useActionState(updateBalance, {
    error: false,
  });
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 border border-black p-2">
        <legend className="font-bold border border-black p-1">
          Do Transaction
        </legend>
        <input
          type="number"
          placeholder="amount"
          name="amount"
          required
          className="w-fit border border-black p-1"
        />
        <select
          name="type"
          required
          defaultValue={TransactionType.enumValues[0]}
          className="w-fit border border-black p-1"
        >
          {TransactionType.enumValues.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="w-fit border border-black px-2 py-1 bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Update
        </button>
        {data.error && (
          <span className="text-sm text-red-600">{data.message}</span>
        )}
      </fieldset>
    </form>
  );
}
