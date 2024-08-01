/*
  Warnings:

  - Added the required column `type` to the `SolicitationDocument` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NOTIFICATION', 'CNH', 'RG', 'CRLV');

-- AlterTable
ALTER TABLE "SolicitationDocument" ADD COLUMN     "type" "DocumentType" NOT NULL;
