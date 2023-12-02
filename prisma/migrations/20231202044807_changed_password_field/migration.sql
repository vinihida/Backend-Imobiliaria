-- DropIndex
DROP INDEX "User_senha_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "senha" SET DATA TYPE TEXT;
