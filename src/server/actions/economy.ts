"use server";

import db from "@/database/db";
import { BalanceTable, TransactionTable } from "@/database/schema";
import { getBalance } from "@/server/data-access/economy";
import { getUser } from "@/server/data-access/user";
import { ServerActionResponse } from "@/types";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateBalance(
  _oldState: ServerActionResponse,
  form: FormData
): Promise<ServerActionResponse> {
  const amount = form.get("amount")?.toString() ?? "";
  const reason = form.get("reason")?.toString();
  const type = (form.get("type")?.toString() ?? "Credit") as "Credit" | "Debit";
  if (amount) {
    if (
      type === "Debit" &&
      parseFloat((await getBalance()).total) < parseFloat(amount)
    )
      return {
        error: true,
        message: "Insufficient Balance!",
      };
    const user = await getUser();
    if (!user?.isAdmin)
      return {
        error: true,
        message: "Unauthorized Access",
      };
    const updateClause =
      type === "Credit"
        ? sql`${BalanceTable.total} + ${amount}`
        : sql`${BalanceTable.total} - ${amount}`;
    await db.transaction(async (tx) => {
      const newBalance = await tx
        .update(BalanceTable)
        .set({
          total: updateClause,
        })
        .where(eq(BalanceTable.id, 1))
        .returning();
      await tx.insert(TransactionTable).values({
        amount,
        time: Date.now(),
        type,
        reason,
        clearbalance: newBalance[0].total,
        userid: user.id,
      });
    });
    revalidatePath("/dashboard");
    return { error: false };
  }
  return {
    error: true,
    message: "Amount must be greater than 0!",
  };
}
