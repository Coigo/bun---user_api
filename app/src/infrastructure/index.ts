import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from './schema/schema'
import dotenv from 'dotenv'

dotenv.config()

if (
    !process.env.DB_NAME ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_PORT ||
    !process.env.DB_HOST
) {
    throw new Error('some database params are missing')
}

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

await client.connect();
export const db = drizzle(client, {schema});