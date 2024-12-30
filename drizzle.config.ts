import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./src/drizzle/migrations",
});

export default config;
