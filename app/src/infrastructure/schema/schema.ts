import { PgTable, pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    createdAt: timestamp('created_at').defaultNow(),
    username: varchar('username').notNull(),
    password: varchar('password').notNull(),
    email: varchar('email').notNull(),
    id: serial('id').primaryKey(),

})
