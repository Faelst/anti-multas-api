-- CreateTable
CREATE TABLE "SolicitationDocument" (
    "id" TEXT NOT NULL,
    "solicitationId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "buffer" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolicitationDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitationDocument" ADD CONSTRAINT "SolicitationDocument_solicitationId_fkey" FOREIGN KEY ("solicitationId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
