/*
  Warnings:

  - Added the required column `ait` to the `Inflations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgao` to the `Inflations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processamento` to the `Inflations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inflations" ADD COLUMN     "ait" TEXT NOT NULL,
ADD COLUMN     "orgao" TEXT NOT NULL,
ADD COLUMN     "processamento" TEXT NOT NULL;
