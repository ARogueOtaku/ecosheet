import Balance from "@/components/Balance";
import TransactionSearchForm from "@/components/TransactionSearchForm";
import TransactionTable from "@/components/TransactionsTable";
import UpdateBalanceForm from "@/components/UpdateBalanceForm";
import { getUser } from "@/server/data-access/user";

type DashboardSearchParams = {
  from?: string;
  to?: string;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const { from, to } = await searchParams;
  const isAdminUser = !!(await getUser())?.isAdmin;
  return (
    <div className="flex flex-col w-full gap-4 overflow-auto my-4 items-center">
      <Balance />
      <div className="w-full flex justify-between md:justify-center md:gap-4 items-end">
        <TransactionSearchForm />
        {isAdminUser && <UpdateBalanceForm />}
      </div>
      <TransactionTable from={from} to={to} />
    </div>
  );
}
