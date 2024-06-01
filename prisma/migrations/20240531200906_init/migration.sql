/*
  Warnings:

  - You are about to drop the `InflationsTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_inflationsId_fkey";

-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_solicitationId_fkey";

-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_transactionId_fkey";

-- DropTable
DROP TABLE "InflationsTransaction";

-- CreateTable
CREATE TABLE "SolicitationTransaction" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "solicitationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolicitationTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitationTransaction" ADD CONSTRAINT "SolicitationTransaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitationTransaction" ADD CONSTRAINT "SolicitationTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitationTransaction" ADD CONSTRAINT "SolicitationTransaction_solicitationId_fkey" FOREIGN KEY ("solicitationId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
