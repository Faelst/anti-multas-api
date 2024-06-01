/*
  Warnings:

  - Added the required column `solicitationId` to the `Inflations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inflations" ADD COLUMN     "solicitationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inflations" ADD CONSTRAINT "Inflations_solicitationId_fkey" FOREIGN KEY ("solicitationId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
