/*
  Warnings:

  - Added the required column `complement` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "email" TEXT;
