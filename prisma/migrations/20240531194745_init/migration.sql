/*
  Warnings:

  - You are about to drop the column `soliciationId` on the `InflationsTransaction` table. All the data in the column will be lost.
  - Added the required column `solicitationId` to the `InflationsTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_soliciationId_fkey";

-- AlterTable
ALTER TABLE "InflationsTransaction" DROP COLUMN "soliciationId",
ADD COLUMN     "solicitationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InflationsTransaction" ADD CONSTRAINT "InflationsTransaction_solicitationId_fkey" FOREIGN KEY ("solicitationId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
