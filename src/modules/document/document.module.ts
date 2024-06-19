import { Module } from '@nestjs/common';
import { D4SignService } from '../../common/services/d4sign/d4sing.service';
import { DocumentEventReceiverService } from './document.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [D4SignService, DocumentEventReceiverService, PrismaService],
})
export class DocumentModule {}
