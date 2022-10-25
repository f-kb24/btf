/*
  Warnings:

  - Added the required column `num_comments` to the `Pics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pics" ADD COLUMN     "num_comments" INTEGER NOT NULL;
