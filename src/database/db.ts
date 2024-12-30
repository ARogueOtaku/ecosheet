import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/database/schema";

// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
declare module global {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

let postgresSqlClient;

const databaseUrl = process.env.SUPABASE_DATABASE_URL!;

if (process.env.NODE_ENV !== "production") {
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(databaseUrl);
  }
  postgresSqlClient = global.postgresSqlClient;
} else {
  postgresSqlClient = postgres(databaseUrl);
}

const db = drizzle(postgresSqlClient, { schema });

export default db;
