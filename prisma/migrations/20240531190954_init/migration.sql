/*
  Warnings:

  - You are about to drop the `Soliciation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InflationsTransaction" DROP CONSTRAINT "InflationsTransaction_soliciationId_fkey";

-- DropForeignKey
ALTER TABLE "Soliciation" DROP CONSTRAINT "Soliciation_customerId_fkey";

-- DropTable
DROP TABLE "Soliciation";

-- CreateTable
CREATE TABLE "Solicitation" (
    "id" TEXT NOT NULL,
    "code" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solicitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solicitation_code_key" ON "Solicitation"("code");

-- AddForeignKey
ALTER TABLE "Solicitation" ADD CONSTRAINT "Solicitation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InflationsTransaction" ADD CONSTRAINT "InflationsTransaction_soliciationId_fkey" FOREIGN KEY ("soliciationId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
