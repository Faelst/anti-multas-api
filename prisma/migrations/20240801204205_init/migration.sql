/*
  Warnings:

  - Added the required column `recurseType` to the `Inflations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecurseType" AS ENUM ('SIMPLE', 'ESPECIAL');

-- AlterTable
ALTER TABLE "Inflations" ADD COLUMN     "recurseType" "RecurseType" NOT NULL;
