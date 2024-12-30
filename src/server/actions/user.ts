"use server";

import db from "@/database/db";
import { UserRole, UserTable } from "@/database/schema";
import { ServerActionResponse, UserData } from "@/types";
import { encrypt, hash, verifyHash } from "@/server/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByUsername, usernameExists } from "@/server/data-access/user";

export async function login(
  _oldState: ServerActionResponse,
  form: FormData
): Promise<ServerActionResponse> {
  const username = form.get("username")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";
  const foundUser = await getUserByUsername(username);
  if (foundUser && (await verifyHash(password, foundUser.password))) {
    const userData: UserData = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      isAdmin: foundUser.role === UserRole.enumValues[0],
    };
    const cookieContent = await encrypt(JSON.stringify(userData));
    const cookieStore = await cookies();
    cookieStore.set("user", cookieContent, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: parseInt(process.env.SESSION_AGE!) || 10,
    });
    redirect("/");
  } else
    return {
      error: true,
      message: "Invalid username/password",
    };
}

export async function register(
  _oldState: ServerActionResponse,
  form: FormData
): Promise<ServerActionResponse> {
  const username = form.get("username")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";
  const name = form.get("name")?.toString() ?? "";
  const userExists = await usernameExists(username);
  if (!userExists) {
    const hashedPassword = await hash(password);
    await db.insert(UserTable).values({
      username,
      password: hashedPassword,
      name,
    });
    redirect("/login");
  } else
    return {
      error: true,
      message: "User already exists!",
    };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  redirect("/login");
}
