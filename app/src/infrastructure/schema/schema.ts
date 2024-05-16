import { PgTable, pgTable, varchar, serial, timestamp, uuid, numeric, PgNumeric } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    username: varchar('username').notNull(),
    createdAt: timestamp('created_at').defaultNow(),

})

export const loginTokens = pgTable('login_tokens', {
    id:serial('id').primaryKey().notNull(),
    passKey:numeric('pass_key').notNull(),
    email: varchar('email').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    valid: numeric('valid').default('1').notNull()
    
})