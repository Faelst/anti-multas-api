-- DropForeignKey
ALTER TABLE "SolicitationTransaction" DROP CONSTRAINT "SolicitationTransaction_transactionId_fkey";

-- AlterTable
ALTER TABLE "SolicitationTransaction" ALTER COLUMN "transactionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SolicitationTransaction" ADD CONSTRAINT "SolicitationTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
