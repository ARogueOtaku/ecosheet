export type ServerActionResponse = {
  error: boolean;
  message?: string | null;
};

export type UserData = {
  id: string;
  username: string;
  name?: string | null;
  isAdmin: boolean;
};

export type TransactionData = {
  amount: string;
  time: number;
  type: "Credit" | "Debit";
  name?: string | null;
  reason?: string | null;
  balance: string;
};
