import { PgTable, pgTable, varchar, serial, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    username: varchar('username').notNull(),
    createdAt: timestamp('created_at').defaultNow(),

})

export const loginTokens = pgTable('login_tokens', {
    id: uuid('uuid').primaryKey(),
    email: varchar('email').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    
})
