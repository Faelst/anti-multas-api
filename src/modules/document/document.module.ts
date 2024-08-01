import { Module } from '@nestjs/common';
import { D4SignService } from '../../common/services/d4sign/d4sing.service';
import { DocumentEventReceiverService } from './document.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DocumentController } from './document.controller';
import { UpdateDocumentStatusUseCase } from './use-cases/update-document-status.usecase';
import { SendDocumentToLegalUseCase } from './use-cases/send-legal-document.usecase';
import { SendToAjusUseCase } from './use-cases/send-to-ajus.usecase';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [
    D4SignService,
    DocumentEventReceiverService,
    PrismaService,
    UpdateDocumentStatusUseCase,
    SendDocumentToLegalUseCase,
    SendToAjusUseCase,
  ],
})
export class DocumentModule {}
