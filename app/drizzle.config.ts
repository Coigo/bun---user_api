import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config()


export default {
    schema: './src/infrastructure/schema/index.ts',
    out: './drizzle',
    driver:'pg',
    dbCredentials: {
        connectionString: String(process.env.DB_URL)
    },
    verbose: true,
    strict: true 

} satisfies Config