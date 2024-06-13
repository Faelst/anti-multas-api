-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "civil_status" TEXT,
ADD COLUMN     "cnh_number" TEXT,
ADD COLUMN     "cnh_uf" TEXT,
ADD COLUMN     "expeditor_rg" TEXT,
ADD COLUMN     "ocupation" TEXT,
ADD COLUMN     "rg" TEXT;

-- AlterTable
ALTER TABLE "Solicitation" ADD COLUMN     "vehicle_owner" TEXT;
