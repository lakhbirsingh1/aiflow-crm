-- Create UserRole enum if it does not already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'UserRole'
  ) THEN
    CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
  END IF;
END $$;

-- Add googleId if it does not already exist
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "googleId" TEXT;

-- Add unique index for googleId if it does not already exist
CREATE UNIQUE INDEX IF NOT EXISTS "User_googleId_key"
ON "User"("googleId");

-- Add role if it does not already exist
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'USER';

-- Convert existing TEXT role column to UserRole
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'role'
      AND data_type = 'text'
  ) THEN
    ALTER TABLE "User"
    ALTER COLUMN "role" DROP DEFAULT;

    ALTER TABLE "User"
    ALTER COLUMN "role" TYPE "UserRole"
    USING "role"::"UserRole";

    ALTER TABLE "User"
    ALTER COLUMN "role" SET DEFAULT 'USER';
  END IF;
END $$;