import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/42782fb72a7eb39466a9088f42d6227a99db4316333e4c6d8ec1dffe854018bb.sqlite",
  },
});