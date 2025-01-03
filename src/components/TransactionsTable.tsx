import {
  getRecentTransactions,
  getTransactions,
} from "@/server/data-access/economy";
import { TransactionData } from "@/types";
import { Fragment, ReactNode } from "react";

const TableHeaderCell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full border border-black justify-center p-2 flex items-center sticky top-0 bg-white">
      <span className="font-bold break-word">{children}</span>
    </div>
  );
};

const TableBodyCell = ({
  children,
  fullSpan = false,
}: {
  children: ReactNode;
  fullSpan?: boolean;
}) => {
  return (
    <div
      className={`w-full border border-black justify-center px-2 py-1 flex items-center ${
        fullSpan ? "col-span-5" : ""
      }`}
    >
      <span className="w-full break-words text-center">{children}</span>
    </div>
  );
};

export default async function TransactionTable({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) {
  let transactions: TransactionData[] = [];
  if (!from || isNaN(parseInt(from)) || !to || isNaN(parseInt(to)))
    transactions = await getRecentTransactions();
  else transactions = await getTransactions(parseInt(from), parseInt(to));
  return (
    <div className="grid grid-cols-5 w-fit border border-black p-1 gap-1 overflow-auto">
      <TableHeaderCell>Date</TableHeaderCell>
      <TableHeaderCell>Amount</TableHeaderCell>
      <TableHeaderCell>Type</TableHeaderCell>
      <TableHeaderCell>Reason</TableHeaderCell>
      <TableHeaderCell>Clear Balance</TableHeaderCell>
      {transactions.length === 0 && (
        <TableBodyCell fullSpan>No Data</TableBodyCell>
      )}
      {transactions.map((tx, idx) => (
        <Fragment key={idx}>
          <TableBodyCell>{new Date(tx.time).toLocaleString()}</TableBodyCell>
          <TableBodyCell>{tx.amount}</TableBodyCell>
          <TableBodyCell>{tx.type}</TableBodyCell>
          <TableBodyCell>{tx.reason || "N/A"}</TableBodyCell>
          <TableBodyCell>{tx.balance}</TableBodyCell>
        </Fragment>
      ))}
    </div>
  );
}
