/*
  Warnings:

  - You are about to drop the column `civil_status` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `ocupation` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "civil_status",
DROP COLUMN "ocupation",
ADD COLUMN     "civil_state" TEXT,
ADD COLUMN     "occupation" TEXT;
