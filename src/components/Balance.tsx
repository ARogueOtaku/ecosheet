import { getBalance } from "@/server/data-access/economy";

export default async function Balance() {
  const balance = await getBalance();
  return (
    <div className="text-xl">
      <strong>Balance: </strong>
      <em>₹{balance.total}</em>
    </div>
  );
}
