/*
  Warnings:

  - You are about to drop the column `inflaction_amount` on the `Inflations` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `InflationsTransaction` table. All the data in the column will be lost.
  - Added the required column `inflation_amount` to the `Inflations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inflations" DROP COLUMN "inflaction_amount",
ADD COLUMN     "inflation_amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "InflationsTransaction" DROP COLUMN "code";
