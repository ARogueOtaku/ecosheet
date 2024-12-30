import { getUser } from "@/server/data-access/user";

export default async function UserDisplay() {
  const user = await getUser();
  return user && <span>{user.name ?? "No Name"}</span>;
}
