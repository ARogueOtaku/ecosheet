import {
  bigint,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userrole", ["Admin", "User"]);

export const UserTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  role: UserRole("role").default("User").notNull(),
});

export const TransactionType = pgEnum("transactiontype", ["Credit", "Debit"]);

export const TransactionTable = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  time: bigint({
    mode: "number",
  }).notNull(),
  userid: uuid("userid").references(() => UserTable.id),
  amount: numeric("amount").notNull(),
  type: TransactionType("type").notNull(),
  reason: text("reason"),
  clearbalance: numeric("clearbalance").default("0").notNull(),
});

export const BalanceTable = pgTable("balance", {
  total: numeric("total").default("0").notNull(),
  id: integer("id").primaryKey().default(1),
});
