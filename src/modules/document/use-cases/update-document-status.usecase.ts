import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WebhookDto } from '../dto/webhook.dto';

@Injectable()
export class UpdateDocumentStatusUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute({ uuid, type_post }: WebhookDto) {
    if (type_post !== '1') {
      return;
    }

    await this.prisma.solicitation.updateMany({
      where: { signer_document_id: uuid },
      data: { status: 'Documento Assinado' },
    });

    const solicitation = await this.prisma.solicitation.findFirst({
      where: { signer_document_id: uuid },
    });

    this.eventEmitter.emit('document.signed', solicitation.id);

    return true;
  }
}
