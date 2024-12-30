"use server";

import db from "@/database/db";
import { TransactionTable, UserTable } from "@/database/schema";
import { ServerActionResponse, TransactionData } from "@/types";
import { and, eq, gte, lte } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getBalance() {
  const balance = await db.query.BalanceTable.findFirst();
  if (!balance)
    return {
      total: "0",
    };
  return balance;
}

export async function getTransactions(from: number, to: number) {
  const transactions: TransactionData[] = await db
    .select({
      type: TransactionTable.type,
      amount: TransactionTable.amount,
      time: TransactionTable.time,
      balance: TransactionTable.clearbalance,
      name: UserTable.name,
    })
    .from(TransactionTable)
    .innerJoin(UserTable, eq(TransactionTable.userid, UserTable.id))
    .where(
      and(gte(TransactionTable.time, from), lte(TransactionTable.time, to))
    );
  return transactions;
}

export async function getRecentTransactions() {
  const from = new Date();
  from.setMonth(from.getMonth() - 6);
  const to = new Date();
  return await getTransactions(from.getTime(), to.getTime());
}

export async function searchTransactions(
  _oldState: ServerActionResponse,
  form: FormData
): Promise<ServerActionResponse> {
  const from = form.get("from")?.toString();
  const to = form.get("to")?.toString();
  if (!from || !to)
    return {
      error: true,
      message: "Invalid search dates!",
    };
  redirect(
    `/dashboard?from=${new Date(from).getTime()}&to=${new Date(to).getTime()}`
  );
}
