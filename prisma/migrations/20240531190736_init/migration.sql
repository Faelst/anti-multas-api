/*
  Warnings:

  - You are about to drop the column `clientId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `InflationsTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Soliciation` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `InflationsTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Soliciation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientId_fkey";

-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Soliciation" DROP CONSTRAINT "Soliciation_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_clientId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "clientId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InflationsTransaction" DROP COLUMN "clientId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Soliciation" DROP COLUMN "clientId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "clientId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soliciation" ADD CONSTRAINT "Soliciation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InflationsTransaction" ADD CONSTRAINT "InflationsTransaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
