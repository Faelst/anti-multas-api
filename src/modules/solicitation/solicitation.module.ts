import { Module } from '@nestjs/common';
import { SolicitationController } from './solicitation.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';
import { UploadSolicitationDocumentsUseCase } from './use-cases/upload-solicitation-documents.usecase';

@Module({
  imports: [],
  controllers: [SolicitationController],
  providers: [
    PrismaService,
    CreateSolicitationUseCase,
    UploadSolicitationDocumentsUseCase,
  ],
})
export class SolicitationModule {}
