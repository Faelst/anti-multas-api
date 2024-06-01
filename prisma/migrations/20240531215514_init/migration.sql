/*
  Warnings:

  - Added the required column `amount_payment` to the `Solicitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solicitation" ADD COLUMN     "amount_payment" DOUBLE PRECISION NOT NULL;
