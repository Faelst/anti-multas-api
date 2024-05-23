/*
  Warnings:

  - Changed the type of `phone` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "phone",
ADD COLUMN     "phone" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");
