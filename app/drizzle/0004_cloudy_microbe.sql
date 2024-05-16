ALTER TABLE "login_tokens" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "login_tokens" DROP COLUMN IF EXISTS "uuid";--> statement-breakpoint
ALTER TABLE "login_tokens" DROP COLUMN IF EXISTS "token";