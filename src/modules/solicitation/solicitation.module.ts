import { Module } from '@nestjs/common';
import { SolicitationController } from './solicitation.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';
import { UploadSolicitationDocumentsUseCase } from './use-cases/upload-solicitation-documents.usecase';
import { UpdateSolicitationUseCase } from './use-cases/update-solicitation.usecase';

@Module({
  imports: [],
  controllers: [SolicitationController],
  providers: [
    PrismaService,
    CreateSolicitationUseCase,
    UploadSolicitationDocumentsUseCase,
    UpdateSolicitationUseCase,
  ],
})
export class SolicitationModule {}
