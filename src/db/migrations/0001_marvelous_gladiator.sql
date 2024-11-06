ALTER TABLE "Customers" ADD COLUMN "address2" varchar;--> statement-breakpoint
ALTER TABLE "Customers" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "Customers" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "Customers" DROP COLUMN IF EXISTS "note";