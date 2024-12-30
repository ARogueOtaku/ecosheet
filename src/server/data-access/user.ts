"use server";

import db from "@/database/db";
import { JSONSafeParse, decrypt } from "@/server/utils";
import { UserData } from "@/types";
import { cookies } from "next/headers";

export async function getUser(): Promise<UserData | null> {
  const cookieStore = await cookies();
  const encryptedCookie = cookieStore.get("user");
  if (!encryptedCookie?.value) return null;
  const decryptedCookie = await decrypt(encryptedCookie.value);
  const parsedUser = JSONSafeParse<UserData | null>(decryptedCookie, null);
  return parsedUser;
}

export async function getUserByUsername(username: string) {
  return await db.query.UserTable.findFirst({
    where: (row, { eq }) => eq(row.username, username),
  });
}

export async function usernameExists(username: string) {
  const foundUser = await getUserByUsername(username);
  return !!foundUser;
}
