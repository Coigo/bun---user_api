import { Pool } from 'pg'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

if ( !process.env.DB_URL ) {
    throw new Error('Database credentials missing!')
}

const client = postgres(process.env.DB_URL)
const db = drizzle(client)

async function main() {
    console.log("> migration started...");
    await migrate(db, {migrationsFolder:'drizzle'})
    console.log("> migration finished.");
    process.exit(0)
}

main().catch(err => {
    console.log(err)
    process.exit(0)
})