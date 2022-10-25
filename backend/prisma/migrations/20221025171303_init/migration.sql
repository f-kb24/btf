/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "current" JSONB;

-- CreateTable
CREATE TABLE "Pics" (
    "id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "reso" JSONB NOT NULL,

    CONSTRAINT "Pics_pkey" PRIMARY KEY ("id")
);
