/*
  Warnings:

  - Added the required column `code` to the `Inflations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inflations" ADD COLUMN     "code" TEXT NOT NULL;
