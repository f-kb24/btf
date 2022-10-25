/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Current" (
    "id" SERIAL NOT NULL,
    "picture_id" TEXT,

    CONSTRAINT "Current_pkey" PRIMARY KEY ("id")
);
